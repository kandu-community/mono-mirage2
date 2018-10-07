<template>
    <v-container grid-list-xs>
        <h3>Farm Profile</h3>
        <v-text-field
        v-model="farmProfile.totalLand"
        label="Total Arable Land in Square Meters"
        required
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.cultivatedLand"
        label="Land under cultivation in Square Meters"
        required
        ></v-text-field>
        <v-checkbox label="Do you want to show your location on Kandu Community?" 
        v-model="farmProfile.shareLocation"></v-checkbox>
        <p>If you're near your farm now, please click the button below, accept location discovery, and then move the marker to a nice central spot on your land.</p>
        <v-btn @click="getGPS" color="info">Find Me</v-btn>
        <v-flex v-if="farmProfile.gpsPoints" xs12>
            Lat: {{farmProfile.gpsPoints.lat}}
            Long: {{farmProfile.gpsPoints.lng}}
        </v-flex>
        <farm-map v-if="showFarmMap"></farm-map>
        <p v-if="municipalData.province">{{municipalData.province}} | {{municipalData.ward}}</p>
        <p>Alternatively - if you already know your GPS co-ordinates by heart you can just type them in here (You crazy beautiful, savant you...) </p>
        <v-text-field
        v-model="farmProfile.gpsPoints"
        label="Location of the Land"
        required
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.farmersAssociations"
        label="If you belong to any Farmer's Associations or groups please add them here"
        required
        ></v-text-field>
    </v-container>
</template> 

<script>
// TODO: Move to HelperFunctions
import FarmMap from '@/components/profile/FarmMap'

export default {
  data() {
    return {
      farmProfile: {
        totalLand: "",
        cultivatedLand: "",
        gpsPoints: null,
        farmersAssociations: "",
        shareLocation: true
      }
    };
  },
  computed: {
    showFarmMap: {
      get(){
        return this.$store.getters.showFarmMap
      },
      set(val) {
        this.$store.dispatch("showFarmMap", val)
      }
    },

    municipalData() {
      return this.$store.getters.municipalData
    }
  },
  methods: {
    getGPS() {
      var that = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          // Get the coordinates of the current possition.
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          that.farmProfile.gpsPoints = {
            lat,
            lng
          };
          that.$store.dispatch('setFarmLocation', that.farmProfile.gpsPoints)
          that.$store.dispatch('showFarmMap', true)
          console.log(
            "TCL: getGPS -> this.farmProfile.gpsPoints",
            that.farmProfile.gpsPoints
          );
        });

      } else {
        console.log("Geo Location not supported by browser");
      }
    }
  },
  components: {
    FarmMap
  }
};
</script>

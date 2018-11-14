<style>
.righto { display:inline-flex; margin:5px 5%; }

</style>
<template>
    <v-container grid-list-xs>
        <h3 v-if="farmProfile.name === null" class="display-1">Farm Profile</h3>
        <h3 v-else class="display-1">Farm Profile: {{farmProfile.name}}</h3>
         <v-text-field
        v-model="farmProfile.name"
        label="Farm's Name"
        required
        ></v-text-field>       
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


        <p class="font-weight-light" >If you're near your farm now, please click the button below, accept location discovery, and then move the marker to a nice central spot on your land.</p>
        <v-btn @click="alternatively=false; getGPS()" color="info">Find Me</v-btn>
        <farm-map v-if="showFarmMap"></farm-map>
        <p v-if="municipalData.province">{{municipalData.province}} | {{municipalData.ward}}</p>
        <p class="font-weight-light" v-if="alternatively">Alternatively - if you already know your GPS co-ordinates by heart you can just type them in here (You crazy beautiful, savant you...)</p>
        <v-text-field
        v-model="farmProfile.gpsPoints.lat"
        label="Latitude"
        required
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.gpsPoints.lng"
        label="Longitude"
        required
        ></v-text-field>


        <v-text-field
        v-model="farmProfile.farmersAssociations"
        label="If you belong to any Farmer's Associations or groups please add them here"
        required
        ></v-text-field>



        <v-text-field
        v-model="farmProfile.area"
        label="Write the Area name of where your farm is"
        required
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.post_code"
        label="The postcode is used to find your farm on the OFN map"
        required
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.short_description"
        label="A sharp newspaper headliner of your enterprise"
        required
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.long_description"
        label="A longer description"
        ></v-text-field>
        <v-text-field
        v-model="farmProfile.website"
        label="Cut and paste your Farms website address from the browser"
        ></v-text-field>
        <v-checkbox label="Do you want to show your profile on Kandu Community?" 
        v-model="farmProfile.visible_ofn"></v-checkbox>
        <v-checkbox label="Is this Farm part of a co-operative?" 
        v-model="farmProfile.cooperative"></v-checkbox>






        <v-flex xs6>
        <v-menu
        ref="date_started"
        :close-on-content-click="false"
        v-model="date_started"
        :return-value.sync="farmProfile.date_started"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        >
        <v-text-field
            slot="activator"
            v-model="farmProfile.date_started"
            label="The date your Enterprise started"
            prepend-icon="event"
            readonly
        ></v-text-field>
        <v-date-picker v-model="farmProfile.date_started" @input="$refs.date_started.save(farmProfile.date_started)"></v-date-picker>
        </v-menu>
        </v-flex>


          <br>
        <v-flex xs12>
          <h3>What Farming Activities are carried out on your farm?</h3>        
          <v-checkbox class="righto" label="Veg Crops" v-model="farmProfile.activities.Veg_Crops"></v-checkbox>
          <v-checkbox class="righto" label="Fruit" v-model="farmProfile.activities.Fruit"></v-checkbox>
          <v-checkbox class="righto" label="Livestock" v-model="farmProfile.activities.Livestock"></v-checkbox>
          <v-checkbox class="righto" label="Meat" v-model="farmProfile.activities.Meat"></v-checkbox>
          <v-checkbox class="righto" label="Poultry" v-model="farmProfile.activities.Poultry"></v-checkbox>
          <v-checkbox class="righto" label="Fish" v-model="farmProfile.activities.Fish"></v-checkbox>
          <v-checkbox class="righto" label="Bees" v-model="farmProfile.activities.Bees"></v-checkbox>
          <v-checkbox class="righto" label="Seedlings" v-model="farmProfile.activities.Seedlings"></v-checkbox>
          <v-checkbox class="righto" label="Seeds" v-model="farmProfile.activities.Seeds"></v-checkbox>
          <v-checkbox class="righto" label="Food Products" v-model="farmProfile.activities.Food_Products"></v-checkbox>
          <v-checkbox class="righto" label="Medicine Crops" v-model="farmProfile.activities.Medicine_Crops"></v-checkbox>
        </v-flex>

        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>
        <v-flex xs12>
        <h3>What is the Soil like?</h3>        
        <v-checkbox class="righto" label="Sand" v-model="farmProfile.soil_structure.Sand"></v-checkbox>
        <v-checkbox class="righto" label="Loam" v-model="farmProfile.soil_structure.Loam"></v-checkbox>
        <v-checkbox class="righto" label="Clay" v-model="farmProfile.soil_structure.Clay"></v-checkbox>
        <v-checkbox class="righto" label="Unknown" v-model="farmProfile.soil_structure.Unknown"></v-checkbox>
        </v-flex>
        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>

        <v-flex xs12>
        <h3>Do you know the Soil pH?</h3>        
        <v-checkbox class="righto" label="towards Acidic" v-model="farmProfile.soil_ph.Acid_05"></v-checkbox>
        <v-checkbox class="righto" label="Close to Neutral" v-model="farmProfile.soil_ph.Neutral_68"></v-checkbox>
        <v-checkbox class="righto" label="towards Alkaline" v-model="farmProfile.soil_ph.Alkaline_714"></v-checkbox>
        <v-checkbox class="righto" label="Unknown" v-model="farmProfile.soil_ph.Unknown"></v-checkbox>
        </v-flex>

        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>
        <v-flex xs12>
        <h3>Which sustainable methods have you used?</h3>        
        <v-checkbox class="righto" label="Companion Planting" v-model="farmProfile.methodz.Companion_Planting"></v-checkbox>
        <v-checkbox class="righto" label="Crop Diversity" v-model="farmProfile.methodz.Crop_Diversity"></v-checkbox>
        <v-checkbox class="righto" label="Crop Rotation" v-model="farmProfile.methodz.Crop_Rotation"></v-checkbox>
        <v-checkbox class="righto" label="Raised Beds" v-model="farmProfile.methodz.Raised_Beds"></v-checkbox>
        <v-checkbox class="righto" label="Sheet Mulching" v-model="farmProfile.methodz.Sheet_Mulching"></v-checkbox>
        <v-checkbox class="righto" label="Mulching" v-model="farmProfile.methodz.Mulching"></v-checkbox>
        <v-checkbox class="righto" label="Animal Tractoring" v-model="farmProfile.methodz.Animal_Tractoring"></v-checkbox>
        <v-checkbox class="righto" label="Bio-Intensive double digging" v-model="farmProfile.methodz.Bio_Intensive_double_digging"></v-checkbox>
        <v-checkbox class="righto" label="Vetivar and Swales" v-model="farmProfile.methodz.Vetivar_and_Swales"></v-checkbox>
        <v-checkbox class="righto" label="Composting" v-model="farmProfile.methodz.Composting"></v-checkbox>
        <v-checkbox class="righto" label="Guild Planting" v-model="farmProfile.methodz.Guild_Planting"></v-checkbox>
        <v-checkbox class="righto" label="Contour lines" v-model="farmProfile.methodz.Contour_lines"></v-checkbox>
        <v-checkbox class="righto" label="Aquaponics" v-model="farmProfile.methodz.Aquaponics"></v-checkbox>
        <v-checkbox class="righto" label="Hydroponics" v-model="farmProfile.methodz.Hydroponics"></v-checkbox>
        <v-checkbox class="righto" label="Organic" v-model="farmProfile.methodz.Organic"></v-checkbox>
        <v-checkbox class="righto" label="Monocropping" v-model="farmProfile.methodz.Monocropping"></v-checkbox>
        <v-checkbox class="righto" label="Intercropping" v-model="farmProfile.methodz.Intercropping"></v-checkbox>
        </v-flex>
        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>

        <v-flex xs12>
        <h3>Do you employ Erosion Control methods?</h3>        
        <v-checkbox class="righto" label="Keylines" v-model="farmProfile.erosion_control.Keylines"></v-checkbox>
        <v-checkbox class="righto" label="Terraces" v-model="farmProfile.erosion_control.Terraces"></v-checkbox>
        <v-checkbox class="righto" label="Swales" v-model="farmProfile.erosion_control.Swales"></v-checkbox>
        <v-checkbox class="righto" label="Stone Wall" v-model="farmProfile.erosion_control.Stone_Wall"></v-checkbox>
        <v-checkbox class="righto" label="No Need" v-model="farmProfile.erosion_control.No_Need"></v-checkbox>
        </v-flex>
        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>

        <v-flex xs12>
        <h3>What are you primary Water Sources?</h3>        
        <v-checkbox class="righto" label="Municipal" v-model="farmProfile.water_source.Municipal"></v-checkbox>
        <v-checkbox class="righto" label="Pumped from river" v-model="farmProfile.water_source.Pumped_from_river"></v-checkbox>
        <v-checkbox class="righto" label="Collected from river" v-model="farmProfile.water_source.Collected_from_river"></v-checkbox>
        <v-checkbox class="righto" label="Raintank" v-model="farmProfile.water_source.Raintank"></v-checkbox>
        <v-checkbox class="righto" label="Borehole" v-model="farmProfile.water_source.Borehole"></v-checkbox>
        <v-checkbox class="righto" label="Rainfall not stored" v-model="farmProfile.water_source.Rainfall_not_stored"></v-checkbox>
        <v-checkbox class="righto" label="Pond or lake" v-model="farmProfile.water_source.Pond_or_lake"></v-checkbox>
        </v-flex>
        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>

        <v-flex xs12>
        <h3>Do you Store any Water?</h3>        
        <v-checkbox class="righto" label="none" v-model="farmProfile.water_storage.No_Storage"></v-checkbox>
        <v-checkbox class="righto" label="Less than 500lt" v-model="farmProfile.water_storage.Less_than_500lt"></v-checkbox>
        <v-checkbox class="righto" label="Less than 1000lt" v-model="farmProfile.water_storage.Less_than_1000lt"></v-checkbox>
        <v-checkbox class="righto" label="Less than 5000lt" v-model="farmProfile.water_storage.Less_than_5000lt"></v-checkbox>
        <v-checkbox class="righto" label="Less than 10000lt" v-model="farmProfile.water_storage.Less_than_10000lt"></v-checkbox>
        <v-checkbox class="righto" label="More than 10000lt" v-model="farmProfile.water_storage.More_than_10000lt"></v-checkbox>
        </v-flex>
        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>

        <v-flex xs12>
        <h3>How do Irrigate your Crops?</h3>        
        <v-checkbox class="righto" label="Watering can" v-model="farmProfile.irrigation.Watering_can"></v-checkbox>
        <v-checkbox class="righto" label="Hosepipe" v-model="farmProfile.irrigation.Hosepipe"></v-checkbox>
        <v-checkbox class="righto" label="Sprinkler system" v-model="farmProfile.irrigation.Sprinkler_system"></v-checkbox>
        <v-checkbox class="righto" label="Flood Irrigation" v-model="farmProfile.irrigation.Flood_Irrigation"></v-checkbox>
        <v-checkbox class="righto" label="Only Rainfall" v-model="farmProfile.irrigation.Only_Rainfall"></v-checkbox>
        </v-flex>
        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>

        <v-flex xs12>
        <h3>Which types of fertilizer do you use?</h3>        
        <v-checkbox class="righto" label="Compost" v-model="farmProfile.fertilizer.Compost"></v-checkbox>
        <v-checkbox class="righto" label="Kraal Manure" v-model="farmProfile.fertilizer.Kraal_Manure"></v-checkbox>
        <v-checkbox class="righto" label="Chicken Manure" v-model="farmProfile.fertilizer.Chicken_Manure"></v-checkbox>
        <v-checkbox class="righto" label="Vermicompost earthworms" v-model="farmProfile.fertilizer.Vermicompost_earthworms"></v-checkbox>
        <v-checkbox class="righto" label="NPK chemical fertilizer" v-model="farmProfile.fertilizer.NPK_chemical_fertilizer"></v-checkbox>
        <v-checkbox class="righto" label="Fish farm waste" v-model="farmProfile.fertilizer.Fish_farm_waste"></v-checkbox>
        <v-checkbox class="righto" label="No Fertilizer" v-model="farmProfile.fertilizer.No_Fertilizer"></v-checkbox>
        </v-flex>



        <v-btn @click="saveFarmProfile" color="success">Save</v-btn>
    </v-container>
</template> 

<script>
// TODO: Move to HelperFunctions
import FarmMap from "@/components/profile/FarmMap";

export default {
  data() {
    return {
      alternatively: true,
      farmProfile: {
        name: null,
        totalLand: "",
        cultivatedLand: "",
        cultivationApproach: "",
        gpsPoints: {
          lat: null,
          lng: null
        },
        farmersAssociations: "",

        area:"",
        post_code:"",
        short_description:"",
        long_description:"",
        website:"",
        visible_ofn:"",
        activities:"",
        cooperative:"",
        date_started:"",
        soil_structure:"",
        soil_ph:"",
        methodz:"",
        erosion_control:"",
        water_source:"",
        water_storage:"",
        irrigation:"",
        fertilizer:"",
        farmer:"",
        crops:"",
        products:"",
        shareLocation: true



      }
    };
  },
  computed: {
    showFarmMap: {
      get() {
        return this.$store.getters.showFarmMap;
      },
      set(val) {
        this.$store.dispatch("showFarmMap", val);
      }
    },

    municipalData() {
      return this.$store.getters.municipalData;
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
          that.$store.dispatch("setFarmLocation", that.farmProfile.gpsPoints);
          that.$store.dispatch("showFarmMap", true);
          console.log(
            "TCL: getGPS -> this.farmProfile.gpsPoints",
            that.farmProfile.gpsPoints
          );
        });
      } else {
        console.log("Geo Location not supported by browser");
      }
    },
    saveFarmProfile() {
      this.$store.dispatch("saveFarmProfile", this.farmProfile);
    }
  },
  components: {
    FarmMap
  }
};
</script>

<style>
</style>


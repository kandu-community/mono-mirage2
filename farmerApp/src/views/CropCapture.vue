<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Capture A Crop</h3>
        
        <v-autocomplete
        @input="setSelection"
          label="Crop Category"
          :items="cropTypes"
          v-model="crop.category"
        ></v-autocomplete>

        <v-autocomplete v-if="vegOptions !== null && crop.category"
          label="Crop Name"
          :items="cropNames"
          v-model="crop.name"
        ></v-autocomplete>

        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="crop.description"
              name="description"
              label="How About a short Description of the produce?"
              id="id"
            ></v-text-field>
          </v-flex>


        <v-flex xs12>
    <v-select
        label="Plant Spacing"
        :items="spaceman"
        v-model="crop.spacing"

        hint="How do you rate your average spacing?"
        persistent-hint
    ></v-select>

        </v-flex>
        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>




          <v-flex xs12>
            <v-text-field
              v-model="crop.squareMeters"
              name="squareMeters"
              label="How many Square Meters of this crop is available?"
              id="id"
            ></v-text-field>
          </v-flex>

            <v-flex xs12>
                <h4 class="mb-1">Harvest Window</h4>
                <p class="font-weight-light mb-1" >Over what period of time do you expect to be harvesting the crop?</p>        
            </v-flex>
            <v-flex xs6>
                <v-menu
                ref="startDate"
                :close-on-content-click="false"
                v-model="dateOne"
                :return-value.sync="crop.startDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="crop.startDate"
                    label="End"
                    prepend-icon="event"
                    readonly
                ></v-text-field>
                <v-date-picker v-model="crop.startDate" @input="$refs.startDate.save(crop.startDate)"></v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs6>
                <v-menu
                ref="endDate"
                :close-on-content-click="false"
                v-model="dateTwo"
                :return-value.sync="crop.endDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="crop.endDate"
                    label="Start"
                    prepend-icon="event"
                    readonly
                ></v-text-field>
                <v-date-picker v-model="crop.endDate" @input="$refs.endDate.save(crop.endDate)"></v-date-picker>
                </v-menu>
            </v-flex>  


        <p>Take a good picture of the crop</p>

        <v-cloudinary-upload 
          v-model="crop.imageSrc"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSource"
          button-icon="fa-picture-o"
        />
        <img v-if="crop.imageSrc"
          :src="crop.imageSrc" />




                <v-btn @click="saveCrop" color="success">Save</v-btn>
            <template v-if="currentCrops.length > 0">
              <v-card>
                <v-card-title class="display-1" primary-title>
                  Scheduled Crops
                </v-card-title>
                <v-card-text>
                  <v-flex xs12 v-for="(crop, index) in currentCrops" :key="index">
                    Name: {{crop.name}}
                    Category: {{crop.category}}
                    Description: {{crop.description}}
                    Harvest Begins: {{crop.harvestWindow.from}}
                    Harvest Ends: {{crop.harvestWindow.to}}
                  </v-flex>
                </v-card-text>
              </v-card>
            </template>
        </v-layout>
    </v-container>
</template>

<script>

import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";

export default {
  beforeCreate() {
    this.$store.dispatch("getCropNames");
  },
  mounted() {
    this.$store.dispatch("fetchCrops");
  },
  data() {
    return {
      spaceman: [
        "Bio-Intensive",
        "Standard Organic",
        "Standard Commercial",
        "Intercropping"
      ],
      cropTypes: ["Vegetable", "Herb", "Fruit", "Medicine"],
      cropNames: ["bean", "spinach", "carrot"],
      crop: {
        category: null,
        name: null,
        description: null,
        spacing: {
          BioIntensive: false,
          StdOrganic: false,
          StdCommercial: false,
          Intercropping: false
        },
        squareMeters: null,
        startDate: null,
        endDate: null,
        imageSrc: null
      },
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      dateOne: false,
      dateTwo: false
    };
  },
  computed: {
    vegOptions() {
      return this.$store.getters.vegOptions;
    },
    currentCrops() {
      return this.$store.getters.crops;
    }
  },
  methods: {
    setSelection() {
      console.log("TCL: setSelection -> setSelection");

      var options = this.vegOptions;
      console.log("TCL: setSelection -> options", options);

      var subset = options.filter(row => {
        return row.type === this.crop.category;
      });
      console.log("TCL: setSelection -> subset", subset);

      var fieldMap = subset.map(function(row) {
        return row.name;
      });
      console.log("TCL: setSelection -> fieldMap", fieldMap);
      this.cropNames = fieldMap;
    },
    gotImageSource(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.crop.imageSrc = src;
    },
    saveCrop() {
      this.$store.dispatch("saveCrop", this.crop);
    }
  }
};
</script>


<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Distributors</h3>

        <v-text-field
            v-model="distributor.name"
            label="Distributor Name"
            single-line
        ></v-text-field>

        <v-text-field
            v-model="distributor.phone"
            label="Distributor Phone"
            single-line
        ></v-text-field>

    <v-select
        label="Owner or Driver?"
        :items="ood"
        v-model="distributor.ownerDriver"

        hint="Is the Distributor the owner or the driver of the vehicle?"
        persistent-hint
    ></v-select>

    <v-select
        label="What Make of Vehicle is it?"
        :items="vehicleMakes"
        v-model="distributor.vehicleMake"

        hint="What is the manufacturer name of the vehicle?"
        persistent-hint
    ></v-select>



    <v-select
        label="What type of Vehicle is it?"
        :items="vehicleTypes"
        v-model="distributor.vehicleType"

        hint="Is the Distributor the owner or the driver of the vehicle?"
        persistent-hint
    ></v-select>



        <v-text-field
            v-model="distributor.description"
            label="Vehicle Description"
            single-line
        ></v-text-field>



        <v-text-field
          label="Vehicle Registration Number"
          v-model="distributor.registration"
        ></v-text-field>

        <v-text-field
          label="roadworthy"
          v-model="distributor.roadworthy"
        ></v-text-field>





        <v-text-field
          label="driverLicense"
          v-model="distributor.driverLicense"
        ></v-text-field>

        <v-text-field
          label="vehicleLicense"
          v-model="distributor.vehicleLicense"
          prefix="R"
        ></v-text-field>





<v-flex xs12>
        <p>How about some pictures of your lovely Vehicle?</p>
<v-flex xs6>

        <v-cloudinary-upload 
          v-model="distributor.imageSrc"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSource"
          button-icon="fa-picture-o"
        />
        <img v-if="distributor.imageSrc"
          :src="distributor.imageSrc" />
 </v-flex>
<v-flex sxs6>

        <v-cloudinary-upload 
          v-model="distributor.imageSrctoo"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSourcetoo"
          button-icon="fa-picture-o"
        />
        <img v-if="distributor.imageSrctoo"
          :src="distributor.imageSrctoo" />
</v-flex>
<div style="clear:both;line-height:0;height:27px;"></div>
</v-flex>

        <v-btn @click="submit" color="success">Upload Your Distributor</v-btn>
    </v-container>
</template>

<script>
import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";
export default {
  data() {
    return {
      distributor: {
        name: null,
        phone: null,
        ownerDriver: null,
        vehicleMake: null,
        vehicleType: null,
        registration: null,
        description: null,
        roadworthy: null,
        driverLicense: null,
        vehicleLicense: null,
        imaSrc: null,
        imaSrctoo: null
      },
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      vehicleTypes: [
        "MotorCar",
        "MotorBike with Delivery Box",
        "Refridgerated Truck",
        "AirConditioned SDV"
      ],
      vehicleMakes: [
        "Toyota",
        "Mercedez",
        "Ferarri"
      ]
      ood: [
        "Owner",
        "Driver",
        "Both"
      ]
    };
  },
  methods: {
    gotImageSource(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.distributor.imaSrc = src;
    },
    gotImageSourcetoo(e) {
      console.log("TCL: gotImageSourcetoo -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSourcetoo -> src", src);
      this.distributor.imaSrctoo = src;
    },
    submit() {
      this.$store.dispatch("saveDistributor", this.distributor);
    }
  },
  components: { "v-cloudinary-upload": vuetifyCloudinaryUpload }
};
</script>
<style scoped>
</style>


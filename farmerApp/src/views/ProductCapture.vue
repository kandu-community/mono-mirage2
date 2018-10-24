<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Products</h3>
        <v-text-field
            v-model="product.name"
            label="Product Name"
            single-line
        ></v-text-field>
        <v-text-field
            v-model="product.description"
            label="Product Description"
            single-line
        ></v-text-field>

        <v-cloudinary-upload 
          v-model="product.image"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSource"
        />
        <img
          v-if="thumbnailSrc"
          :src="thumbnailSrc" />
    </v-container>

</template>

<script>
import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";
export default {
  data() {
    return {
      thumbnailSrc: null,
      product: {
        name: null,
        description: null,
        image: null
      },
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      units: [
        "Each/Item",
        "dozen",
        "grams",
        "Kilograms",
        "Millilitres",
        "Litres"
      ]
    };
  },
  methods: {
    gotImageSource(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.thumbnailSrc = src;
    }
  },
  components: { "v-cloudinary-upload": vuetifyCloudinaryUpload }
};
</script>
<style scoped>
</style>


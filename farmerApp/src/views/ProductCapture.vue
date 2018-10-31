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
        <v-select
          :items="units"
          v-model="product.unit"
          label="Unit of measure"
        ></v-select>
        <v-text-field
          label="Available Units in Stock"
          v-model="product.stockLevel"
        ></v-text-field>
        <v-text-field
          label="Price"
          v-model="product.price"
          prefix="R"
        ></v-text-field>
        <p>How about a picture of your lovely product</p>
        <v-cloudinary-upload 
          v-model="product.image"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSource"
        />
        <img
          v-if="product.imageSrc"
          :src="product.imageSrc" />
        <v-btn @click="submit"  color="success">Upload Your Product</v-btn>
    </v-container>
</template>

<script>
import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";
export default {
  data() {
    return {
      product: {
        name: null,
        description: null,
        unit: null,
        stockLevel: null,
        price: null,
        imageSrc: null
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
      this.product.imageSrc = src;
    },
    submit() {
      this.$store.dispatch("saveProduct", this.product);
    }
  },
  components: { "v-cloudinary-upload": vuetifyCloudinaryUpload }
};
</script>
<style scoped>
</style>


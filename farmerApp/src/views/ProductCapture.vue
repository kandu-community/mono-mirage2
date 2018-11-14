<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Products</h3>
        <v-text-field
            v-model="product.name"
            label="Product Name"
            single-line
        ></v-text-field>
        <v-text-field
            v-model="product.productype"
            label="Product Type"
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

<v-flex xs12>
        <p>How about some pictures of your lovely product?</p>
<v-flex xs6>

        <v-cloudinary-upload 
          v-model="product.imageSrc"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSource"
          button-icon="fa-picture-o"
        />
        <img v-if="product.imageSrc"
          :src="product.imageSrc" />
 </v-flex>
<v-flex sxs6>

        <v-cloudinary-upload 
          v-model="product.imageSrctoo"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSourcetoo"
          button-icon="fa-picture-o"
        />
        <img v-if="product.imageSrctoo"
          :src="product.imageSrctoo" />
</v-flex>
<div style="clear:both;line-height:0;height:27px;"></div>
</v-flex>

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
    gotImageSourcetoo(e) {
      console.log("TCL: gotImageSourcetoo -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSourcetoo -> src", src);
      this.product.imageSrctoo = src;
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


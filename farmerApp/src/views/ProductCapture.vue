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
          v-model="image"
          upload-preset="gi9lyrb6"
          cloud-name="dylan-van-den-bosch"
        />
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      units: [
        "Each/Item",
        "dozen",
        "grams",
        "Kilograms",
        "Millilitres",
        "Litres"
      ]
    };
  }
};
</script>

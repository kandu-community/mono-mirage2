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
        <input type="file" accept="image/*">
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: null,
        description: null,
        image: null
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
  components: { "v-cloudinary-upload": vuetifyCloudinaryUpload }
};
</script>

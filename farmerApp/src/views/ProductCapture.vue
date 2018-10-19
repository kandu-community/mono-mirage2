<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Products</h3>
        <v-text-field
<<<<<<< HEAD
            v-model="product.name"
            label="Product Name"
            single-line
        ></v-text-field>
        <v-text-field
            v-model="product.description"
            label="Product Description"
            single-line
=======
            hint persistent-hint
            label="label"
            loading="false"
            mask="mask"
        ></v-text-field>
        <v-text-field
            label="Type of Product"
            id="id"
>>>>>>> e0b0215e4132d11b44378676820c70ecdeacf524
        ></v-text-field>
        
    </v-container>
</template>

<script>
export default {
  data() {
    return {
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

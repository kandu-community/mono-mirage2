<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Products</h3>
        <v-text-field
            hint persistent-hint
            label="label"
            loading="false"
            mask="mask"
        ></v-text-field>
        <v-text-field
            label="Type of Product"
            id="id"
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

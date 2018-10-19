<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Products</h3>
        
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

<template>
  <v-container grid-list-lg fluid>
    <v-layout justify-center row wrap>
      <v-flex xs12 sm10 md8 lg6 xl4  >

        <v-btn to="/profile" block color="primary" dark>My Profile</v-btn>
        <v-btn to="/farm-profile" block color="primary" dark>Farm Enterprise</v-btn>
        <v-btn to="/crop-capture" block color="primary" dark>Crops</v-btn>
        <v-btn to="/products" block color="primary" dark>Products</v-btn>
        <v-btn to="/seeds" block color="primary" dark>Seeds</v-btn>
        <v-btn to="/distributors" block color="primary" dark>Distributors</v-btn>
        <v-btn to="/support" block color="primary" dark>Support</v-btn>
        <v-btn to="/about" block color="primary" dark>What is this?</v-btn>

        <br>
        <v-btn @click="logout" block color="secondary" dark>Log Out</v-btn>
  
      </v-flex>
      
    </v-layout>
    
  </v-container>

</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("USER_TOKEN");
      this.$router.replace("/login");
    }
  },
  computed: {
    farmProfile() {
      return this.$store.getters.farmProfile;
    },
    farmingActivities() {
      return this.$store.getters.farmingActivities;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

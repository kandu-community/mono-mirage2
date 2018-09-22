<template>
  <v-container fluid>
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3 xl4  offset-xl2>

        <v-btn to="/profile" block color="primary" dark>My Profile</v-btn>
        <v-btn block color="primary" dark>The Farm</v-btn>
        <v-btn block color="primary" dark>Our Crops</v-btn>
        <v-btn block color="primary" dark>Our Products</v-btn>
        <v-btn block color="primary" dark>Our Livestock</v-btn>
        <br>
        <v-btn @click="logout" block color="secondary" dark>Log Out</v-btn>
  
      </v-flex>
    
  </v-container>

</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("USER_TOKEN");
      this.$router.replace("/login");
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

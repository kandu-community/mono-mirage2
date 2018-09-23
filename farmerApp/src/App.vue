<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="secondary"
    >
       <!-- <v-icon>fa-github</v-icon> -->
      <v-btn icon to="/">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title>
        Kandu Farms
      </v-toolbar-title>
      <v-spacer></v-spacer>
        
       <v-toolbar-items>
         <v-flex color="white" ma-2>
            <img :src="logo" alt="Kandu">         
         </v-flex>
       </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-alert transition="scale-transition" dismissible type="info" :value="OfflineOnly">
        You are now offline, but can still capture your data. I will attempt to upload your local data when next we're connected.
      </v-alert>
    <div> {{ onlineState }} </div>
            <v-slide-y-transition mode="out-in">
              <router-view/>
            </v-slide-y-transition>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import logo from "@/assets/kandu.png";
export default {
  name: "App",
  created () {
    this.$on('online', function () {
      this.onlineState = "I'm online now!" 
      
    })
    this.$on('offline', function () {
      this.onlineState = "I'm offline now!"
    })
  },
  data() {
    return {
      onlineState: navigator.onLine,
      clipped: false,
      drawer: true,
      fixed: false,
      title: "Kandu Farms",
      logo
    };
  }
};
</script>

<style scoped>
img {
  height: auto;
  object-fit: contain;
  /* max-width: 100%; */
  max-height: 100%;
  display: block;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  transition: width 1s;
}
</style>


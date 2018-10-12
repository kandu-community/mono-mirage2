<template>
<v-container fluid grid-list-xl>
    <v-container grid-list-xs>
    <v-layout justify-center row wrap>
      <v-flex class="container" xs12>
        <div class="dropbox" @drop="incomingCSV" @dragover="stopDefault">
          <h1>Upload Vegetables Meta-Data</h1>
          <p>Dear Paula, please drag your vegetables metadata csv file here.</p>
        </div>
      </v-flex>
      <v-btn @click="showVegOptions" color="success">Show Veg Options</v-btn>
      <v-flex xs4>
        <v-card>
          <v-card-title primary-title>
            <h3>Filter By Name or Email</h3>
          </v-card-title>
          <v-card-text>
            <v-text-field @keypress.enter="$store.dispatch('filterFarmers', filterValue)" box label="name or email contains: " v-model="filterValue"></v-text-field>
            <v-btn :loading="loading" :disabled="loading"
              @click="$store.dispatch('filterFarmers', filterValue)" color="success">Filter By Selection</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-for="person in filteredFarmers" :key="person.name"
      v-if="filteredFarmers" row>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3>{{person.name}} {{person.personalDetails.lastName}}</h3>
          </v-card-title>
          <v-card-text>
            <h3>Farming Activities</h3>
            <p v-if="person.farmingActivities.category">Farming Category: {{person.farmingActivities.category}}</p> 
            <p v-if="person.farmingActivities.shortDescription">Farming Activities: {{person.farmingActivities.shortDescription}}</p>         
            <p>{{ person.email}}</p> 
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
</v-container>
</template>

<script>
import Papa from "papaparse";

export default {
  mounted() {
    this.$store.dispatch("filterFarmers", ""); // Start off with nothing filtered ie. All showing
  },
  data() {
    return {
      filterValue: null,
      selected: []
    };
  },
  computed: {
    filteredFarmers() {
      return this.$store.getters.filteredFarmers;
    },
    loading() {
      return this.$store.getters.farmerFilterLoading;
    }
  },
  methods: {
    showVegOptions() {
      this.$store.dispatch("showVegOptions");
    },
    stopDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    },

    async incomingCSV(e) {
      e.preventDefault();
      e.stopPropagation();

      var dataTransfer = e.dataTransfer.files[0];
      console.log("TCL: asyncincomingCSV -> dataTransfer", dataTransfer);

      Papa.parse(dataTransfer, {
        header: true,
        complete: results => {
          this.$store.dispatch("vegMetadata", results.data);
        }
      });
    }
  }
};
</script>

<style>
.dropbox {
  outline: 2px dashed grey;
  /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  /* minimum height */
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: lightblue;
  /* when mouse over to the drop zone, change color */
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
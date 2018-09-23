<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 lg4 xl4>
        <template v-if="me.name !== ''">
          <div v-if="$apollo.loading">Loading...</div>
          <div v-else>Hi {{ me.name }}, please share a bit more about yourself for us...</div>
        </template>  
        <v-btn color="success" @click="$store.dispatch('fetchMe')">text</v-btn>
        <br>
        <v-stepper vertical v-model="el">

            <v-stepper-step :complete="el > 0" step="1">Who You ARE</v-stepper-step>
            <v-stepper-content step="1">
              <personal-details></personal-details>
            </v-stepper-content>
      
            <!-- <v-divider></v-divider> -->
      
            <v-stepper-step :complete="el > 1" step="2">Where You Are</v-stepper-step>
            <v-stepper-content step="2">
              <address-details></address-details>
            </v-stepper-content>
      
            <!-- <v-divider></v-divider> -->
      
            <v-stepper-step :complete="el > 2" step="3">What You Do</v-stepper-step>

            <v-stepper-content  step="3">
              <farming-activities></farming-activities>
            </v-stepper-content>
      
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import PersonalDetails from "@/components/profile/PersonalDetails";
import AddressDetails from "@/components/profile/Address";
import FarmingActivities from "@/components/profile/FarmingActivities";

export default {
  mounted() {
    console.log("onCreated el is: ", this.el);
    this.elGood = true;
  },
  data() {
    return {
      me: "",
      elGood: false
    };
  },
  computed: {
    el: {
      get() {
        return this.$store.getters.element;
      },
      set(value) {
        return this.$store.dispatch("changeElement", value);
      }
    }
  },

  apollo: {
    me: gql`
      query me {
        me {
          name
          email
        }
      }
    `
  },
  components: {
    PersonalDetails,
    AddressDetails,
    FarmingActivities
  }
};
</script>



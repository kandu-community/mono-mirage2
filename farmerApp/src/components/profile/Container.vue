<template>
    <v-layout row justify-center>
      <v-flex v-if="name !== null" xs12 sm8 lg4 xl4>
        <!-- <template v-if="me.name !== ''">
          <div v-if="$apollo.loading">Loading...</div>
          <div v-else>Hi {{ me.name }}, please share a bit more about yourself for us...</div>
        </template>   -->
        <!-- <v-btn color="success" @click="$store.dispatch('fetchMe')">text</v-btn> -->
        <br>
        <v-stepper v-model="el" vertical>
          <v-stepper-step :complete="el > 1" step="1">
            Who You Are
            <small>So {{ name }}, tell us a bit about yourself</small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <personal-details></personal-details>
          </v-stepper-content>
      
          <v-stepper-step :complete="el > 2" step="2">Where You Are</v-stepper-step>
          <v-stepper-content step="2">
            <address-details></address-details>
          </v-stepper-content>
      
          <v-stepper-step :complete="el > 3" step="3">What You Do</v-stepper-step> 
          <v-stepper-content step="3">
            <farming-activities></farming-activities>
          </v-stepper-content>
        </v-stepper>
      </v-flex>
    </v-layout>
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
      // me: "",
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
    },
    name() {
      return this.$store.getters.docs.me.nm
    },
  },

  // apollo: {
  //   me: gql`
  //     query me {
  //       me {
  //         name
  //         email
  //       }
  //     }
  //   `
  // },
  components: {
    PersonalDetails,
    AddressDetails,
    FarmingActivities
  }
};
</script>



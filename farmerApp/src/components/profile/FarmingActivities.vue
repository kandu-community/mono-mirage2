<template>
  <div>
    <v-select
        label="Farming Activities"
        :items="activitiesSelection"
        v-model="activities"

        hint="Whichever best describes your operation"
        persistent-hint
    ></v-select>
    <p>What kind of things do you do? That is: What would you want to sell via our network?</p>        
    <v-checkbox label="I grow crops" v-model="crops"></v-checkbox>
    <v-checkbox label="I raise livestock" v-model="livestock"></v-checkbox>
    <v-checkbox label="I value-add and have crafts or products to sell" v-model="products"></v-checkbox>
    <v-textarea
        v-model="longDescription"
        label="Care to go into more detail?"
    ></v-textarea>
    <v-btn
        color="primary"
        @click="$store.dispatch('changeElement', 4)
          ; $store.dispatch('farmingActivities', 
            {
              category: activities,
              shortDescription: activities,
              longDescription: longDescription,
              selling: {
                crops, livestock, products
              }
            })"
    >
    Continue
    </v-btn>
  </div>
</template>

<script>
// import { FARMINGACTIVITIES_MUTATION } from "@/graphql/mutations";
export default {
  data() {
    return {
      activitiesSelection: ["Commercial", "Semi-Commercial", "Market-Farmer"],
      activities: "",
      crops: false,
      livestock: false,
      products: false,
      longDescription: ""
    };
  },
  methods: {
    // submit() {
    //   this.$store.dispatch('farmingActivities', {
    //         category: this.activities,
    //         shortDescription: null,
    //         longDescription: this.longDescription
    //       })
    //   // TODO Move this out
    //   this.$apollo
    //     .mutate({
    //       mutation: FARMINGACTIVITIES_MUTATION,
    //       variables: {
    //         category: this.activities,
    //         shortDescription: null,
    //         longDescription: this.longDescription
    //       }
    //     })
    //     .then(response => {
    //       console.log("​response.data", response.data);
    //     })
    //     .catch(error => console.error(error));
    // }
  }
};
</script>



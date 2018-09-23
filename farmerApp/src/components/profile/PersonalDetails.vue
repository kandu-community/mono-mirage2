<template>
    <div>
        <div class="headline">Who You Are</div>
        <v-text-field
            label="Last Name"
            v-model="person.lastName"
            required
        ></v-text-field>
        <v-text-field
            label="Cell Number"
            v-model="person.cellNo"
            :counter="10"
            mask="phone"
        ></v-text-field>
        <v-text-field
            label="Land Line"
            v-model="person.landLine"
            mask="(###) ### ####"
        ></v-text-field>
        <v-text-field
            label="ID Number"
            persistent-hint=""
            hint="Required if you want to sell through us"
            v-model="person.idSA"
            :counter="13"
            mask="###### #### ###"
        ></v-text-field>         
        <v-btn
            color="primary"
            @click="$store.dispatch('changeElement', 1); submit()"
        >
            Continue
        </v-btn>
    </div>
</template>

<script>
import { PERSONALDETAILS_MUTATION } from "@/graphql/mutations";
export default {
  data: () => ({
    person: {}
  }),
  methods: {
    submit() {
      this.$apollo
        .mutate({
          mutation: PERSONALDETAILS_MUTATION,
          variables: {
            lastName: this.person.lastName,
            cellNo: this.person.cellNo,
            landLine: this.person.landLine,
            idSA: this.person.idSA
          }
        })
        .then(response => {
          console.log("​login -> response.data", response.data);
        })
        .catch(error => console.error(error));
    }
  }
};
</script>


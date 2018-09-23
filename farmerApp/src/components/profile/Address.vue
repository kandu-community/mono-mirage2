<template>
  <div>
    <div class="headline">Where You Are</div> 
    <v-text-field
        label="Address Line 1"
        hint="Required of you want to sell through us"
        v-model="address.line1"
    ></v-text-field>   
    <v-text-field
        label="Address Line 2"
        hint="Required of you want to sell through us"
        v-model="address.line2"
    ></v-text-field>     
    <v-text-field
        label="Address Line 3"
        v-model="address.line3"
    ></v-text-field>
    <v-text-field
        label="Area"
        v-model="address.area"
    ></v-text-field>   
    <v-text-field
        label="Postal Code"
        v-model="address.postalCode"
        :counter="4"
        mask="####"
    ></v-text-field>
    <v-select
        :items="provinces"
        v-model="address.province"
        label="Select your province"
        single-line
    ></v-select>                  
    <v-btn
        color="primary"
        @click="$store.dispatch('changeElement', 2); submit()"
      >
        Continue
    </v-btn>    
  </div>
</template>

<script>
import { ADDRESS_MUTATION } from "@/graphql/mutations";
import db from "@/api/pouchDB";

export default {
  data: () => ({
    address: {
      line1: "",
      line2: "",
      line3: "",
      area: "",
      postalCode: "",
      province: ""
    },

    provinces: [
      "Eastern Cape",
      "Free State",
      "Gauteng",
      "KwaZulu-Natal",
      "Limpopo",
      "Mpumalanga",
      "North West",
      "Northern Cape",
      "Western Cape"
    ]
  }),

  methods: {
    submit() {
      this.$apollo
        .mutate({
          mutation: ADDRESS_MUTATION,
          variables: {
            line1: this.address.line1,
            line2: this.address.line2,
            line3: this.address.line3,
            area: this.address.area,
            postalCode: this.address.postalCode,
            province: this.address.province
          }
        })
        .then(response => {
          console.log("​login -> response.data", response.data);
        })
        .catch(error => console.error(error));
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
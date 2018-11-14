<template>
  <div>
    <v-text-field
        label="Street Address"
        hint="Required of you want to sell through us"
        v-model="address.street"
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
        @click="$store.dispatch('changeElement', 3); submit()"
      >
        Save Draft
    </v-btn>    
  </div>
</template>

<script>
import { ADDRESS_MUTATION } from "@/graphql/mutations";
import db from "@/api/pouchDB";

export default {
  mounted() {
      if(this.$store.getters.address !== null) {
          this.address = this.$store.getters.address
      }
  },
  data: () => ({
    address: {
      street: null,
      area: null,
      postalCode: null,
      province: null
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
  computed: {
    storedAddress() {
      return this.$store.getters.address
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('address', this.address)
    }

  },
  watch: {
    storedAddress(newVal){
      if(newVal !== null) {
        this.address = newVal
      }
    }
  }
};
    // submit() {
    //   this.$apollo
    //     .mutate({
    //       mutation: ADDRESS_MUTATION,
    //       variables: {
    //         street: this.address.street,
    //         area: this.address.area,
    //         postalCode: this.address.postalCode,
    //         province: this.address.province
    //       }
    //     })
    //     .then(response => {
    //       console.log("​login -> response.data", response.data);
    //     })
    //     .catch(error => console.error(error));
    // },
    // clear() {
    //   this.$refs.form.reset();
    // }
</script>
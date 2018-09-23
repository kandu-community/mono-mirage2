<template>
<v-container
fluid
>
  <v-layout column align-center>
      <v-flex xs12>
        <v-form ref="form" v-model="valid" lazy-validation>
        <template v-if="me.name !== null">
        </template>
            <v-text-field v-if="!$apollo.loading"
                :rules="nameRules"
                :counter="10"
                label="Garden Name"
                :value="me.name"
                required
            ></v-text-field>
            <v-text-field
                label="Last Name"
                v-model="me.name"
                required
            ></v-text-field>
            <v-select
                label="Farming Activities"
                :items="items.activities"
                v-model="activities"
                multiple
                chips
                hint="You can pick more than one"
                persistent-hint
            ></v-select>
            <v-text-field v-if="!$apollo.loading"
                :rules="emailRules"
                :label="me.email"
                :value="me.email"
                required
            ></v-text-field>
            <v-text-field
                v-model="shortDescription"
                label="Short Description - What is your PASSION?"
                required
            ></v-text-field>
            <v-textarea
                v-model="longDescription"
                label="Care to go into more detail?"
            ></v-textarea>        
            <v-text-field v-if="!$apollo.loading"
                v-model="shortDescription"
                label="Short Description - What is your PASSION?"
                required
            ></v-text-field>
                    <v-textarea v-if="!$apollo.loading"
                v-model="longDescription"
                label="Care to go into more detail?"
            ></v-textarea>

            <v-btn
                :disabled="!valid"
                href="https://welink.netlify.com/"
                target="blank"
            >
                submit
            </v-btn>
            <v-btn @click="clear"><a  ></a>clear</v-btn>
        </v-form>
          
      </v-flex>
  </v-layout>  
</v-container> 
</template>
<script>
//	Enterprise Type  (Option/Single Select)	Farming Activity	Farming Practice		Association	Profile Pic

export default {
  data() {
    return {
      person: {
        lastName: "",
        cellNo: null,
        landLine: null,
        id: null,
        address: {
          line1: "",
          line2: "",
          line3: "",
          area: "",
          postalCode: "",
          province: ""
        },
        enterprise: "",
        activity: "",
        practice: "",
        association: "",
        profilePic: null
      },
      items: {
        activities: []
      },
      activities: [],
      shortDescription: "",
      longDescription: ""
    };
  }
};
</script>

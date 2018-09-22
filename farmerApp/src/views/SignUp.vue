<template>
<v-container
fluid
>
  <v-layout column align-center>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="signup">
        <v-text-field 
            v-model="name"
            label="Name you're known by"
            required
        ></v-text-field>
        <v-text-field 
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>
        <v-text-field :type="'password'"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
        ></v-text-field>
        <v-text-field :type="'password'"
            v-model="confirmPassword"
            :rules="[comparePasswords == '']"
            label="Password Confirmation"
            
        ></v-text-field>
        <v-btn type="submit" :class="{ red: !valid, green: valid }">Sign Up</v-btn>
        <v-btn @click="clear">clear</v-btn>
                        <v-flex>
                <p> Already have an account? <router-link to="/login">Log In</router-link></p>
                </v-flex>
    </v-form>

  </v-layout>  
</v-container>
    
</template>

<script>
import { SIGNUP_MUTATION } from "@/graphql/mutations";

import db from "@/api/pouchDB";

export default {
  name: "SignUp",
  data: () => ({
    valid: true,
    name: "",
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => (v && v.length > 5) || "Password must be more than 5 characters"
    ],
    confirmPassword: ""
  }),
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    }
  },

  methods: {
    signup() {
      if (this.$refs.form.validate()) {
        console.log(
          "​login -> this.$refs.form.validate()",
          this.$refs.form.validate()
        );
        var doc = {
          _id: "user1",
          nm: this.name,
          pw: this.password,
          em: this.email
        };
        db.put(doc);
        this.$router.replace("/");
        db.get("user1").then(function(doc) {
          console.log(doc);
        });

        this.$apollo
          .mutate({
            // we make use of a mutate method available on this.$apollo (from the Vue Apollo plugin).
            mutation: SIGNUP_MUTATION,
            variables: {
              name: this.name,
              email: this.email,
              password: this.password
            }
          })
          // Once the signup process is successful, which means a user has been created, we save the user token to localstorage and redirect the user to the homepage. If there was an error, we catch and log the error to the console.
          .then(response => {
            localStorage.setItem("USER_TOKEN", response.data.signup.token);
            console.log("​login -> response.data", response.data);
            // redirect to login page
            this.$router.replace("/");
          })
          .catch(error => console.error(error));
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

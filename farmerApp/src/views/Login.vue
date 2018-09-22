<template>
    <v-container
    fluid
    >
        <v-layout column align-center>
            <v-flex xs12 ma-0>
                <v-form @submit.prevent="login" ref="form" v-model="valid" lazy-validation>

                    <v-text-field 
                        v-model="email"
                        label="E-mail"
                        required
                    ></v-text-field>
                    <v-text-field :type="'password'"
                        v-model="password"
                        label="Password"
                        required
                    ></v-text-field>
                    <v-btn type="submit" :class="{ red: !valid, green: valid }">Log in</v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
                <br>
                <v-flex>
                <p> Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
/**POUCH DB CREATE DOC EXAMPLE
 * var doc = {
  "_id": "mittens",
  "name": "Mittens",
  "occupation": "kitten",
  "age": 3,
  "hobbies": [
    "playing with balls of yarn",
    "chasing laser pointers",
    "lookin' hella cute"
  ]
};
db.put(doc);
 */
import { LOGIN_MUTATION } from "@/graphql/mutations";
export default {
  name: "LogIn",
  data: () => ({
    valid: true,
    email: "",
    password: ""
  }),
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$apollo
          .mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: this.email,
              password: this.password
            }
          })
          .then(response => {
            localStorage.setItem("USER_TOKEN", response.data.login.token);
            console.log(
              "​login -> response.data.login.token",
              response.data.login.token
            );
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

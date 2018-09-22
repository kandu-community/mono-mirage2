<template>
    <div>
                <div class="headline">What You Do</div>
                <v-select
                    label="Farming Activities"
                    :items="activitiesSelection"
                    v-model="activities"

                    hint="Whichever best describes your operation"
                    persistent-hint
                ></v-select>
                <v-textarea
                    v-model="longDescription"
                    label="Care to go into more detail?"
                ></v-textarea>        
                
        
            <v-btn
                color="primary"
                @click="$store.dispatch('changeElement', 1); submit()"
            >
            Continue
            </v-btn>

    </div>
</template>

<script>
import { FARMINGACTIVITIES_MUTATION } from "@/graphql/mutations";
export default {
  data() {
    return {
      activitiesSelection: ["Commercial", "Semi-Commercial", "Market-Grower"],
      activities: "",

      longDescription: ""
    };
  },
  methods: {
    submit() {
      this.$apollo
        .mutate({
          mutation: FARMINGACTIVITIES_MUTATION,
          variables: {
            category: this.activities,
            shortDescription: null,
            longDescription: this.longDescription
          }
        })
        .then(response => {
          console.log("​response.data", response.data);
        })
        .catch(error => console.error(error));
    }
  }
};
</script>



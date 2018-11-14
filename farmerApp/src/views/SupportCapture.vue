<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Support Request</h3>



        <v-flex xs6>
        <v-menu
        ref="date"
        :close-on-content-click="false"
        v-model="date"
        :return-value.sync="support.date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        >
        <v-text-field
            slot="activator"
            v-model="support.date"
            label="Where are we today?"
            prepend-icon="event"
            readonly
        ></v-text-field>
        <v-date-picker v-model="support.date" @input="$refs.date.save(support.date)"></v-date-picker>
        </v-menu>
        </v-flex>



        <v-text-field
            v-model="support.challenge"
            label="Support Challenge Title"
            single-line
        ></v-text-field>
        
        <v-select
          :items="challengetypes"
          v-model="support.challengetype"
          label="What type of challenge should we prepare for?"
        ></v-select>



        
        <v-select
          :items="escalations"
          v-model="support.escalation"
          label="How severe is the Support request?"
        ></v-select>




        <v-text-field
            v-model="support.description"
            label="Challenge Description"
            single-line
        ></v-text-field>

        <v-select
          :items="resolves"
          v-model="support.resolve"
          label="Is this Challenge resolved?"
        ></v-select>




        <v-text-field
            v-model="support.notes"
            label="How was this Challenge resolved?"
        ></v-text-field>











<v-flex xs12>
        <p>Please take clear pictures for people to see what the problem is</p>
<v-flex xs6>

        <v-cloudinary-upload 
          v-model="support.image1Src"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSource"
          button-icon="fa-picture-o"
        />
        <img v-if="support.image1Src"
          :src="support.image1Src" />
 </v-flex>
<v-flex sxs6>

        <v-cloudinary-upload 
          v-model="support.image2Src"
          :upload-preset="cloudinary.preset"
          :cloud-name="cloudinary.name"
          @input="gotImageSourcetoo"
          button-icon="fa-picture-o"
        />
        <img v-if="support.image2Src"
          :src="support.image2Src" />
</v-flex>
<div style="clear:both;line-height:0;height:27px;"></div>
</v-flex>

        <v-btn @click="submit"  color="success">Upload Your Support Ticket</v-btn>
    </v-container>
</template>

<script>
import vuetifyCloudinaryUpload from "vuetify-cloudinary-upload";
import srcForCloudinary from "@/helpers/srcForCloudinary.js";
export default {
  data() {
    return {
      support: {

        date: null,
        challenge: null,
        challengetype: null,
        escalation: null,
        description: null,
        resolve: null,
        notes: null,
        image1Src: null,
        image2Src: null

      },
      cloudinary: {
        name: "dylan-van-den-bosch",
        preset: "gi9lyrb6"
      },
      challengetypes: [
        "Pests eating the Produce",
        "Water Storage",
        "Composting",
        "Weeds",
        "Earthworms",
        "Companion Plants",
        "Science Fiction"
      ],
      escalations: [
        "SOS Please Help",
        "Suggestions and Guidance Please",
        "Hi There, Just Curious"
      ],
      resolves: [
        "Yes, this issue is resolved",
        "We are waiting for an outcome",
        "No satisfactory resolution as yet"
      ]
    };
  },
  methods: { 
    gotImageSource(e) {
      console.log("TCL: gotImageSource -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSource -> src", src);
      this.support.image1Src = src;
    },
    gotImageSourcetoo(e) {
      console.log("TCL: gotImageSourcetoo -> e", e);
      const src = srcForCloudinary(this.cloudinary.name, e);
      console.log("TCL: gotImageSourcetoo -> src", src);
      this.support.image2Src = src;
    },
    submit() {
      this.$store.dispatch("saveSupport", this.support);
    }
  },
  components: { "v-cloudinary-upload": vuetifyCloudinaryUpload }
};
</script>
<style scoped>
</style>


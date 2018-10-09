<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Capture A Crop</h3>
        <v-autocomplete
          label="Crop Category"
          :items="cropTypes"
          v-model="crop.category"
        ></v-autocomplete>
        <v-layout row wrap>
            <v-flex xs12>
                <h4 class="mb-1">Harvest Window</h4>
                <p class="font-weight-light mb-1" >Over what period of time do you expect to be harvesting the crop?</p>        
            </v-flex>
            <v-flex xs6>
                <v-menu
                ref="startDate"
                :close-on-content-click="false"
                v-model="dateOne"
                :return-value.sync="crop.startDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="crop.startDate"
                    label="End"
                    prepend-icon="event"
                    readonly
                ></v-text-field>
                <v-date-picker v-model="crop.startDate" @input="$refs.startDate.save(crop.startDate)"></v-date-picker>
                </v-menu>
            </v-flex>

            <v-flex xs6>
                <v-menu
                ref="endDate"
                :close-on-content-click="false"
                v-model="dateTwo"
                :return-value.sync="crop.endDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                    slot="activator"
                    v-model="crop.endDate"
                    label="Start"
                    prepend-icon="event"
                    readonly
                ></v-text-field>
                <v-date-picker v-model="crop.endDate" @input="$refs.endDate.save(crop.endDate)"></v-date-picker>
                </v-menu>
            </v-flex>
            
        </v-layout>


    </v-container>
</template>

<script>
export default {
  data() {
    return {
      cropTypes: ["Vegetables", "Herbs", "Fruit"],
      crop: {
        category: null,
        description: null,
        harvestWindow: {
          startDate: null,
          endDate: null
        }
      },
      dateOne: false,
      dateTwo: false
    };
  }
};
</script>


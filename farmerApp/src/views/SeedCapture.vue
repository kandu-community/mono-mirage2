<template>
    <v-container grid-list-xs>
        <h3 class="display-1">Bank a Seed</h3>


        <v-autocomplete
        @input="setSelection"
          label="Seed Category"
          :items="seedTypes"
          v-model="seed.category"
        ></v-autocomplete>

        <v-autocomplete 
          label="Seed Name"
          :items="seedNames"
          v-model="seed.name"
        ></v-autocomplete>
        
        <v-layout row wrap>
          
          <v-flex xs12>
            <v-text-field
              v-model="seed.description"
              name="description"
              label="How About a short Description of the Seed?"
              id="id"
            ></v-text-field>
          </v-flex>



        <v-flex xs12>
    <v-select
        label="Unit of Measure"
        :items="units"
        v-model="seed.unit"

        hint="What is the unit of measure?"
        persistent-hint
    ></v-select>

        </v-flex>
        <div style="clear:all;line-height:0;height:27px;">&nbsp;</div>




          <v-flex xs12>
            <v-text-field
              v-model="seed.stockLevel"
              name="stockLevel"
              label="How many Units of this seed is available?"
              id="id"
            ></v-text-field>
          </v-flex>



          <v-flex xs12>
            <v-text-field
              v-model="seed.price"
              name="price"
              label="What is the Price for each Unit?"
              id="id"
            ></v-text-field>
          </v-flex>



            <v-flex xs12>
                <h4 class="mb-1">Harvest Date</h4>
                <p class="font-weight-light mb-1" >When did you harvest this seed?</p>        
            </v-flex>



        <v-flex xs6>
        <v-menu
        ref="harvestDate"
        :close-on-content-click="false"
        v-model="harvestDate"
        :return-value.sync="seed.harvestDate"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        >
        <v-text-field
            slot="activator"
            v-model="seed.harvestDate"
            label="The date you harvested this seed"
            prepend-icon="event"
            readonly
        ></v-text-field>
        <v-date-picker v-model="seed.harvestDate" @input="$refs.harvestDate.save(seed.harvestDate)"></v-date-picker>
        </v-menu>
        </v-flex>







                <v-btn @click="saveSeed" color="success">Save</v-btn>





        </v-layout>
    </v-container>
</template>

<script>




export default {

  data() {
    return {
      seed: {
        category: null,
        name: null,
        description: null,
        unit: null,
        stockLevel:null,
        price:null,
        harvestDate: null
      },
      seedTypes: ["Vegetable", "Herb", "Fruit", "Medicine"],
      seedNames: ["bean", "spinach", "carrot"],
      units: ["Each/Item", "dozen", "grams", "Kilograms", "Millilitres", "Litres"]
    };
  },
  methods: {
    saveSeed() {
      this.$store.dispatch("saveSeed", this.seed);
    }
  }
};
</script>


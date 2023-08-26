<template>
  <div>
    <v-form>
      <v-container fluid>
        <v-col cols="8" md="8" sm="10" class="py-0">
          <div class="field-name">Product Type</div>
          <v-select
            placeholder="Personal Loan"
            dense
            outlined
            background-color="#FFF"
          >
          </v-select>
        </v-col>
        <v-col cols="6" md="6" sm="10" class="py-0">
          <div class="field-name">Loan Amount</div>
          <v-text-field
            class="amount"
            height="40px"
            placeholder="Enter Loan Amount"
            single-line
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="10" class="py-0">
          <div class="field-name">Tenure</div>
          <v-text-field
            class="amount"
            height="40px"
            placeholder="Tenure"
            single-line
          ></v-text-field>
        </v-col>
      </v-container>
    </v-form>
    <div class="d-flex justify-end mb-1">
      <v-btn class="mr-4" outlined color="primary" @click="changeStepper(4)">
        Back
      </v-btn>
      <v-btn rounded class="white--text" color="primary"> Create Loan </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeStepper(value) {
      this.$store.dispatch("createLead/setStepperId", value);
    },
  },
};
</script>
<style >
.amount.v-text-field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot {
  font-size: 35px !important;
}
</style>
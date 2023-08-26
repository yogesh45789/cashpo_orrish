<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      width="380"
      height="800"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Add Charges
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form ref="addCharges">
            <v-container>
              <v-row class="py-0 mt-2 justify-end">
                <v-col cols="12" class="py-0">
                  <div class="">VAS Type</div>
                  <v-select
                    class="py-0"
                    :rules="[$rules.required]"
                    placeholder="Processing Fee"
                    dense
                    outlined
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Ledger</div>
                  <v-select
                    :rules="[$rules.required]"
                    class="py-0"
                    placeholder="Select Ledger"
                    dense
                    outlined
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Taxable Amount</div>
                  <v-text-field
                    :rules="[$rules.required]"
                    type="number"
                    class="py-0"
                    placeholder="Enter Amount (₹)"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Discount</div>
                  <v-text-field
                    :rules="[$rules.required]"
                    type="number"
                    class="py-0"
                    placeholder="Enter Amount (₹)"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Total Charge Amount</div>
                  <v-text-field
                    :rules="[$rules.required]"
                    type="number"
                    class="py-0"
                    placeholder="Enter Amount (₹)"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <div class="d-flex mr-3">
                  <v-btn rounded color="primary" class="white--text">
                    Submit
                  </v-btn>
                </div>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "AddCharges",
  props: ["dialog_data"],
  data() {
    return {
      dialog: this.dialog_data,
      //   dialog: {
      //     flag: true,
      //   },
    };
  },
};
</script>
<style scoped>
</style>
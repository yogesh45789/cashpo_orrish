<template>
  <div>
    <v-row>
      <v-col cols="3" class="">
        <v-dialog
          scrollable
          width="1100"
          persistent
          v-model="dialog.flag"
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-card-title class="primary">
              <div class="white--text">Charge</div>
              <v-spacer />
              <v-btn @click="dialog.flag = false" icon
                ><v-icon color="white">mdi-close</v-icon></v-btn
              >
            </v-card-title>
            <v-card-text class="pa-0">
              <v-row class="pa-0 ma-0">
                <v-col cols="3" class="pa-0 ma-0">
                  <v-card width="300px" color="#DBEFFF">
                    <v-container fluid class="pt-0">
                      <v-card-text>
                        <h3 style="color: #2f80ed" class="pl-2 pt-1">
                          Add Charge
                        </h3>
                        <h4 style="color: #2f80ed" class="pl-1 pt-2">Amount</h4>
                        <v-text-field
                          class="pl-1 pt-1"
                          outlined
                          dense
                          color="primary"
                          background-color="white"
                          clearable
                          v-model="amount"
                          label="40,0000"
                        >
                        </v-text-field>
                        <p style="color: #2f80ed" class="mt-0">
                          Total Overdue Amount: ₹40500
                        </p>
                        <h4 style="color: #2f80ed" class="pl-0 mt-3">
                          Remarks
                        </h4>
                        <v-textarea
                          class="pt-2 pl-1"
                          outlined
                          dense
                          color="primary"
                          background-color="white"
                          clearable
                          v-model="remark"
                          label="Remarks.."
                          rows="3"
                        ></v-textarea>
                        <div class="btn">
                          <v-btn
                            class="mx-4 primary"
                            color="white"
                            outlined
                            rounded
                            @click="submit"
                            >Submit</v-btn
                          >
                        </div>
                        <div class="image">
                          <v-img
                            src="@/assets/profits1.svg"
                            width="95"
                            height="86"
                          >
                          </v-img>
                        </div>
                      </v-card-text>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col cols="9" class="pa-0"> <ChargeHistory /></v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
<!-- eslint-disable vue/no-dupe-keys -->
<script>
export default {
  name: "AddCharge",
  props: ["add_charge_dialog"],
  components:{
    ChargeHistory: () => import ("@/components/collection/Dialogs/ChargeHistory.vue")
  },
  data() {
    return {
      dialog: this.add_charge_dialog,
      amount: "",
      remark: "",
    };
  },
  methods: {
    submit() {},
  },
};
</script>
<style scoped>
.card {
  background-color: #dbefff;
}
.btn {
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 0px;
}
</style>
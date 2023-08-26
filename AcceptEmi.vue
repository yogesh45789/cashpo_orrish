<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      width="500"
      scrollable
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Accept EMI
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text class="pb-1">
          <v-form ref="acceptEmiValidation">
            <v-container fluid>
              <v-row class="py-0 mt-2 mb-1 justify-end">
                <v-col cols="12" class="py-0">
                  <div class="">Mode of Payment</div>
                  <v-select
                    :rules="[$rules.required]"
                    class="py-0"
                    placeholder="Select Payment Mode"
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
                  <div class="">Amount</div>
                  <v-text-field
                    :rules="[$rules.required]"
                    type="number"
                    class="py-0"
                    placeholder="amount"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" class="py-0">
                  <table>
                    <thead>
                      <tr>
                        <th>EMI</th>
                        <th>Amount</th>
                        <th>Charges</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1st</td>
                        <td>₹ 5147</td>
                        <td>₹ 153</td>
                        <td>₹ 5300</td>
                      </tr>
                      <tr>
                        <td>2nd</td>
                        <td>₹ 1000</td>
                        <td>₹ 00</td>
                        <td>₹ 1000</td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>

                <v-col cols="12" class="pt-0">
                  <div class="mt-4">Narration</div>
                  <v-textarea
                    :rules="[$rules.required]"
                    type="text"
                    class="py-0"
                    placeholder="Enter here"
                    outlined
                    auto-grow
                    hide-details
                    row-height="15"
                  >
                  </v-textarea>
                </v-col>
                <div class="d-flex mr-3">
                  <v-btn
                    @click="otp_dialog.flag = true"
                    rounded
                    color="primary"
                    class="white--text"
                  >
                    Submit
                  </v-btn>
                </div>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      width="380"
      v-model="otp_dialog.flag"
      scrollable
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Verification
          <v-btn @click="otp_dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container fluid>
              <v-row class="py-0 mt-2 mb-1 justify-end">
                <v-col cols="12" class="py-0">
                  <div class="">
                    Enter the verification code send to your phone.
                  </div>
                  <v-otp-input class="otp_input" length="4"></v-otp-input>
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
  name: "AcceptEmi",
  props: ["dialog_data"],
  data() {
    return {
      dialog: this.dialog_data,
      otp_dialog: {
        flag: false,
      },
    };
  },
};
</script>
<style lang="scss" scoped>
table {
  border-radius: 4px;
  width: 100%;
  background-color: #dedede;
  thead {
    tr {
      th {
        height: 45px;
      }
    }
  }
  tbody {
    tr {
      td {
        height: 40px;
        text-align: center;
      }
    }
  }
}
.otp_input {
  width: 226px;
}
</style>
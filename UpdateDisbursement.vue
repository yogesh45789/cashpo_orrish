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
          Update Disbursement
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row class="py-0 mt-2 justify-end">
                <v-col cols="12" class="py-0">
                  <div class="">Date</div>
                  <v-menu
                    ref="menu1"
                    v-model="startMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startDate"
                        :rules="[$rules.required]"
                        placeholder="Select Date"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        dense
                        background-color="#FFF"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="startMenu = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="startMenu = false">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Ledger</div>
                  <v-select
                    class="py-0"
                    placeholder="Select Ledger"
                    :rules="[$rules.required]"
                    dense
                    outlined
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">UTR/Reference No.</div>
                  <v-text-field
                    class="py-0"
                    type="number"
                    :rules="[$rules.required]"
                    placeholder="Enter UTR or Reference No."
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Narration</div>
                  <v-textarea
                    :rules="[$rules.required]"
                    type="text"
                    class="py-0"
                    height="80"
                    placeholder="Write here..."
                    dense
                    outlined
                  >
                  </v-textarea>
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
  name: "UpdateDisbursement",
  props: ["disbursement"],
  data() {
    return {
      dialog: this.disbursement,
      startDate: null,
      startMenu: false,
      //   dialog: {
      //     flag: true,
      //   },
    };
  },
};
</script>
<style scoped>
</style>
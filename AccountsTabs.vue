<template>
  <div>
    <LoanDetailsTabs>
      <template #pay_mode>
        <div class="mt-6">
          <v-col cols="12">
            <v-row>
              <v-col class="py-0" cols="4">
                <div>Mode of Payment</div>
              </v-col>
              <v-col class="py-0" cols="8">
                <v-select
                  :rules="[$rules.required]"
                  dense
                  placeholder="Bank"
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="4">
                <div>Ledger</div>
              </v-col>
              <v-col class="py-0" cols="8">
                <v-select
                  :rules="[$rules.required]"
                  dense
                  placeholder="Select Ledger"
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="4">
                <div>Channel</div>
              </v-col>
              <v-col class="py-0" cols="8">
                <v-select
                  :rules="[$rules.required]"
                  dense
                  placeholder="NFET"
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="4">
                <div>Amount</div>
              </v-col>
              <v-col class="py-0" cols="8">
                <v-select
                  :rules="[$rules.required]"
                  type="number"
                  dense
                  placeholder="Amount"
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="4">
                <div>Date</div>
              </v-col>
              <v-col class="py-0" cols="8">
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
            </v-row>
          </v-col>

          <div class="d-flex justify-space-between">
            <div class="d-flex justify-center">
              <v-btn
                v-if="!approve"
                rounded
                elevation="0"
                class="white--text mt-3 mx-3"
                color="#27AE60"
                @click="approve = true"
              >
                Approve & Disburse</v-btn
              >
              <transition name="fade" mode="in-out">
                <div v-if="approve">
                  <v-btn
                    rounded
                    elevation="0"
                    class="white--text mt-3 mx-3"
                    color="#2F80ED"
                    @click="auto_posting.flag = true"
                  >
                    Auto Posting</v-btn
                  >
                  <v-btn
                    rounded
                    elevation="0"
                    class="white--text mt-3 mx-3"
                    color="#F18324"
                    @click="disbursement_dialog.flag = true"
                  >
                    Manual Posting</v-btn
                  >
                </div>
              </transition>
              <div>
                <v-btn rounded color="#D7443E" class="mt-3 white--text mx-3">
                  Reject</v-btn
                >
              </div>
            </div>
          </div>
        </div>
        <UpdateDisbursement :disbursement="disbursement_dialog" />
        <AutoPosting :autoPosting="auto_posting" />
      </template>
    </LoanDetailsTabs>
  </div>
</template>

<script>
export default {
  name: "AccountTabs",
  components: {
    LoanDetailsTabs: () =>
      import("@/components/lms/LoanHistory/LoanDetailsTab.vue"),
    UpdateDisbursement: () =>
      import("@/components/accounts/Dialogs/UpdateDisbursement.vue"),
    AutoPosting: () => import("@/components/accounts/Dialogs/AutoPosting.vue"),
  },
  data() {
    return {
      startDate: null,
      startMenu: false,
      disbursement_dialog: {
        flag: false,
      },
      auto_posting: {
        flag: false,
      },
      approve: false,
    };
  },
};
</script>

<style scoped>
</style>
<template>
  <div>
    <v-dialog
      scrollable
      v-model="dialog.flag"
      width="1150"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Approval Form
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form ref="approval_form" v-model="is_form_valid">
            <v-container fluid>
              <v-col cols="12" md="12">
                <h3 class="pb-6">Details</h3>
                <v-row>
                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">Applied Amount</div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      v-model="approval_form.applied_amount"
                      outlined
                      type="number"
                      background-color="#FFF"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">Tenure</div>
                    <v-text-field
                      placeholder="Enter Email"
                      dense
                      outlined
                      v-model="approval_form.tenure"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8" md="8" class="py-0">
                    <v-radio-group
                      row
                      class=""
                      v-model="approval_form.bank_detailed_matched"
                    >
                      <div class="field-name mt-2 mr-3">
                        Bank Detailed Matched
                      </div>
                      <v-radio
                        label="Yes"
                        v-bind:value="true"
                        class="px-4"
                      ></v-radio>
                      <v-radio
                        label="No"
                        v-bind:value="false"
                        class="px-4"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">Salary In Application</div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      outlined
                      v-model="approval_form.salary_in_application"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">In Bank Statement</div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      outlined
                      background-color="#FFF"
                      v-model="approval_form.in_bank_statement"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">Salary Amount</div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      outlined
                      v-model="approval_form.salary_amount"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">Balance on next day</div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      outlined
                      v-model="approval_form.balance_on_next_day"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <h3 class="pb-6 mt-3">Credit Report (Experian)</h3>
                <v-row>
                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">Obligation (As per CIBIL)</div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      outlined
                      v-model="approval_form.obligation_as_per_cibil"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">
                      Obligation (As per Bank Statement)
                    </div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      outlined
                      background-color="#FFF"
                      v-model="approval_form.obligation_as_per_statement"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">CIBIL (Current Balance)</div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      outlined
                      v-model="approval_form.cibil_current_balance"
                      background-color="#FFF"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="3" md="3" sm="6" class="py-0">
                    <div class="field-name">CIBIL (Overdue)</div>
                    <v-text-field
                      placeholder="Enter Amount (₹)"
                      dense
                      outlined
                      background-color="#FFF"
                      v-model="approval_form.cibil_overdue"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-data-table
                  :headers="headers"
                  :items="approval_form.bank_info_by_cibil"
                  hide-default-footer
                  class="mt-7"
                >
                  <template v-slot:[`item.sn_o`]="{ index }">
                    <!-- <div>{{ item.sn_o }}</div> -->
                    <div>{{ index + 1 }}</div>
                  </template>
                  <template v-slot:[`item.bank_name`]="{ item }">
                    <!-- {{ item }} -->
                    <v-text-field
                      v-model="item.bank_name"
                      placeholder="Enter Bank Name"
                      background-color="#FFF"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </template>
                  <template v-slot:[`item.loan_amount`]="{ item }">
                    <v-text-field
                      v-model="item.loan_amount"
                      placeholder="Enter Amount (₹)"
                      type="number"
                      background-color="#FFF"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </template>
                  <template v-slot:[`item.emi_amount`]="{ item }">
                    <v-text-field
                      v-model="item.emi_amount"
                      placeholder="Enter Amount (₹)"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </template>
                  <template v-slot:[`item.number_of_bounce`]="{ item }">
                    <v-text-field
                      v-model="item.number_of_bounce"
                      placeholder="Enter Amount (₹)"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </template>
                  <template v-slot:[`item.current_balance`]="{ item }">
                    <v-text-field
                      v-model="item.current_balance"
                      placeholder="Enter Amount (₹)"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </template>
                  <template v-slot:[`item.overdue`]="{ item }">
                    <v-text-field
                      v-model="item.overdue"
                      placeholder="Enter Amount (₹)"
                      background-color="#FFF"
                      type="number"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </template>
                  <template v-slot:[`item.loan_status`]="{ item }">
                    <v-text-field
                      v-model="item.loan_status"
                      placeholder="Closed/Open"
                      background-color="#FFF"
                      :rules="[$rules.required]"
                    >
                    </v-text-field>
                  </template>
                  <template v-slot:[`item.close`]="{ index }">
                    <!-- {{ index }} -->
                    <v-btn
                      v-if="approval_form.bank_info_by_cibil.length > 1"
                      @click="removeField(index)"
                      class=""
                      icon
                    >
                      <v-icon color="red">mdi-close-circle</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>

                <v-btn
                  @click="addMore"
                  rounded
                  class="mt-4"
                  outlined
                  color="primary"
                >
                  <v-icon color="primary">mdi-plus</v-icon> Add More
                </v-btn>

                <v-row class="pt-10">
                  <v-col cols="8" md="8" class="py-0">
                    <v-radio-group
                      row
                      class=""
                      v-model="approval_form.kyc_matched"
                    >
                      <div class="field-name mt-2 mr-3">KYC Matched</div>
                      <v-radio
                        label="Yes"
                        v-bind:value="true"
                        class="px-4"
                      ></v-radio>
                      <v-radio
                        label="No"
                        v-bind:value="false"
                        class="px-4"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="8" md="8" class="py-0">
                    <div class="field-name mt-2 mr-3">Address Proof</div>
                    <v-radio-group
                      row
                      class=""
                      v-model="approval_form.address_proof_verfied"
                    >
                      <v-radio
                        label="Verified"
                        v-bind:value="true"
                        class="px-4"
                      ></v-radio>
                      <v-radio
                        label="Not Verified"
                        v-bind:value="false"
                        class="px-4"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="12" sm="12" class="py-0">
                    <div class="field-name">Extra Info (If any)</div>
                    <v-text-field
                      placeholder="Enter here"
                      dense
                      outlined
                      background-color="#FFF"
                      v-model="approval_form.extra_info"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <h3 class="pb-6 mt-6">Analysed By</h3>
                <div class="mb-5">
                  Date:
                  <span v-if="approval_form.analysed_date">
                    {{ approval_form.analysed_date }}
                  </span>
                  <span v-else>
                    {{ new Date() }}
                  </span>
                </div>
                <v-row class="">
                  <v-col cols="4" md="4" sm="4" class="py-0">
                    <!-- <div class="field-name">Extra Info (If any)</div> -->
                    <v-text-field
                      v-if="approval_form.analysed_by_executive"
                      placeholder="Executive Name (Autofilled)"
                      dense
                      background-color="#FFF"
                      v-model="approval_form.analysed_by_executive.full_name"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" md="4" sm="4" class="py-0">
                    <!-- <div class="field-name">Extra Info (If any)</div> -->
                    <v-text-field
                      placeholder="Loan Amount (₹)"
                      v-model="approval_form.executive_entered_loan_amount"
                      dense
                      background-color="#FFF"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" md="4" sm="4" class="py-0">
                    <!-- <div class="field-name">Extra Info (If any)</div> -->
                    <v-text-field
                      placeholder="EMI Amount (₹)"
                      dense
                      background-color="#FFF"
                      v-model="approval_form.executive_entered_emi_amount"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <h3 class="pb-3 mt-5">Approved By</h3>
                <v-row class="pt-2">
                  <v-col cols="4" md="4" sm="4" class="py-0">
                    <!-- <div class="field-name">Extra Info (If any)</div> -->
                    <v-text-field
                      v-if="approval_form.approved_by_executive"
                      placeholder="Executive Name (Autofilled)"
                      dense
                      :disabled="dialog_show.form_status == 'fill'"
                      background-color="#FFF"
                      v-model="approval_form.approved_by_executive.full_name"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" md="4" sm="4" class="py-0">
                    <!-- <div class="field-name">Extra Info (If any)</div> -->
                    <v-text-field
                      placeholder="Loan Amount (₹)"
                      dense
                      :disabled="dialog_show.form_status == 'fill'"
                      background-color="#FFF"
                      v-model="
                        approval_form.approved_executive_entered_loan_amount
                      "
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" md="4" sm="4" class="py-0">
                    <!-- <div class="field-name">Extra Info (If any)</div> -->
                    <v-text-field
                      placeholder="EMI Amount (₹)"
                      dense
                      :disabled="dialog_show.form_status == 'fill'"
                      v-model="
                        approval_form.approved_executive_entered_emi_amount
                      "
                      background-color="#FFF"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </v-form>
          <v-divider></v-divider>
          <div
            v-if="
              this.$route.name == 'lead-details' &&
              this.dialog_show.form_status != 'view'
            "
          >
            <!-- <div class="d-flex mt-8" v-if="this.dialog_show.form_status != 'view'"> -->
            <div class="d-flex mt-8">
              <v-spacer></v-spacer>
              <v-btn
                rounded
                color="success"
                class="white--text"
                @click="sendForm()"
                v-if="this.dialog_show.form_status == 'approve'"
              >
                <div>Approve</div>
              </v-btn>
              <v-btn
                rounded
                color="primary"
                class="white--text"
                @click="sendForm()"
                v-else-if="this.dialog_show.form_status == 'fill'"
              >
                <div>Send for Approval</div>
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ApprovalDialog",
  props: ["dialog_show"],
  data() {
    return {
      is_form_valid: true,
      dialog: this.dialog_show,
      headers: [
        {
          text: "SNo.",
          align: "start",
          filterable: false,
          value: "sn_o",
          sortable: false,
          class: "table_head",
        },
        {
          text: "Bank Name",
          value: "bank_name",
          sortable: false,
          class: "table_head",
        },

        {
          text: "Loan Amount",
          value: "loan_amount",
          sortable: false,
          class: "table_head",
        },
        {
          text: "EMI Amount",
          value: "emi_amount",
          sortable: false,
          align: "start",
          class: "table_head",
        },
        {
          text: "No. of bounce",
          value: "number_of_bounce",
          sortable: false,
          class: "table_head",
        },
        {
          text: "Currenty Balance",
          value: "current_balance",
          sortable: false,
          class: "table_head",
        },
        {
          text: "Overdue",
          value: "overdue",
          sortable: false,
          align: "left",
          class: "table_head",
        },
        {
          text: "Loan Status",
          value: "loan_status",
          sortable: false,
          align: "left",
          class: "table_head",
        },
        {
          value: "close",
          class: "table_head",
          align: "right",
          sortable: false,
        },
      ],

      approval_form: {},
    };
  },
  watch: {
    "dialog_show.flag": function (value) {
      // console.log("form_status",this.dialog_show.form_status);
      if (value) {
        if (this.dialog_show.form_status == "fill") {
          this.approval_form = {
            address_proof_verfied: false,
            analysed_by_executive: {
              id: sessionStorage.getItem("user_id"),
              full_name: sessionStorage.getItem("user_name"),
            },
            analysed_date: null,
            applied_amount: null,
            approved_by_executive: { full_name: "" },
            approved_executive_entered_emi_amount: null,
            approved_executive_entered_loan_amount: null,
            balance_on_next_day: null,
            bank_detailed_matched: false,
            bank_info_by_cibil: [
              {
                bank_name: "",
                loan_amount: "",
                emi_amount: "",
                number_of_bounce: "",
                current_balance: "",
                overdue: "",
              },
            ],
            number_of_bounce: null,
            overdue: null,
            cibil_overdue: null,
            executive_entered_emi_amount: null,
            executive_entered_loan_amount: null,
            extra_info: "",
            in_bank_statement: null,
            kyc_matched: false,
            obligation_as_per_cibil: null,
            obligation_as_per_statement: null,
            salary_amount: null,
            salary_in_application: null,
            tenure: "",
          };
        } else if (this.dialog_show.form_status == "approve") {
          this.approval_form = {
            address_proof_verfied:
              this.dialog_show.form_data.address_proof_verfied,
            analysed_by_executive: {
              id: this.dialog_show.form_data.analysed_by_executive.id,
              full_name:
                this.dialog_show.form_data.analysed_by_executive.full_name,
            },
            analysed_date: this.dialog_show.form_data.analysed_date,
            applied_amount: this.dialog_show.form_data.applied_amount,
            approved_by_executive: {
              id: sessionStorage.getItem("user_id"),
              full_name: sessionStorage.getItem("user_name"),
            },
            approved_executive_entered_emi_amount:
              this.dialog_show.form_dataapproved_executive_entered_emi_amount,
            approved_executive_entered_loan_amount:
              this.dialog_show.form_data.approved_executive_entered_loan_amount,
            balance_on_next_day: this.dialog_show.form_data.balance_on_next_day,
            bank_detailed_matched:
              this.dialog_show.form_data.bank_detailed_matched,
            bank_info_by_cibil: this.dialog_show.form_data.bank_info_by_cibil,
            number_of_bounce: this.dialog_show.form_data.number_of_bounce,
            overdue: this.dialog_show.form_data.overdue,
            cibil_overdue: this.dialog_show.form_data.cibil_overdue,
            executive_entered_emi_amount:
              this.dialog_show.form_data.executive_entered_emi_amount,
            executive_entered_loan_amount:
              this.dialog_show.form_data.executive_entered_loan_amount,
            extra_info: this.dialog_show.form_data.extra_info,
            in_bank_statement: this.dialog_show.form_data.in_bank_statement,
            kyc_matched: this.dialog_show.form_data.kyc_matched,
            cibil_current_balance:
              this.dialog_show.form_data.cibil_current_balance,
            obligation_as_per_cibil:
              this.dialog_show.form_data.obligation_as_per_cibil,
            obligation_as_per_statement:
              this.dialog_show.form_data.obligation_as_per_statement,
            salary_amount: this.dialog_show.form_data.salary_amount,
            salary_in_application:
              this.dialog_show.form_data.salary_in_application,
            tenure: this.dialog_show.form_data.tenure,
          };
        } else {
          this.approval_form = this.dialog_show.form_data;
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      losDetails: "losDetails/getCurrentStepData",
    }),
  },
  mounted() {
    // this.dialog_data.flag;
    // this.getApprovalFormDetails();

    // this.checkIsApprover();
    // this.getTeamDetails();
  },
  methods: {
    addMore() {
      this.approval_form.bank_info_by_cibil.push({
        bank_name: "",
        loan_amount: "",
        emi_amount: "",
        number_of_bounce: "",
        current_balance: "",
        loan_status: "",
        overdue: "",
      });
      // this.items[this.items.length - 1].sn_o = this.items.length - 1;
      // console.log("serial no", this.items[this.items.length - 1]);
    },
    removeField(index) {
      // console.log("index", index);
      // console.log("list", this.bank_info_by_cibil);
      this.approval_form.bank_info_by_cibil.splice(index, 1);
      // console.log("after splice list", this.bank_info_by_cibil);
    },

    // checkIsApprover() {},

    // getTeamDetails() {
    //   // let look_up_key = this.$route.params.id;

    //   const successHandler = (res) => {
    //     // console.log("team details",res);
    //     sessionStorage.setItem("user_id", res.data.result.id);
    //     sessionStorage.setItem("user_name", res.data.result.full_name);
    //   };
    //   const failureHandler = () => {};

    //   return this.$Axios("get", this.$apiUrl.GET_LOGGED_USER_INFO, {
    //     // lookUpKey: look_up_key,
    //     onSuccess: successHandler,
    //     onFailure: failureHandler,
    //     isTokenRequired: true,
    //   });
    // },

    sendForm() {
      if (this.$refs.approval_form.validate()) {
        if (this.dialog_show.form_status == "approve") {
          if (
            this.approval_form.approved_executive_entered_loan_amount ||
            this.approval_form.approved_executive_entered_emi_amount
          ) {
            let arr = [];
            let approved_by_executive_id = sessionStorage.getItem("user_id");

            arr.push({
              address_proof_verfied: this.approval_form.address_proof_verfied,
              analysed_by_executive:
                this.approval_form.analysed_by_executive.id,
              approved_by_executive: approved_by_executive_id,
              analysed_date: this.approval_form.analysed_date,
              applied_amount: this.approval_form.applied_amount,
              // approved_by_executive: { full_name: this.approval_form.approved_by_executive.full_name },
              approved_executive_entered_emi_amount:
                this.approval_form.approved_executive_entered_emi_amount,
              approved_executive_entered_loan_amount:
                this.approval_form.approved_executive_entered_loan_amount,
              balance_on_next_day: this.approval_form.balance_on_next_day,
              bank_detailed_matched: this.approval_form.bank_detailed_matched,
              cibil_current_balance: this.approval_form.cibil_current_balance,
              cibil_overdue: this.approval_form.cibil_overdue,
              executive_entered_emi_amount:
                this.approval_form.executive_entered_emi_amount,
              executive_entered_loan_amount:
                this.approval_form.executive_entered_loan_amount,
              extra_info: this.approval_form.extra_info,
              in_bank_statement: this.approval_form.in_bank_statement,
              kyc_matched: this.approval_form.kyc_matched,
              obligation_as_per_cibil:
                this.approval_form.obligation_as_per_cibil,
              obligation_as_per_statement:
                this.approval_form.obligation_as_per_statement,
              salary_amount: this.approval_form.salary_amount,
              salary_in_application: this.approval_form.salary_in_application,
              tenure: this.approval_form.tenure,
              bank_info_by_cibil: this.approval_form.bank_info_by_cibil,
            });

            let look_up_key = this.$route.params.id;

            const successHandler = () => {
              this.updateLosStep("Loan Approval Approved")
              this.dialog.flag = false;
              this.$emit("onSuccess");
            };
            const failureHandler = () => {};

            return this.$Axios(
              "post",
              this.$apiUrl.POST_APPROVAL_FORM_DETAILS,
              {
                data: arr[0],
                lookUpKey: look_up_key,
                onSuccess: successHandler,
                onFailure: failureHandler,
                isTokenRequired: true,
              }
            );
          } else {
            alert("Fill altest Loan Amount or EMI by Approver");
          }
        } else if (this.dialog_show.form_status == "fill") {
          if (
            this.approval_form.executive_entered_loan_amount ||
            this.approval_form.executive_entered_emi_amount
          ) {
            let arr = [];
            let analysed_by_executive_id = sessionStorage.getItem("user_id");

            arr.push({
              address_proof_verfied: this.approval_form.address_proof_verfied,
              analysed_by_executive: analysed_by_executive_id,
              // approved_by_executive: approved_by_executive_id,
              analysed_date: this.approval_form.analysed_date,
              applied_amount: this.approval_form.applied_amount,
              // approved_by_executive: { full_name: this.approval_form.approved_by_executive.full_name },
              approved_executive_entered_emi_amount:
                this.approval_form.approved_executive_entered_emi_amount,
              approved_executive_entered_loan_amount:
                this.approval_form.approved_executive_entered_loan_amount,
              balance_on_next_day: this.approval_form.balance_on_next_day,
              bank_detailed_matched: this.approval_form.bank_detailed_matched,
              cibil_current_balance: this.approval_form.cibil_current_balance,
              cibil_overdue: this.approval_form.cibil_overdue,
              executive_entered_emi_amount:
                this.approval_form.executive_entered_emi_amount,
              executive_entered_loan_amount:
                this.approval_form.executive_entered_loan_amount,
              extra_info: this.approval_form.extra_info,
              in_bank_statement: this.approval_form.in_bank_statement,
              kyc_matched: this.approval_form.kyc_matched,
              obligation_as_per_cibil:
                this.approval_form.obligation_as_per_cibil,
              obligation_as_per_statement:
                this.approval_form.obligation_as_per_statement,
              salary_amount: this.approval_form.salary_amount,
              salary_in_application: this.approval_form.salary_in_application,
              tenure: this.approval_form.tenure,
              bank_info_by_cibil: this.approval_form.bank_info_by_cibil,
            });

            let look_up_key = this.$route.params.id;

            const successHandler = () => {
              this.updateLosStep(this.losDetails[0].key)
              this.dialog.flag = false;
              this.$emit("onSuccess");
            };
            const failureHandler = () => {};

            return this.$Axios(
              "post",
              this.$apiUrl.POST_APPROVAL_FORM_DETAILS,
              {
                data: arr[0],
                lookUpKey: look_up_key,
                onSuccess: successHandler,
                onFailure: failureHandler,
                isTokenRequired: true,
              }
            );
          } else {
            alert("Fill altest Loan Amount or EMI by Executive");
          }
        }
      } else {
        alert("Fill All the Fields");
      }
    },
  },
};
</script>
<style scoped>
.not-number {
  height: 18px;
}
.field-name {
  font-size: 13px;
}
.close_icon {
  position: absolute;
  right: 0px;
  bottom: 132px;
}
</style>

<style>
.table_head {
  background-color: #dedede;
}
.analysed-by {
  color: #989393;
  font-weight: 500;
  font-size: 14px;
}
</style>

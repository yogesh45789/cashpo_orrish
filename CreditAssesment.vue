<template>
  <div>
    <div class="d-flex justify-space-between mb-4">
      <slot name="buttons">
        <h2 class="font-weight-medium mt-3 ml-3">Credit Assessment Memo</h2>
        <div>
          <v-btn
            @click="comment_dialog.flag = true"
            rounded
            color="#2F80ED"
            elevation="0"
            class="mt-3 mx-3"
            outlined
          >
            <v-icon class="mr-1">mdi-message-reply-text</v-icon> Comment</v-btn
          >
          <template v-if="losDetails[0]">
            <template v-if="losDetails[0].value == 'Credit Assestment Memo'">
              <v-btn
                @click="
                  openLoanStatusConfirmationDialog(
                    losDetails[0].value,
                    losDetails[0].rejected
                  )
                "
                rounded
                elevation="0"
                class="white--text mt-3 mx-3"
                color="#D7443E"
              >
                Reject</v-btn
              >
              <v-btn
                @click="
                  openLoanStatusConfirmationDialog(
                    losDetails[0].value,
                    losDetails[0].key
                  )
                "
                rounded
                elevation="0"
                class="white--text mt-3 mx-3"
                color="#27AE60"
              >
                Approve</v-btn
              >
            </template>
          </template>
        </div>
      </slot>
    </div>
    <v-form ref="cam_form" v-model="valid">
      <v-row>
        <!-- cam fields -->
        <v-col cols="4">
          <v-col cols="12" class="py-0">
            <v-row class="field_txt">
              <v-col cols="5" class="py-0">Scheme</v-col>
              <v-col cols="7" class="py-0">
                <v-select
                  :items="loan_scheme_list"
                  item-text="scheme_name"
                  item-value="id"
                  placeholder="Scheme Name"
                  background-color="#fff"
                  dense
                  outlined
                  v-model="scheme"
                  @change="assignInterestRate()"
                  :rules="[$rules.required]"
                >
                </v-select
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row class="field_txt">
              <v-col cols="5" class="py-0">Monthly Income</v-col>
              <v-col cols="7" class="py-0">
                <v-text-field
                  placeholder="Monthly Income"
                  background-color="#eee"
                  dense
                  readonly
                  outlined
                  type="number"
                  v-model="monthly_income"
                  :rules="[$rules.required]"
                  prepend-inner-icon="mdi-currency-rupee"
                >
                </v-text-field
              ></v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="py-0">
            <v-row class="field_txt">
              <v-col cols="5" class="py-0">50% Deduction</v-col>
              <v-col cols="7" class="py-0">
                <v-text-field
                  placeholder="50% Deduction"
                  background-color="#eee"
                  dense
                  outlined
                  type="number"
                  readonly
                  v-model="half_deduction"
                  :rules="[$rules.required]"
                  prepend-inner-icon="mdi-currency-rupee"
                >
                </v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row class="field_txt">
              <v-col cols="5" class="py-0">Monthly Obligations</v-col>
              <v-col cols="7" class="py-0">
                <v-text-field
                  placeholder="Monthly Obligations"
                  background-color="#fff"
                  dense
                  outlined
                  type="number"
                  v-model="monthly_obligation"
                  :rules="[$rules.required]"
                  prepend-inner-icon="mdi-currency-rupee"
                >
                </v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row class="field_txt">
              <v-col cols="5" class="py-0">Eligible to Pay EMI</v-col>
              <v-col cols="7" class="py-0">
                <v-text-field
                  placeholder="Eligible to Pay EMI"
                  background-color="#eee"
                  dense
                  outlined
                  readonly
                  type="number"
                  prepend-inner-icon="mdi-currency-rupee"
                  v-model="eligible_to_pay_emi"
                  :rules="[$rules.AMOUNT]"
                >
                </v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row class="field_txt">
              <v-col cols="5" class="py-0">Loan Amount</v-col>
              <v-col cols="7" class="py-0">
                <v-text-field
                  placeholder="Loan Amount"
                  background-color="#fff"
                  dense
                  outlined
                  type="number"
                  v-model="loan_amount"
                  :rules="[$rules.required]"
                  prepend-inner-icon="mdi-currency-rupee"
                >
                </v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row class="field_txt">
              <v-col cols="5" class="py-0">Interest Rate</v-col>
              <v-col cols="7" class="py-0">
                <v-text-field
                  placeholder="Interest Rate"
                  background-color="#fff"
                  dense
                  outlined
                  type="number"
                  v-model="interest_rate"
                  :rules="[$rules.required]"
                  append-icon="mdi-percent"
                >
                </v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row class="field_txt">
              <v-col cols="5" class="py-0">EMI Start Date</v-col>
              <v-col cols="7" class="py-0">
                <v-menu
                  ref="menu1"
                  v-model="date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="emi_start_date"
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
                  <v-date-picker v-model="emi_start_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="date_menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="date_menu = false">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu></v-col
              >
            </v-row>
          </v-col>
          <v-col cols="12">
            <slot name="generate-btn">
              <v-btn
                rounded
                class="generate_offer"
                outlined
                :loading="generate_btn_loader"
                :disabled="generate_btn_loader"
                color="#2F80ED"
                @click="generateOffers()"
              >
                Generate Offer
              </v-btn>
            </slot>
          </v-col>
        </v-col>
        <!-- <v-row wrap no-gutters>
          <v-col class="text-left">
            <v-divider vertical />
          </v-col>
        </v-row> -->

        <!-- offer list -->
        <v-divider vertical></v-divider>
        <v-col cols="4" class="px-9">
          <template v-if="offer_list[0]">
            <v-row class="mb-4">
              <v-col cols="12" class="pt-1 pb-0 text-h6">
                Generated Offers:
              </v-col>
              <v-col cols="12" class="pb-2 pt-0 text-caption error--text">
                **Click on offer to select
              </v-col>
              <v-col cols="12">
                <v-row
                  class="make_emi mb-4"
                  v-for="offer in offer_list"
                  :key="offer.id"
                  @click="openSelectOfferDialog(offer)"
                >
                  <v-col cols="4">
                    <div>Loan Amount</div>
                    <div class="font-weight-bold">₹{{ offer.loan_amount }}</div>
                  </v-col>
                  <v-col cols="4">
                    <div>Tenure</div>
                    <div class="font-weight-bold">
                      {{ offer.tenure }}
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div>Monthly EMI</div>
                    <div class="font-weight-bold">₹{{ offer.emi }}</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <slot name="send-offers">
                <v-btn
                  @click="sendOffer()"
                  rounded
                  class="generate_offer"
                  outlined
                  color="#2F80ED"
                  :disabled="is_offer_selected || send_btn_loader"
                  :loading="send_btn_loader"
                >
                  Send Offers to Customer
                </v-btn>
              </slot>
            </v-row>
          </template>
          <template v-else>
            <v-row>
              <v-col cols="12">
                <div class="text-center font-weight-medium text-h6">
                  No offers available
                </div>
              </v-col>
            </v-row>
          </template>
        </v-col>
        <v-divider vertical></v-divider>

        <!-- selected offer -->
        <v-col cols="4">
          <v-col cols="12" class="pb-2 pt-0 text-h6"> Selected Offer: </v-col>
          <v-col cols="12">
            <div v-if="is_offer_selected">
              <div v-for="offer in offer_list" :key="offer.id">
                <v-row
                  class="made_emi mb-2 mr-1"
                  v-if="offer.selected_by_borrower"
                >
                  <template>
                    <v-col cols="4">
                      <div>Loan Amount</div>
                      <div class="font-weight-bold">
                        {{ offer.loan_amount }}
                      </div>
                    </v-col>
                    <v-col cols="4">
                      <div>Tenure</div>
                      <div class="font-weight-bold">{{ offer.tenure }}</div>
                    </v-col>
                    <v-col cols="4">
                      <div>Monthly EMI</div>
                      <div class="font-weight-bold">{{ offer.emi }}</div>
                    </v-col>
                  </template>
                </v-row>
              </div>
            </div>
            <div v-else class="text-center">
              <img
                width="350px"
                src="../../../../assets/images/no_offer_selected.svg"
              />
            </div>
          </v-col>
        </v-col>
      </v-row>
    </v-form>
    <Comment :comment_data="comment_dialog" />
    <SelectOffer
      :dialog_data="select_offer_dialog"
      @onSuccess="getOfferList()"
    />
    <LoanStatusConfirmationDialog
      :dialog="loan_status_confirmation_dialog_data"
    />
  </div>
</template>
<script>
import dayjs from "dayjs";
import Comment from "@/components/los/LoanDetails/LoanSteps/Dialog/Comment.vue";
import SelectOffer from "@/components/los/LoanDetails/LoanSteps/Dialog/SelectOffer.vue";
import LoanStatusConfirmationDialog from "@/components/los/LoanDetails/LoanStatusConfirmationDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "CreditAssesment",
  components: { Comment, SelectOffer, LoanStatusConfirmationDialog },
  data() {
    return {
      valid: true,
      comment_dialog: {
        flag: false,
      },
      // myImage: require("@/assets/images/no_offer_selected.png"),
      date_menu: false,
      loan_scheme_list: [],
      tenure_list: [],

      scheme: null,
      monthly_income: null,
      monthly_obligation: null,
      eligible_to_pay_emi: null,
      // temp_emi: null,
      // temp_tenure: null,
      loan_amount: null,
      interest_rate: null,
      emi_start_date: "",

      half_deduction: null,

      offer_list: [],
      is_offer_selected: false,

      select_offer_dialog: {
        flag: false,
        data: [],
      },
      loan_status_confirmation_dialog_data: {
        flag: false,
        current_step: "",
        loan_status: "",
      },
      generate_btn_loader: false,
      send_btn_loader: false,
    };
  },
  mounted() {
    this.getLoanSchemeList();
    this.getOfferList();
    this.getTenureList();
    this.getCamDetails();
  },
  computed: {
    ...mapGetters({
      losDetails: "losDetails/getCurrentStepData",
    }),
    // half_deduction() {
    //   return this.monthly_income / 2;
    // },

    // eligible_to_pay_emi() {
    //   return this.half_deduction - this.monthly_obligation;
    // },
  },
  watch: {
    //   monthly_income(newValue){
    //     this.half_deduction = newValue /2;
    //   }

    monthly_income(newValue) {
      this.half_deduction = newValue / 2;
    },
    half_deduction(newValue) {
      this.eligible_to_pay_emi = newValue - this.monthly_obligation;
    },
    monthly_obligation(newValue) {
      this.eligible_to_pay_emi = this.half_deduction - newValue;
    },
  },
  methods: {
    openLoanStatusConfirmationDialog(current_step, loan_status) {
      if (loan_status == "Rejected") {
        this.loan_status_confirmation_dialog_data.flag = true;
        this.loan_status_confirmation_dialog_data.current_step = current_step;
        this.loan_status_confirmation_dialog_data.loan_status = loan_status;
      } else {
        if (this.is_offer_selected) {
          this.loan_status_confirmation_dialog_data.flag = true;
          this.loan_status_confirmation_dialog_data.current_step = current_step;
          this.loan_status_confirmation_dialog_data.loan_status = loan_status;
        } else {
          alert("Please select offer before approving");
        }
      }
    },
    assignInterestRate() {
      // this.loan_scheme_list.filter((item)=>{
      //   let new_array = this.scheme = item.id
      //   return new_array.
      // })
      // console.log(this.scheme);
    },
    isOfferSelected() {
      let new_list = this.offer_list.filter((item) => {
        return item.selected_by_borrower == true;
      });
      if (new_list[0]) {
        // return true;
        this.is_offer_selected = true;
      } else {
        // return false;
        this.is_offer_selected = false;
      }
    },
    openSelectOfferDialog(value) {
      if (!this.is_offer_selected) {
        this.select_offer_dialog.flag = true;
        this.select_offer_dialog.data = value;
      } else {
        alert("Offer has been selected");
      }
    },
    getCamDetails() {
      // let formdata = {};
      // formdata["lead_creation"] = this.$route.params.id;
      let look_up_key = this.$route.params.id;

      const successHandler = (res) => {
        // console.log("CAM details", res.data);
        this.monthly_income = res.data.result.monthly_income;
        this.eligible_to_pay_emi = res.data.result.eligible_to_pay_emi;
        this.monthly_obligation = res.data.result.monthly_obligation;
        this.half_deduction = res.data.result.half_deduction;
        this.interest_rate = res.data.result.interest_rate;
        this.scheme = res.data.result.scheme.id;
        this.loan_amount = res.data.result.loan_amount;
        this.emi_start_date = dayjs(res.data.result.emi_start_date).format(
          "YYYY-MM-DD"
        );
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_CAM_DETAILS + look_up_key, {
        // params: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
    getLoanSchemeList() {
      // let formdata = {};
      // formdata["lead_creation"] = this.$route.params.id;
      // let look_up_key = "";

      const successHandler = (res) => {
        // console.log("loan scheme", res.data.result.data);
        this.loan_scheme_list = res.data.result.data;
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_LOAN_SCHEME, {
        // params: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
    getTenureList() {
      // let formdata = {};
      // formdata["lead_creation"] = this.$route.params.id;
      // let look_up_key = "";

      const successHandler = (res) => {
        // console.log("loan scheme", res.data.result.data);
        this.tenure_list = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_TENURE_LIST, {
        // params: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
    getOfferList() {
      let formdata = {};
      formdata["lead_creation"] = this.$route.params.id;
      // let look_up_key = "";

      const successHandler = (res) => {
        // console.log("offer list", res.data.result);
        this.offer_list = res.data.result;
        this.isOfferSelected();
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_CAM_OFFER_LIST, {
        params: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
    generateOffers() {
      if (this.$refs.cam_form.validate()) {
        // console.log("scheme", this.scheme);
        // console.log("monthly_income", this.monthly_income);
        // console.log("half_deduction", this.half_deduction);
        // console.log("monthly_obligation", this.monthly_obligation);
        // console.log("eligible_to_pay_emi", this.eligible_to_pay_emi);
        // console.log("loan_amount", this.loan_amount);
        // console.log("interest_rate", this.interest_rate);
        // console.log("emi_start_date", this.emi_start_date);

        this.generate_btn_loader = true;
        let look_up_key = this.$route.params.id;

        let formdata = {
          scheme: this.scheme,
          monthly_income: this.monthly_income,
          half_deduction: this.half_deduction,
          monthly_obligation: this.monthly_obligation,
          eligible_to_pay_emi: this.eligible_to_pay_emi,
          loan_amount: this.loan_amount,
          interest_rate: this.interest_rate,
          emi_start_date: dayjs(this.emi_start_date).format("DD-MM-YYYY"),
        };

        const successHandler = (res) => {
          // this.getOfferList();
          this.offer_list = res.data.result;
          this.isOfferSelected();
          this.generate_btn_loader = false;
        };
        const failureHandler = () => {
          this.generate_btn_loader = false;
        };

        return this.$Axios(
          "put",
          this.$apiUrl.GENERATE_CAM_OFFER_LIST + `${look_up_key}/`,
          {
            data: formdata,
            onSuccess: successHandler,
            onFailure: failureHandler,
            isTokenRequired: true,
          }
        );
      } else {
        alert("Fill all CAM fields");
      }
    },
    sendOffer() {
      this.send_btn_loader = true;
      let formdata = {};
      formdata["lead_creation"] = this.$route.params.id;

      const successHandler = () => {
        this.getOfferList();
        this.send_btn_loader = false;
      };
      const failureHandler = () => {
        this.send_btn_loader = false;
      };

      return this.$Axios("get", this.$apiUrl.SEND_OFFERS_TO_CUSTOMER, {
        params: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
  },
};
</script>
<style scoped>
div.field_txt > div:first-child {
  color: #989393;
  font-size: 14px;
}
.generate_offer {
  width: 100%;
}
div.make_emi > div > div:first-child {
  color: #989393;
  font-size: 13px;
}
.make_emi {
  border: 2px solid #d3d3d3;
  border-radius: 8px;
  cursor: pointer;
}
div.made_emi > div > div:first-child {
  color: #989393;
  font-size: 13px;
}
.made_emi {
  border: 2px solid #2f80ed;
  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */
  border-radius: 8px;
  box-shadow: 0 5px 10px 0px #515151a5;
}

/* div.make_emi > div > div:nth-last-child(2) {

} */
</style>

<template>
  <div>
    <div class="d-flex justify-space-between">
      <h2 class="font-weight-medium mt-3 ml-3">Payment Task</h2>
      <slot name="buttons">
        <div>
          <v-btn
            @click="comment_dialog.flag = true"
            rounded
            color="#2F80ED"
            class="mt-3 mx-3"
            outlined
          >
            <v-icon class="mr-1">mdi-message-reply-text</v-icon> Comment</v-btn
          >
          <template v-if="losDetails[0]">
            <template v-if="losDetails[0].value != 'Payment Task'">
              <v-btn
                rounded
                elevation="0"
                class="white--text mt-3 mx-3"
                color="#27AE60"
                @click="
                  openLoanStatusConfirmationDialog(
                    losDetails[0].value,
                    losDetails[0].key
                  )
                "
              >
                Proceed for Approval</v-btn
              >
            </template>
          </template>
        </div>
      </slot>
    </div>

    <v-row class="">
      <v-col cols="6">
        <table class="payment-table mt-4">
          <tr>
            <td>Total Loan Amount</td>
            <td>₹{{payment_breakdown.total_loan_amount}}</td>
          </tr>
          <tr>
            <td>Deduction</td>
            <td v-if="payment_breakdown.total_deduction">- ₹{{payment_breakdown.total_deduction.deduction}}</td>
          </tr>
          <tr
            v-for="(deduction, index) in deduction_breakdown"
            :key="index"
            class="bg-color"
          >
            <td class="pl-10">{{ deduction.vas_type }}</td>
            <td>- ₹{{ deduction.total }}</td>
          </tr>
          <tr>
            <td>Amount to be Paid</td>
            <td>₹{{payment_breakdown.amount_to_be_paid}}</td>
          </tr>
        </table>
        <slot name="payment_mode">
          <div></div>
        </slot>
      </v-col>
      <v-col cols="6" class="pr-10">
        <div class="my-3">
          <h3 class="font-weight-medium e-nach-field">Payment Details</h3>
        </div>
        <table class="razorpay-details-table">
          <!-- <tr
            class="payment_details ml-5"
            v-for="item in payment_data.payment"
            :key="item.name"
          >
            <td>
              <div>{{ item.data }}</div>
            </td>
            <td>
              <div>{{ item.name }}</div>
            </td>
          </tr> -->
          <tr class="payment_details ml-5">
            <td>
              <div>Total Payable Amount</div>
            </td>
            <td>
              <div>₹{{ payment_details.total_payable_amount }}</div>
            </td>
          </tr>
          <tr class="payment_details ml-5">
            <td>
              <div>Payment to</div>
            </td>
            <td>
              <div>{{ payment_details.payment_to }}</div>
            </td>
          </tr>
          <tr class="payment_details ml-5">
            <td>
              <div>Bank Name</div>
            </td>
            <td>
              <div>{{ payment_details.bank_name }}</div>
            </td>
          </tr>
          <tr class="payment_details ml-5">
            <td>
              <div>IFSC Code</div>
            </td>
            <td>
              <div>{{ payment_details.ifsc_code }}</div>
            </td>
          </tr>
          <tr class="payment_details ml-5">
            <td>
              <div>Account Number</div>
            </td>
            <td>
              <div>{{ payment_details.account_number }}</div>
            </td>
          </tr>
        </table>
        <div>
          <v-btn rounded color="#2F80ED" class="mt-3 ml-8" outlined>
            Update Bank Details</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <Comment :comment_data="comment_dialog" />
    <LoanStatusConfirmationDialog
      :dialog="loan_status_confirmation_dialog_data"
    />
    <!-- <slot name="disbursement">
      <div></div>
    </slot> -->
  </div>
</template>
<script>
import Comment from "@/components/los/LoanDetails/LoanSteps/Dialog/Comment.vue";
import LoanStatusConfirmationDialog from "@/components/los/LoanDetails/LoanStatusConfirmationDialog.vue";
import { mapGetters } from "vuex";

export default {
  components: { Comment, LoanStatusConfirmationDialog },
  name: "PaymentTask",

  data() {
    return {
      comment_dialog: {
        flag: false,
      },

      deduction_breakdown: [],
      payment_breakdown: [],

      // payment_data: {
      // payment: [
      //   { data: "Total Payable Amount", name: "₹ 5,4,000.00" },
      //   { data: "Payment to", name: "Sagar Patel" },
      //   {
      //     data: "Bank Name",
      //     name: "HDFC",
      //   },
      //   {
      //     data: "IFSC Code",
      //     name: "HDFC0000234",
      //   },
      //   {
      //     data: "Account Number",
      //     name: "9876543456732",
      //     bg: true,
      //   },
      // ],
      // },

      payment_details: {},

      loan_status_confirmation_dialog_data: {
        flag: false,
        current_step: "",
        loan_status: "",
      },
    };
  },
  mounted() {
    this.getPaymentDetails();
    this.getPaymentBreakdown();
  },
  computed: {
    ...mapGetters({
      losDetails: "losDetails/getCurrentStepData",
    }),
  },
  methods: {
    openLoanStatusConfirmationDialog(current_step, loan_status) {
      this.loan_status_confirmation_dialog_data.flag = true;
      this.loan_status_confirmation_dialog_data.current_step = current_step;
      this.loan_status_confirmation_dialog_data.loan_status = loan_status;
    },
    getPaymentDetails() {
      let look_up_key = this.$route.params.id;

      const successHandler = (res) => {
        // console.log("getpayment ", res);
        this.payment_details = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios(
        "get",
        this.$apiUrl.GET_PAYMENT_DETAILS + `${look_up_key}/`,
        {
          // params: formdata,
          onSuccess: successHandler,
          onFailure: failureHandler,
          isTokenRequired: true,
        }
      );
    },
    getPaymentBreakdown() {
      let look_up_key = this.$route.params.id;

      const successHandler = (res) => {
        // console.log("getpayment ", res);
        this.payment_breakdown = res.data.result;
        this.deduction_breakdown = res.data.result.total_deduction.items;
      };
      const failureHandler = () => {};

      return this.$Axios(
        "get",
        this.$apiUrl.GET_PAYMENT_BREAKDOWN + `${look_up_key}/`,
        {
          // params: formdata,
          onSuccess: successHandler,
          onFailure: failureHandler,
          isTokenRequired: true,
        }
      );
    },
  },
};
</script>
<style scoped>
.bg-color {
  background: rgba(243, 172, 111, 0.2);
}
.e-nach-field {
  color: #196197;
}
.payment_details {
  background: rgba(222, 222, 222, 0.375);
  border-radius: 40px;
}
.payment_details > div:first-child {
  font-weight: 400;
  font-size: 14px;
  color: #121212;
}
.payment-table,
.razorpay-details-table {
  width: 100%;
}
.razorpay-details-table {
  width: 100%;
}
.payment-table,
.payment-table td,
.payment-table th {
  padding: 8px 15px;
  border-collapse: collapse;
  border-bottom: 1px solid #8e8e8e5b;
}
.razorpay-details-table,
.razorpay-details-table td,
.razorpay-details-table th {
  padding: 10px 25px;
  border-collapse: collapse;
}
table tr:first-child td:first-child {
  border-radius: 10px 0 0 0;
}
table tr:first-child td:last-child {
  border-radius: 0 10px 0 0;
}
table tr:last-child td:first-child {
  border-radius: 0 0 0 10px;
}
table tr:last-child td:last-child {
  border-radius: 0 0 10px 0;
}
</style>

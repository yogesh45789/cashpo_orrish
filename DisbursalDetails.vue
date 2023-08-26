<template>
  <div class="px-6">
    <div class="d-flex justify-space-between align-center mt-6 mb-2">
      <h4 class="font-weight-medium">Disbursal Details</h4>
      <div>
        <slot name="comment">
          <v-btn
            @click="comment_dialog.flag = true"
            rounded
            color="#2F80ED"
            class=""
            outlined
          >
            <v-icon class="mr-1">mdi-message-reply-text</v-icon> Comment</v-btn
          >
        </slot>

        <template v-if="losDetails[0]">
          <template v-if="losDetails[0].value == 'Disbursal Details'">
            <v-btn
              @click="
                openLoanStatusConfirmationDialog(
                  losDetails[0].value,
                  losDetails[0].key
                )
              "
              rounded
              elevation="0"
              class="white--text mx-3"
              color="#27AE60"
            >
              Next
            </v-btn>
          </template>
        </template>
      </div>
    </div>
    <div class="container">
      <div class="box-field">
        <div>Agreement Date</div>
        <div>{{ disbursal_details.agreement_date }}</div>
      </div>
      <div class="box-field">
        <div>Applied Amount</div>
        <div>₹{{ disbursal_details.applied_amount }}</div>
      </div>
      <div class="box-field">
        <div>Sanctioned Amount</div>
        <div>₹{{ disbursal_details.sanctioned_amount }}</div>
      </div>
      <div class="box-field">
        <div>IRR (%)</div>
        <div>{{ disbursal_details.irr }}</div>
      </div>
      <div class="box-field">
        <div>EMI Start Date</div>
        <div>{{ disbursal_details.emi_start_date }}</div>
      </div>
      <div class="box-field">
        <div>EMI Tenure</div>
        <div>{{ disbursal_details.emi_tenure }}</div>
      </div>

      <div class="box-field">
        <div>EMI</div>
        <div>₹{{ disbursal_details.emi }}</div>
      </div>
    </div>
    <div class="d-flex justify-space-between align-center mt-6 mb-2">
      <h4 class="font-weight-medium">VAS Charges</h4>
      <div>
        <slot name="add-charges">
          <v-btn
            @click="dialog.flag = true"
            rounded
            color="#2F80ED"
            class=""
            outlined
          >
            <v-icon class="mr-1">mdi-plus</v-icon> Add Charges</v-btn
          >
        </slot>
      </div>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <td v-for="head in vas_charges_headers" :key="head.id">
              {{ head.text }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in vas_charges" :key="item.id">
            <td>{{ item.vas_type }}</td>
            <td>{{ item.ledger }}</td>
            <td>{{ item.taxable_amount }}</td>
            <td>{{ item.gst }}</td>
            <td>{{ item.discount }}</td>
            <td>{{ item.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 class="font-weight-medium mt-6 mb-3">EMI Breakdown</h4>
    <div>
      <table>
        <thead>
          <tr>
            <td v-for="head in emi_breakdown_headers" :key="head.id">
              {{ head.text }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in emi_breakdown" :key="item.due_date">
            <td>{{ item.due_date }}</td>
            <td>{{ item.interest.toLocaleString("en-IN") }}</td>
            <td>{{ item.principal.toLocaleString("en-IN") }}</td>
            <td class="emi-column">{{ item.emi.toLocaleString("en-IN") }}</td>
            <td>{{ item.principal_outstanding.toLocaleString("en-IN") }}</td>
          </tr>
          <tr class="font-weight-bold" v-if="emi_breakdown[0]">
            <td>Total</td>
            <td>{{ emi_breakdown[0].grand_total.interest }}</td>
            <td>{{ emi_breakdown[0].grand_total.principal }}</td>
            <td>{{ emi_breakdown[0].grand_total.emi }}</td>
            <td>{{ emi_breakdown[0].grand_total.principal_outstanding }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddCharges :dialog_data="dialog" />
    <Comment :comment_data="comment_dialog" />
    <LoanStatusConfirmationDialog
      :dialog="loan_status_confirmation_dialog_data"
    />
  </div>
</template>
<script>
import AddCharges from "@/components/los/LoanDetails/LoanSteps/Dialog/AddCharges.vue";
import Comment from "@/components/los/LoanDetails/LoanSteps/Dialog/Comment.vue";
import LoanStatusConfirmationDialog from "@/components/los/LoanDetails/LoanStatusConfirmationDialog.vue";
import { mapGetters } from "vuex";

export default {
  components: { AddCharges, Comment, LoanStatusConfirmationDialog },
  name: "DisbursalDetails",
  data() {
    return {
      count: 0,

      dialog: {
        flag: false,
      },
      comment_dialog: {
        flag: false,
      },

      vas_charges_headers: [
        {
          id: 1,
          text: "VAS Type",
        },
        {
          id: 2,
          text: "Ledger",
        },
        {
          id: 3,
          text: "Taxable Amount",
        },
        {
          id: 4,
          text: "GST",
        },
        {
          id: 5,
          text: "Discount",
        },
        {
          id: 6,
          text: "Total",
        },
      ],

      disbursal_details: [],

      vas_charges: [],

      emi_breakdown_headers: [
        {
          id: 1,
          text: "Due Date",
        },
        {
          id: 2,
          text: "Interest",
        },
        {
          id: 3,
          text: "Principal",
        },
        {
          id: 4,
          text: "EMI (Round off to nearest 10 unit)",
        },
        {
          id: 5,
          text: "Principle Outstanding",
        },
      ],

      emi_breakdown: [
        // {
        //   due_date: "12-01-2022",
        //   interest: 593.0,
        //   principal: 2875,
        //   emi: 1202,
        //   principal_outstanding: 22658,
        // },
        // {
        //   due_date: "12-02-2022",
        //   interest: 593.0,
        //   principal: 2875,
        //   emi: 1202,
        //   principal_outstanding: 22658,
        // },
        // {
        //   due_date: "12-03-2022",
        //   interest: 593.0,
        //   principal: 2875,
        //   emi: 1202,
        //   principal_outstanding: 22658,
        // },
      ],
      loan_status_confirmation_dialog_data: {
        flag: false,
        current_step: "",
        loan_status: "",
      },

      // cells: [0, 1, 0, 1],
    };
  },
  mounted() {
    // if (this.cells[0] == 0) {
    //   this.count++;
    //   for (let i = 1; i <= this.cells.length - 1; i++) {
    //     if (this.cells[i] == 1) {
    //       this.cells[i] = 0;
    //       this.count++;
    //       if (this.cells[i + 1] == 0) {
    //         this.cells[i + 1] = 1;
    //       } else {
    //         this.cells[i + 1] = 0;
    //       }
    //     }
    //   }
    // }
    // console.log(this.count);

    this.getDisbursalDetails();
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
    getDisbursalDetails() {
      // let formdata = {};
      // formdata["lead_creation"] = this.$route.params.id;
      let look_up_key = this.$route.params.id;

      const successHandler = (res) => {
        // console.log("getDisbursalDetails ", res);
        this.vas_charges = res.data.result.vas_charges;
        this.emi_breakdown = res.data.result.emi_breakdown;
        this.disbursal_details = res.data.result.disbursal_details;
      };
      const failureHandler = () => {};

      return this.$Axios(
        "get",
        this.$apiUrl.GET_DISBURSAL_DETAILS + `${look_up_key}/`,
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
.container {
  display: grid;
  /* margin-left: 0; */
  max-width: 100%;
  padding: 0;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.box-field {
  border: 1px solid #d3d3d3;
  padding: 8px;
  /* font-size: 8px; */
  text-align: left;
}
.box {
  border: 1px solid #d3d3d3;
  padding: 8px;
  font-weight: 500;
  font-size: 13px;
  text-align: left;
}
.box-color {
  background-color: #fff6ec;
  font-weight: 400;
}

div.box-field > div:nth-child(1) {
  font-size: 14px;
  color: #333333;
  opacity: 56%;
}
div.box-field > div:nth-child(2) {
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
}

table {
  width: 100%;
}
table,
th,
td {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-collapse: collapse;
  padding: 8px 20px;
  font-size: 12px;
}
table tbody tr:hover {
  background: #b1b1b142;
}
table thead {
  background: #fff6ec;
}
.emi-column {
  width: 250px;
}
</style>

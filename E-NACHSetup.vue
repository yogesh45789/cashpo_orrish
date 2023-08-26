<template>
  <div>
    <div class="d-flex justify-space-between mb-4">
      <h2 class="font-weight-medium mt-3 ml-3">E Nach Setup</h2>
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
            <template v-if="losDetails[0].value == 'E-NACH Setup'">
              <v-btn
                rounded
                class="white--text mt-3 mx-3"
                color="#D7443E"
                elevation="0"
                @click="
                  openLoanStatusConfirmationDialog(
                    losDetails[0].value,
                    losDetails[0].rejected
                  )
                "
              >
                Reject</v-btn
              >
              <v-btn
                rounded
                class="white--text mt-3 mx-3"
                color="#27AE60"
                elevation="0"
                @click="
                  openLoanStatusConfirmationDialog(
                    losDetails[0].value,
                    losDetails[0].key
                  )
                "
              >
                Approve</v-btn
              >
            </template>
          </template>
        </div>
      </slot>
    </div>

    <v-col cols="12">
      <v-row class="e-nach">
        <v-col cols="4">
          <v-row>
            <v-col cols="6"> Type </v-col>
            <v-col cols="6"> {{ enach_details.enach_type }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Account Holder Name </v-col>
            <v-col cols="6"> {{ enach_details.account_holder_name }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Account Number </v-col>
            <v-col cols="6"> {{ enach_details.account_number }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> IFSC Code </v-col>
            <v-col cols="6"> {{ enach_details.ifsc_code }} </v-col>
          </v-row>
          <h3 class="font-weight-medium mt-6 mb-6 e-nach-field">
            Razor Pay Details
          </h3>
          <v-row>
            <v-col cols="6"> Token ID </v-col>
            <v-col cols="6">
              <p v-if="enach_details.token_id">{{ enach_details.token_id }}</p>
              <p v-else>-</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Order ID </v-col>
            <v-col cols="6"> {{ enach_details.order_id }} </v-col>
          </v-row>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="6"> Max Amount </v-col>
            <v-col cols="6"> ₹{{ enach_details.max_amount }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Expiry </v-col>
            <v-col cols="6"> {{ enach_details.expiry_date }} </v-col>
          </v-row>
          <v-row class="mb-6">
            <v-col cols="6"> </v-col>
            <v-col cols="6"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Status </v-col>
            <v-col class="confirmed" cols="6">
              {{ enach_details.status }}
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="6"> </v-col>
            <v-col cols="6"> </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="6"> </v-col>
            <v-col cols="6"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Payment ID </v-col>
            <v-col cols="6"> {{ enach_details.payment_id }} </v-col>
          </v-row>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col class="" cols="2">
          <v-btn
            @click="openUpdateEnach()"
            small
            rounded
            color="#2F80ED"
            class="mt-3 mx-3"
            outlined
          >
            Update</v-btn
          >
        </v-col>
      </v-row>
    </v-col>
    <ENachDialog :dialog_data="dialog" @onSuccess="getEnachDetails()" />
    <Comment :comment_data="comment_dialog" />
    <LoanStatusConfirmationDialog
      :dialog="loan_status_confirmation_dialog_data"
    />
  </div>
</template>
<script>
import ENachDialog from "@/components/los/LoanDetails/LoanSteps/Dialog/E-NachDialog.vue";
import Comment from "@/components/los/LoanDetails/LoanSteps/Dialog/Comment.vue";
import LoanStatusConfirmationDialog from "@/components/los/LoanDetails/LoanStatusConfirmationDialog.vue";
import { mapGetters } from "vuex";

export default {
  components: { ENachDialog, Comment, LoanStatusConfirmationDialog },
  name: "ENachSetup",
  data() {
    return {
      enach_details: {
        // enach_type: "",
        // account_holder_name: "",
        // account_number: "",
        // ifsc_code: "",
        // token_id: null,
        // order_id: null,
        // payment_id: null,
        // status: null,
        // max_amount: null,
        // expiry_date: null,
      },
      dialog: {
        flag: false,
        data: {},
      },
      comment_dialog: {
        flag: false,
      },
      loan_status_confirmation_dialog_data: {
        flag: false,
        current_step: "",
        loan_status: "",
      },
    };
  },
  mounted() {
    this.getEnachDetails();
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
    openUpdateEnach() {
      this.dialog.flag = true;
      this.dialog.data = {
        token_id: this.enach_details.token_id,
        payment_id: this.enach_details.payment_id,
        order_id: this.enach_details.order_id,
      };
    },
    getEnachDetails() {
      let look_up_key = this.$route.params.id;

      const successHandler = (res) => {
        console.log("getEnachDetails ", res);
        this.enach_details = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios(
        "get",
        this.$apiUrl.GET_ENACH_DETAILS + `${look_up_key}/`,
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
.e-nach-field {
  color: #196197;
}
.confirmed {
  color: #27ae60;
}
.row.e-nach > div > .row > div:first-child {
  font-weight: 400;
  font-size: 13px;

  color: rgba(0, 0, 0, 0.56);
}
.e-nach {
  background-color: #fff;
}
</style>

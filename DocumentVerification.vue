<template>
  <div>
    <div class="d-flex justify-space-between mb-4">
      <h2 class="font-weight-medium mt-3 ml-3">Document Verfication</h2>
      <slot name="header">
        <div>
          <v-btn
            @click="comment_dialog.flag = true"
            rounded
            color="#2F80ED"
            class="mt-3 mx-3"
            outlined
            elevation="0"
          >
            <v-icon class="mr-1">mdi-message-reply-text</v-icon> Comment</v-btn
          >
          <template v-if="losDetails[0]">
            <template v-if="losDetails[0].value == 'Document Verification'">
              <v-btn
                @click="
                  openLoanStatusConfirmationDialog(
                    losDetails[0].value,
                    losDetails[0].rejected
                  )
                "
                rounded
                class="white--text mt-3 mx-3"
                elevation="0"
                color="#D7443E"
              >
                Reject</v-btn
              >
            </template>
          </template>
        </div>
      </slot>
    </div>

    <v-row>
      <v-col
        v-for="item in document_list"
        :key="item.id"
        class="py-0"
        cols="12"
      >
        <v-row class="mx-3 mt-3">
          <v-col cols="4"
            >{{ item.title }}
            <div v-if="item.number" class="text-caption font-weight-bold">
              {{ item.number }}
            </div>
            <div class="not-number" v-else></div>
          </v-col>
          <v-col cols="4">
            <div v-if="item.is_requested && !item.is_verified">
              <!-- <div> -->
              <v-icon color="warning">mdi-alert-decagram</v-icon>
              <span class="font-weight-bold warning--text ml-1"
                >Requested
              </span>
            </div>
            <!-- <div> -->
            <div v-else-if="item.is_verified">
              <v-icon color="success">mdi-check-decagram</v-icon>
              <span class="font-weight-bold success--text ml-1">Verified </span>
            </div>
          </v-col>
          <v-col class="d-flex justify-end" cols="4">
            <v-btn
              small
              outlined
              class="mr-2 text-capitalize"
              color="#2F80ED"
              @click="item.files[1] ? openViewDialog(item) : viewDocument(item)"
              >View</v-btn
            >

            <slot name="button">
              <v-btn
                @click="verification(item.param)"
                small
                :disabled="item.is_verified || item.title === 'CIBIL Report'"
                outlined
                class="mr-2 text-capitalize"
                color="success"
                >Verify</v-btn
              >
              <v-btn
                @click="requestAgain(item.param)"
                small
                :disabled="
                  item.is_verified ||
                  item.title === 'CIBIL Report' ||
                  item.is_requested
                "
                outlined
                class="mr-2 text-capitalize"
                color="warning"
                >Request
                <!-- <span v-if="item.is_requested && !item.is_verified">
                Again</span
              > -->
              </v-btn>
              <v-btn
                small
                :disabled="item.is_verified"
                outlined
                color="#4F4F4F "
                class="text-capitalize"
                >Upload</v-btn
              >
            </slot>
          </v-col>
        </v-row>
        <v-divider> </v-divider>
      </v-col>
    </v-row>
    <div>
      <v-btn
        v-if="approval_dialog.form_status == 'fill'"
        color="primary"
        class="white--text mt-8 mb-3 ml-3"
        rounded
        dark
        elevation="0"
        @click="OpenApprovalForm()"
      >
        <slot name="approval"> Create Approval Form </slot>
      </v-btn>
      <v-btn
        v-else-if="
          approval_dialog.form_status == 'approve' ||
          approval_dialog.form_status == 'view'
        "
        elevation="0"
        color="primary"
        class="white--text mt-8 mb-3 ml-3"
        rounded
        dark
        @click="approval_dialog.flag = true"
      >
        <slot name="approval"> View Approval Form </slot>
      </v-btn>
    </div>
    <!-- <div class="mt-8 ml-3"></div> -->
    <approval-dialog
      :dialog_show="approval_dialog"
      @onSuccess="getApprovalFormDetails()"
    ></approval-dialog>
    <Comment :comment_data="comment_dialog" />
    <ViewDocList :dialog="view_doc_list_dialog_data" />
    <LoanStatusConfirmationDialog
      :dialog="loan_status_confirmation_dialog_data"
    />
  </div>
</template>
<script>
import ApprovalDialog from "@/components/los/LoanDetails/LoanSteps/Dialog/ApprovalFormDialog.vue";
import Comment from "@/components/los/LoanDetails/LoanSteps/Dialog/Comment.vue";
import LoanStatusConfirmationDialog from "@/components/los/LoanDetails/LoanStatusConfirmationDialog.vue";
import ViewDocList from "@/components/common/ViewDocList.vue";
import { mapGetters } from "vuex";

import { mapActions } from "vuex";
export default {
  components: {
    ApprovalDialog,
    Comment,
    ViewDocList,
    LoanStatusConfirmationDialog,
  },
  name: "DocumentVerification",
  data() {
    return {
      document_list: {},
      approval_dialog: {
        flag: false,
        form_data: {},
        form_status: "",
      },
      comment_dialog: {
        flag: false,
      },

      items: [
        {
          bank_name: "",
          loan_amount: "",
          emi_amount: "",
          no_of_bounce: "",
          current_balance: "",
          overdue: "",
        },
      ],
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
          value: "no_of_bounce",
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
          value: "close",
          class: "table_head",
          align: "right",
          sortable: false,
        },
      ],

      view_doc_list_dialog_data: {
        flag: false,
        data: [],
      },
      loan_status_confirmation_dialog_data: {
        flag: false,
        current_step: "",
        loan_status: "",
      },
      is_all_doc_verified: false,
    };
  },
  mounted() {
    this.getBorrowersDocuments();
    this.getApprovalFormDetails();
  },
  computed: {
    ...mapGetters({
      losDetails: "losDetails/getCurrentStepData",
    }),
  },
  methods: {
    ...mapActions({
      showToast: "snackBar/showToast",
    }),

    OpenApprovalForm() {
      // Delete the uncomment line and uncomment the commented line for all doc verified condition
      this.approval_dialog.flag = true;

      // let list = this.document_list.filter((item) => {
      //   return item.title != "CIBIL Report";
      // });
      // let non_verified_list = list.filter((item) => {
      //   return item.is_verified == false;
      // });
      // if (non_verified_list.list == 0) {
      //   this.approval_dialog.flag = true;
      // } else {
      //   alert("Please verify all documents before creating approval form");
      // }
    },

    viewDocument(item) {
      // console.log("viewDocument", item);
      if (item.files[0].uploaded_file) {
        window.open(item.files[0].uploaded_file);
      } else {
        window.open(item.files[0].uploaded_url);
      }
    },
    openViewDialog(item) {
      // alert("Multiple documents found", item);
      this.view_doc_list_dialog_data.flag = true;
      this.view_doc_list_dialog_data.data = item;
    },
    openLoanStatusConfirmationDialog(current_step, loan_status) {
      this.loan_status_confirmation_dialog_data.flag = true;
      this.loan_status_confirmation_dialog_data.current_step = current_step;
      this.loan_status_confirmation_dialog_data.loan_status = loan_status;
    },
    addMore() {
      this.items.push({
        bank_name: "",
        loan_amount: "",
        emi_amount: "",
        no_of_bounce: "",
        current_balance: "",
        overdue: "",
      });
    },
    removeField(index) {
      // console.log("index", index);
      // console.log("list", this.items);
      this.items.splice(index, 1);
      // console.log("after splice list", this.items);
    },
    verification(data) {
      let formdata = {};
      formdata["lead_creation"] = this.$route.params.id;
      formdata["param"] = data;
      let look_up_key = this.$route.params.id;

      const successHandler = () => {
        // this.document_list = res.data.result;
        this.getBorrowersDocuments();
        // console.log(res);
      };
      const failureHandler = () => {};

      return this.$Axios("put", this.$apiUrl.MAKE_DOCUMENT_VERIFIED, {
        lookUpKey: look_up_key,
        data: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });

      // this.$Axios.request_PUT(
      //   this.$apiUrl.MAKE_DOCUMENT_VERIFIED,
      //   look_up_key,
      //   formdata,
      //   {},
      //   successHandler,
      //   failureHandler
      // );
    },

    requestAgain(data) {
      let formdata = {};
      // formdata["lead_creation"] = this.$route.params.id;
      formdata["param"] = data;
      let look_up_key = this.$route.params.id;

      const successHandler = () => {
        // this.document_list = res.data.result;
        this.getBorrowersDocuments();
        // console.log(res);
      };
      const failureHandler = () => {};

      return this.$Axios("put", this.$apiUrl.MAKE_REQUEST_AGAIN, {
        data: formdata,
        lookUpKey: look_up_key,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });

      // this.$Axios.request_PUT(
      //   this.$apiUrl.MAKE_REQUEST_AGAIN,
      //   look_up_key,
      //   formdata,
      //   {},
      //   successHandler,
      //   failureHandler
      // );
    },

    getBorrowersDocuments() {
      let formdata = {};
      formdata["lead_creation"] = this.$route.params.id;
      // let look_up_key = "";

      const successHandler = (res) => {
        this.document_list = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_BORROWER_SUBMITTED_DOCUMENT, {
        params: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });

      // this.$Axios.request_GET(
      //   this.$apiUrl.GET_BORROWER_SUBMITTED_DOCUMENT,
      //   look_up_key,
      //   formdata,
      //   {},
      //   successHandler,
      //   failureHandler,
      //   false,
      //   true
      // );
    },

    getApprovalFormDetails() {
      let look_up_key = this.$route.params.id;

      const successHandler = (res) => {
        if (!res.data.result.analysed_by_executive) {
          this.approval_dialog.form_status = "fill";
        } else if (
          res.data.result.executive_entered_loan_amount ||
          res.data.result.executive_entered_emi_amount
        ) {
          if (
            res.data.result.approved_executive_entered_emi_amount ||
            res.data.result.approved_executive_entered_loan_amount
          ) {
            this.approval_dialog.form_status = "view";
            this.approval_dialog.form_data = res.data.result;
          } else {
            this.approval_dialog.form_status = "approve";
            this.approval_dialog.form_data = res.data.result;
          }
        }
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_APPROVAL_FORM_DETAILS, {
        lookUpKey: look_up_key,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
  },
};
</script>
<style scoped>
.isVerified {
  color: #27ae60;
}
.ismobile {
  color: #989393;
  font-size: 12px;
}
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

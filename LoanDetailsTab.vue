<template>
  <div>
    <v-card>
      <v-tabs background-color="#f2f8fc" v-model="tab" color="#27AE60" grow>
        <v-tab
          v-for="item in tab_items"
          :key="item"
          :value="item"
          class="text-capitalize green--text"
          active-class="font-weight-thin"
        >
          <v-icon class="mr-1" color="#27AE60">mdi-check</v-icon>
          <div>
            {{ item }}
          </div>
        </v-tab>
      </v-tabs>
      <transition name="component-fade" mode="out-in">
        <InternalScore v-if="tab == '0'">
          <template #button>
            <div></div>
          </template>
        </InternalScore>
        <DocumentVerification v-if="tab == '1'">
          <template #header>
            <div></div>
          </template>
          <template #button>
            <div></div>
          </template>
          <template #approval> view Approval Form </template>
        </DocumentVerification>

        <CreditAssesmentMemo v-if="tab == '2'">
          <template #buttons>
            <div></div>
          </template>
          <template #generate-btn>
            <div></div>
          </template>
          <template #send-offers>
            <div></div>
          </template>
        </CreditAssesmentMemo>
        <DisbursalDetail v-if="tab == '3'">
          <template #comment>
            <div></div>
          </template>
          <template #add-charges>
            <div></div>
          </template>
        </DisbursalDetail>
        <VideoCallVerification v-if="tab == '4'">
          <template #buttons>
            <div></div>
          </template>
          <template #generateLoanAgreement>
            <div></div>
          </template>
          <template #upload>
            <div></div>
          </template>
          <template #callNow> <div></div></template>
        </VideoCallVerification>
        <EnachSetup v-if="tab == '5'">
          <template #buttons>
            <div></div>
          </template>
        </EnachSetup>
        <PaymentTask v-if="tab == '6'">
          <template #buttons>
            <div></div>
          </template>
          <template #payment_mode>
            <slot name="pay_mode">
              <div></div>
            </slot>
          </template>
        </PaymentTask>
      </transition>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "LoanDetailsTab",
  components: {
    InternalScore: () =>
      import("../../los/LoanDetails/LoanSteps/InternalScore.vue"),
    DocumentVerification: () =>
      import("../../los/LoanDetails/LoanSteps/DocumentVerification.vue"),
    CreditAssesmentMemo: () =>
      import("../../los/LoanDetails/LoanSteps/CreditAssesment.vue"),
    DisbursalDetail: () =>
      import("../../los/LoanDetails/LoanSteps/DisbursalDetails.vue"),
    VideoCallVerification: () =>
      import("../../los/LoanDetails/LoanSteps/VideoCallVerification.vue"),
    EnachSetup: () =>
      import("../..//los/LoanDetails/LoanSteps/E-NACHSetup.vue"),
    PaymentTask: () =>
      import("../../los/LoanDetails/LoanSteps/PaymentTask.vue"),
  },
  data() {
    return {
      tab: "Internal Score",
      tab_items: [
        "Internal Score",

        "Document Verification ",

        "Credit Assessment Memo ",

        "Disbursal Details ",

        "Video Call Verification ",

        "E NACH Setup ",

        "Payment Task",
      ],
    };
  },
};
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
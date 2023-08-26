<template>
  <div>
    <div>
      <v-tabs v-model="tab" background-color="#f2f8fc">
          <!-- :disabled="item.status == 'False'" -->
        <v-tab
          class="text-capitalize"
          v-for="(item, i) in items"
          :key="i.key"
          :href="
            item.value == 'Internal Score'
              ? '#one'
              : item.value == 'Document Verification'
              ? '#two'
              : item.value == 'Credit Assestment Memo'
              ? '#three'
              : item.value == 'Disbursal Details'
              ? '#four'
              : item.value == 'Video Call Verification'
              ? '#five'
              : item.value == 'E-NACH Setup'
              ? '#six'
              : '#seven'
          "
        >
          <v-icon v-if="item.status == 'True'" color="success">
            mdi-check
          </v-icon>
          <v-icon
            v-else-if="item.status == 'Rejected'"
            color="error"
            class="mr-2"
          >
            mdi-close
          </v-icon>
          {{ item.value }}
        </v-tab>
        <!-- <v-tab href="#one"> Internal Score </v-tab>
        <v-tab href="#two"> Document Verfication </v-tab>
        <v-tab href="#three"> Credit Assesment </v-tab>
        <v-tab href="#four"> Disbursal Details </v-tab>
        <v-tab href="#five"> VideoCall Verfication </v-tab>
        <v-tab href="#six"> ENACHSetup </v-tab>
        <v-tab href="#seven"> Payment Task </v-tab> -->
      </v-tabs>

      <div>
        <v-tabs-items :value="tab">
          <v-tab-item value="one">
            <InternalScore />
          </v-tab-item>

          <v-tab-item value="two">
            <DocumentVerfication />
          </v-tab-item>

          <v-tab-item value="three">
            <CreditAssesment />
          </v-tab-item>

          <v-tab-item value="four">
            <DisbursalDetails />
          </v-tab-item>

          <v-tab-item value="five">
            <VideoCallVerfication />
          </v-tab-item>

          <v-tab-item value="six">
            <ENACHSetup />
          </v-tab-item>

          <v-tab-item value="seven">
            <PaymentTask />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </div>
  <!-- DON'T DELETE THIS  comment 👇 -->
  <!-- <div>
    <v-tabs v-model="tab" background-color="" grow>
      <v-tab
        :disabled="item.is_not_approve"
        v-for="(item, i) in items"
        :key="i.key"
      >
        {{ item.value }}
      </v-tab>
    </v-tabs>

    <div>
      <InternalScore v-if="tab === 1" />
      <DocumentVerfication v-if="tab === 0" />
      <CreditAssesment v-if="tab === 2" />
      <DisbursalDetails v-if="tab === 3" />
      <VideoCallVerfication v-if="tab === 4" />
      <ENACHSetup v-if="tab === 5" />
      <PaymentTask v-if="tab === 6" />
    </div>
  </div> -->
</template>

<script>
import InternalScore from "@/components/los/LoanDetails/LoanSteps/InternalScore.vue";
import DocumentVerfication from "@/components/los/LoanDetails/LoanSteps/DocumentVerification.vue";
import CreditAssesment from "@/components/los/LoanDetails/LoanSteps/CreditAssesment.vue";
import DisbursalDetails from "@/components/los/LoanDetails/LoanSteps/DisbursalDetails.vue";
import VideoCallVerfication from "@/components/los/LoanDetails/LoanSteps/VideoCallVerification.vue";
import ENACHSetup from "@/components/los/LoanDetails/LoanSteps/E-NACHSetup.vue";
import PaymentTask from "@/components/los/LoanDetails/LoanSteps/PaymentTask.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    InternalScore,
    DocumentVerfication,
    CreditAssesment,
    DisbursalDetails,
    VideoCallVerfication,
    ENACHSetup,
    PaymentTask,
  },
  data() {
    return {
      // DON'T DELETE THIS  comment 👇
      // tab: null,
      // items: [
      //   {
      //     sn_o: "one",
      //     key: "internal_score",
      //     value: "Internal Score",
      //     is_not_approve: false,
      //   },
      //   {
      //     sn_o: "two",
      //     key: "document_verification",
      //     value: "Document Verification",
      //     is_not_approve: false,
      //   },
      //   {
      //     sn_o: "three",
      //     key: "credit_assesment_memo",
      //     value: "Credit Assesment Memo",
      //     is_not_approve: false,
      //   },
      //   {
      //     sn_o: "four",
      //     key: "disbursal_details",
      //     value: "Disbursal Details",
      //     is_not_approve: false,
      //   },
      //   {
      //     sn_o: "five",
      //     key: "video_call_verification",
      //     value: "Video Call Verification",
      //     is_not_approve: false,
      //   },
      //   {
      //     sn_o: "six",
      //     key: "e_nach_setup",
      //     value: "E NACH Setup",
      //     is_not_approve: false,
      //   },
      //   {
      //     sn_o: "seven",
      //     key: "payment_task",
      //     value: "Payment Task",
      //     is_not_approve: false,
      //   },
      // ],
      items: [],
    };
  },
  mounted() {
    this.getSteps();
    // this.saveCurrentStepDate();
  },
  computed: {
    tab: {
      set(tab) {
        this.$router
          .replace({ query: { ...this.$route.query, tab } })
          .catch(() => {}); // added catch(()=>{}) to fix NavigationDuplicated: Avoided redundant navigation to current location
        // console.log(this.$route.query);
      },
      get() {
        // console.log(this.$route.query.tab);
        return this.$route.query.tab;
      },
    },

    ...mapGetters({
      count: "losDetails/getCount",
    }),
  },
  watch: {
    count(newValue) {
      console.log("count", newValue);
      this.getSteps();
    },
  },
  methods: {
    saveCurrentStepDate() {
      // this.$router.replace({ query: { tab: "three" } }).catch(() => {}); // added catch(()=>{}) to fix NavigationDuplicated: Avoided redundant navigation to current location
      let current_step = this.items.filter((value) => {
        return value.status == "On Hold" || value.status == "Rejected";
      });
      let current_step_id = current_step[0].sn_o;
      this.$router.replace({ query: { tab: current_step_id } }).catch(() => {}); // added catch(()=>{}) to fix NavigationDuplicated: Avoided redundant navigation to current location
      this.$store.dispatch("losDetails/setCurrentStepData", current_step);
    },
    getSteps() {
      let formdata = {};
      formdata["lead_creation"] = this.$route.params.id;
      // let look_up_key = "";

      const successHandler = (res) => {
        // console.log("get steps", res.data.result);
        this.items = res.data.result;
        this.saveCurrentStepDate();
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_STEPS, {
        params: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
  },
};
</script>
<style scoped></style>

<template>
  <div>
    <!-- <h2 class="font-weight-medium mt-3 ml-3">Internal Score</h2> -->
    <slot name="button">
      <div class="d-flex justify-end">
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
          <template v-if="losDetails[0].value == 'Internal Score'">
            <v-btn
              elevation="0"
              rounded
              @click="
                openLoanStatusConfirmationDialog(
                  losDetails[0].value,
                  losDetails[0].rejected
                )
              "
              class="white--text mt-3 mx-3"
              color="#D7443E"
            >
              Reject</v-btn
            >
            <v-btn
              elevation="0"
              rounded
              @click="
                openLoanStatusConfirmationDialog(
                  losDetails[0].value,
                  losDetails[0].key
                )
              "
              class="white--text mt-3 mx-3"
              color="#27AE60"
            >
              Approve</v-btn
            >
          </template>
        </template>
      </div>
    </slot>
    <v-card
      class="mt-4 ml-4 d-flex justify-center scores"
      max-width="360"
      height="530"
    >
      <div max-width="360">
        <v-card-title class="justify-center"> Internal Score </v-card-title>
        <vue-ellipse-progress
          class="mt-4"
          :progress="progress"
          :size="230"
          :thickness="12"
          emptyThickness="5%"
          :legend="true"
          :legendValue="basic_info.score_got"
          :half="true"
          :angle="360"
          dot="23 blue"
          fontSize="3rem"
        >
          <span slot="legend-value"></span>
        </vue-ellipse-progress>
      </div>
      <div class="numbers">
        <div>0</div>
        <div class="ml-2">{{ basic_info.max_score }}</div>
      </div>
      <div class="py-0 score-factors">Score Factors:</div>
      <v-col class="score" cols="12">
        <v-row>
          <v-col class="score-card" cols="6">
            <label class="py-0" cols="6">Marital Status</label>
            <div class="py-0" cols="6">{{ basic_info.marital_status }}</div>
          </v-col>

          <v-col class="score-card" cols="6">
            <label class="py-0" cols="6">Educational Qualification</label>
            <div class="py-0" cols="6">
              {{ basic_info.education_qualification }}
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="score-two" cols="12">
        <v-row>
          <v-col class="score-card" cols="6">
            <label class="py-0" cols="6">Age</label>
            <div class="py-0" cols="6">{{ basic_info.age }}</div>
          </v-col>

          <v-col class="score-card" cols="6">
            <label class="py-0" cols="6">Monthly Income</label>
            <div class="py-0" cols="6">{{ basic_info.monthly_income }}</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="score-three" cols="12">
        <v-row>
          <v-col class="score-card" cols="6">
            <label class="py-0" cols="6">House Ownership</label>
            <div class="py-0" cols="6">{{ basic_info.house_owernship }}</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="buttonPF">
        <v-chip color="#27AE60" outlined class="pl-7 pr-7">Pass</v-chip>
      </v-col>
    </v-card>
    <Comment :comment_data="comment_dialog" />
    <LoanStatusConfirmationDialog
      :dialog="loan_status_confirmation_dialog_data"
    />
  </div>
</template>

<script>
import { VueEllipseProgress } from "vue-ellipse-progress";
import Comment from "@/components/los/LoanDetails/LoanSteps/Dialog/Comment.vue";
import LoanStatusConfirmationDialog from "@/components/los/LoanDetails/LoanStatusConfirmationDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "InternalScore",
  components: { VueEllipseProgress, Comment, LoanStatusConfirmationDialog },
  data() {
    return {
      // result:{},
      basic_info: {},
      progress: null,
      // progress: (this.basic_info.score_got / this.basic_info.max_score) * 100,
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
    this.getInternalScore();
  },
  computed: {
    ...mapGetters({
      losDetails: "losDetails/getCurrentStepData",
    }),
  },
  methods: {
    progresses() {
      this.progress =
        (this.basic_info.score_got / this.basic_info.max_score) * 100;
    },
    openLoanStatusConfirmationDialog(current_step, loan_status) {
      this.loan_status_confirmation_dialog_data.flag = true;
      this.loan_status_confirmation_dialog_data.current_step = current_step;
      this.loan_status_confirmation_dialog_data.loan_status = loan_status;
    },
    getInternalScore() {
      let look_up_key = this.$route.params.id;

      const successHandler = (res) => {
        this.basic_info = res.data.result;
        this.progresses();
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_INTERNAL_SCORE, {
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
.numbers {
  display: flex;
  position: absolute;
  width: 237px;
  justify-content: space-between;
  top: 212px;
}
div.score-card > label {
  font-size: 12px;
  color: #989393;
}
.score {
  display: flex;
  position: absolute;
  bottom: 165px;
}
.score-two {
  display: flex;
  position: absolute;
  bottom: 110px;
}
.score-three {
  display: flex;
  position: absolute;
  bottom: 50px;
}
.score-factors {
  display: flex;
  position: absolute;
  left: 0;
  top: 260px;
  margin-left: 10px;
  color: #989393;
}
.buttonPF {
  display: flex;
  position: absolute;
  justify-content: center;
  bottom: 0px;
}
</style>

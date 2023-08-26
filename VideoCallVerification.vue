<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <h2 class="font-weight-bold mt-3 ml-3">Video Call Verification</h2>
        <slot name="callNow">
          <v-btn color="#2F80ED" class="mt-3 mx-3" outlined> Call Now</v-btn>
          <v-chip color="purple lighten-5" class="mt-3">
            Scheduled on: 11AM:12PM
          </v-chip>
        </slot>
      </div>
      <slot name="buttons">
        <div>
          <v-btn
            @click="comment_dialog.flag = true"
            rounded
            color="#2F80ED"
            class="mt-3 mx-3"
            e
            outlined
          >
            <v-icon class="mr-1">mdi-message-reply-text</v-icon>
            Comment</v-btn
          >
          <template v-if="losDetails[0]">
            <template v-if="losDetails[0].value == 'Video Call Verification'">
              <v-btn
                @click="dialog.flag = true"
                rounded
                color="#2F80ED"
                class="mt-3"
                elevation="0"
                outlined
              >
                Schedule Call</v-btn
              >
              <v-btn
                elevation="0"
                rounded
                class="white--text mt-3 mx-3"
                color="#D7443E"
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
                elevation="0"
                class="mt-3 white--text mr-3"
                @click="
                  openLoanStatusConfirmationDialog(
                    losDetails[0].value,
                    losDetails[0].key
                  )
                "
                color="#27AE60"
              >
                Approve</v-btn
              >
            </template>
          </template>
        </div>
      </slot>
    </div>

    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pa-7">
          <h3 class="font-weight-bold">Loan Agreement</h3>
          <!-- <div class="d-flex justify-start">
            <slot name="generateLoanAgreement">
              <div>
                <v-btn color="#2F80ED" class="mt-3 mx-3" outlined>
                  Generated Loan Agreement</v-btn
                >
              </div>
            </slot>
            <slot name="upload">
              <div class="d-flex justify-center ml-3 align center">
                <div class="upload rounded-lg d-flex align-center">
                  <div class="mt-1">Upload Agreement</div>
                </div>
                <div class="upload-btn">
                  <v-btn
                    color="#2F80ED"
                    class="rounded-l-0 upload rounded-lg white--text ml-10 mt-3 mx-3"
                  >
                    Upload</v-btn
                  >
                </div>
              </div>
            </slot>
            <a class="view" href="view.pdf">View</a>
          </div> -->
          <div class="d-flex align-center">
            <v-btn color="purple accent-4" class="mt-3" outlined>
              Generate</v-btn
            >
            <v-btn color="#2F80ED" class="mt-3 mx-3" dark elevation="0">
              Upload</v-btn
            >
            <v-btn icon class="mt-3"> <v-icon outlined> mdi-eye</v-icon></v-btn>
            <v-btn icon class="mt-3 ml-2">
              <v-icon outlined> mdi-delete</v-icon></v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="6" class="pa-7">
          <h3 class="font-weight-bold mt-3 mb-4">Video Call Result</h3>
          <v-form>
            <v-row>
              <v-col cols="4">
                <div class="field-name">Date & Time</div>
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="6">
                    <v-menu
                      ref="menu1"
                      v-model="dateObMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
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
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dateObMenu = false">
                          Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="dateObMenu = false">
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <div class="time-field">
                        <v-text-field
                          append-icon="mdi-clock-time-four-outline"
                          v-model="time"
                          placeholder="Select Time"
                          readonly
                          dense
                          outlined
                          v-on="on"
                          v-bind="attrs"
                        ></v-text-field>
                        </div>
                      </template>
                       <div class="time-picker">
                      <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        ampm-in-title
                        full-width
                        @click:minute="$refs.menu.save(time)"
                      ></v-time-picker>
                    </div>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <div class="field-name">VV Done By</div>
              </v-col>
              <v-col cols="8">
                <v-text-field dense placeholder="Enter Name"> </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <div class="field-name">Result</div>
              </v-col>
              <v-col cols="8">
                <v-radio-group row class="py-0 mt-0">
                  <v-radio label="Positive" value="Positive" class=""></v-radio>
                  <v-radio
                    label="Negative"
                    value="Negative"
                    class="px-4"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <div class="field-name">Remark</div>
              </v-col>
              <v-col cols="8">
                <v-text-field dense placeholder="Enter Remark"> </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="6" class="pa-7">
          <h3 class="font-weight-bold mt-3 mb-4">Video Call Result</h3>
          <v-col
            cols="9"
            v-for="item in video_call_result_history"
            :key="item.id"
            class="d-flex align-center justify-space-between my-4 px-6 py-4 grey lighten-4"
          >
            <div>
              <div>
                {{ item.created }} by
                <span class="font-weight-bold">{{ item.agent }}</span>
              </div>
              <div>
                <span
                  :class="item.result"
                  class="video-call-result-tag font-weight-bold"
                  >{{ item.result }}</span
                >
                -
                <span class="grey--text">{{ item.remark }}</span>
              </div>
            </div>
            <div>
              <v-btn color="primary" outlined @click="viewRecording(item)">
                view
              </v-btn>
            </div>
          </v-col>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="6" class="pa-7">
          <h3 class="font-weight-medium mt-3 mb-4">Scheduled On</h3>
          <div class="call-history" v-if="scheduled_list[0]">
            <ul>
            <li v-for="(item, index) in scheduled_list" :key="index" class="my-2">
              {{item.time}}, {{item.date}}
            </li>
            </ul>
          </div>
          <div class="call-history" v-else>Not scheduled yet</div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="6" class="pa-7">
          <h3 class="font-weight-medium mt-3 mb-4">Last Call History</h3>
          <div class="call-history">No Call History</div>
        </v-col>
      </v-row>
    </v-container>

    <VideoCallVerificationDialog :dialog_data="dialog" />
    <!-- <ApproveDialog :approve_data="approve_dialog" /> -->
    <Comment :comment_data="comment_dialog" />
    <LoanStatusConfirmationDialog
      :dialog="loan_status_confirmation_dialog_data"
    />
  </div>
</template>
<script>
import VideoCallVerificationDialog from "@/components/los/LoanDetails/LoanSteps/Dialog/ScheduleVideoVerification.vue";
// import ApproveDialog from "@/components/los/LoanDetails/LoanSteps/Dialog/ApproveDialog.vue";
import Comment from "@/components/los/LoanDetails/LoanSteps/Dialog/Comment.vue";
import LoanStatusConfirmationDialog from "@/components/los/LoanDetails/LoanStatusConfirmationDialog.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    VideoCallVerificationDialog,
    Comment,
    LoanStatusConfirmationDialog,
  },
  name: "VideoCallVerification",

  data() {
    return {
      dialog: {
        flag: false,
      },
      // approve_dialog: {
      //   flag: false,
      // },
      comment_dialog: {
        flag: false,
      },
      date: null,
      formated_dateOB: null,
      dateObMenu: false,
      time: null,
      menu2: false,
      modal2: false,
      loan_status_confirmation_dialog_data: {
        flag: false,
        current_step: "",
        loan_status: "",
      },
      video_call_result_history: [
        {
          id: 1,
          created: "11:00 AM, 24 Mar 2023",
          agent: "Vikran",
          result: "Positive",
          remark: "Perfect",
          recording: "www.google.com",
        },
        {
          id: 2,
          created: "3:00 AM, 23 Mar 2023",
          agent: "Vikran",
          result: "Negative",
          remark: "Network issue",
          recording: "www.google.com",
        },
      ],
      scheduled_list: [],
      history_list: [],
    };
  },
  mounted() {
    this.getVideoCallSchedule();
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
    viewRecording(value) {
      window.open(value.recording, "_blank");
    },
    getVideoCallSchedule() {
      let formdata = {
        lead_creation: this.$route.params.id,
      };
      const successHandler = (res) => {
        // console.log("get video schedule list", res);
        this.scheduled_list = res.data.result
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_VIDEO_CALL_SCHEDULE, {
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
.upload {
  padding-right: 98px;
  margin-top: 12px;
  padding-top: 2px;
  padding-bottom: 5px;
  padding-left: 7px;
  min-width: 100px !important;
  color: #d3d3d3;
  border: 1px solid #d3d3d3;
}
.upload-btn {
  position: absolute;
  margin-left: 300px;
}
.view {
  position: absolute;
  margin-top: 16px;
  margin-left: 612px;
}

.field-name {
  color: #989393;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}
.call-history {
  color: #121212;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}
.video-call-result-tag.Positive {
  color: green !important;
}
.video-call-result-tag.Negative {
  color: red !important;
}
.time-field{
   cursor: pointer
}
.time-picker {
  cursor: pointer;
}
</style>

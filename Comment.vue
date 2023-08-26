<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      width="580"
      height="auto"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Internal Comments
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-row no-gutters justify="center" class="mt-2 mb-5">
            <v-col cols="12">
              <v-col cols="6">
                <div class="output-box">
                  <div>
                    <div class="person mb-1">Executive 1</div>
                    <div class="message">Need to verify the identity!</div>
                  </div>
                  <div class="time">09:30</div>
                </div>
              </v-col>
            </v-col>
            <!-- <v-col cols="12">
              <v-col cols="6">
                <div class="output-box">
                  <div>
                    <div class="person mb-1">Executive 1</div>
                    <div class="message">Need to verify the identity!</div>
                  </div>
                  <div class="time">09:30</div>
                </div>
              </v-col>
            </v-col> -->
            <!-- <v-col cols="12">
              <v-col cols="6">
                <div class="output-box">
                  <div>
                    <div class="person mb-1">Executive 1</div>
                    <div class="message">Need to verify the identity!</div>
                  </div>
                  <div class="time">09:30</div>
                </div>
              </v-col>
            </v-col> -->
            <!-- <v-col cols="12">
              <v-col cols="6">
                <div class="output-box">
                  <div>
                    <div class="person mb-1">Executive 1</div>
                    <div class="message">Need to verify the identity!</div>
                  </div>
                  <div class="time">09:30</div>
                </div>
              </v-col>
            </v-col> -->
            <v-col cols="12">
              <v-col cols="6">
                <div class="output-box">
                  <div>
                    <div class="person mb-1">Executive 1</div>
                    <div class="message">Now!</div>
                  </div>
                  <div class="time">09:30</div>
                </div>
              </v-col>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6"></v-col>
                <v-col cols="6">
                  <div class="input-box">
                    <div>
                      <div class="person mb-1">Executive 2</div>
                      <div class="message">
                        Verification is already in process.!
                      </div>
                    </div>
                    <div class="time">09:30</div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-col class="pt-4" cols="12">
            <v-textarea
              class="py-0"
              placeholder="Enter message here"
              outlined
              auto-grow
              hide-details
              row-height="15"
            >
            </v-textarea>
            <v-btn class="send-btn" x-large icon>
              <v-icon x-large color="primary">mdi-send-circle</v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
  props: ["comment_data"],
  data() {
    return {
      dialog: this.comment_data,
    };
  },
};
</script>
<style scoped>
.person {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #989393;
}
.time {
  display: flex;
  justify-content: end;
  font-weight: 400;
  font-size: 11px;
  color: #989393;
}
.message {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #121212;
}
.output-box {
  padding: 8px 16px;
  gap: 4px;
  width: 257px;
  height: 74px;
  background: rgba(222, 222, 222, 0.5);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
.input-box {
  padding: 8px 16px;
  gap: 4px;
  width: 257px;
  height: 74px;
  background: rgba(241, 131, 36, 0.15);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
.send-btn {
  position: absolute;
  bottom: 35px;
  right: 25px;
}
</style>
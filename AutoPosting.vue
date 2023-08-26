<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      width="380"
      height="800"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Auto Posting
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row no-gutters justify="center" class="mt-2 mb-5">
                <v-col cols="3" class="d-flex justify-center">
                  <v-icon color="#27AE60" class="tick-icon"
                    >mdi-check-circle</v-icon
                  >
                </v-col>
              </v-row>
              <v-row no-gutters justify="center">
                <v-col cols="11" class="text-center">
                  <div class="text-description">
                    <h2 class="font-weight-bold mb-2">
                      Auto Posting Sent to Bank
                    </h2>

                    <div class="d-process">Disbursement is on process.</div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "AutoPosting",
  props: ["autoPosting"],
  data() {
    return {
      dialog: this.autoPosting,
      startDate: null,
      startMenu: false,
      //   dialog: {
      //     flag: true,
      //   },
    };
  },
};
</script>
<style scoped>
.tick-icon {
  font-size: 75px;
}
.d-process {
  font-size: 16px;
}
</style>
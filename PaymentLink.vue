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
          class="primary"
        >
          <div class="white--text">Payment Link</div>
          <v-spacer />
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row no-gutters justify="center" class="mt-2 mb-5">
                <v-col cols="3" class="d-flex justify-center">
                 <div>
            <v-img
              src="@/assets/Group.svg"
              width="65px"
              height="65px"
              class="pl-2 ml-1 mb-1"
            >
            </v-img>
       </div>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center">
                <v-col cols="11" class="text-center">
                  <div class="text-description">
                    <h2 class="font-weight-bold mb-2">
                      Payment Link Sent
                    </h2>
                    <div class="d-process">Payment link has been Send to user</div>
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
  name: "PaymentLink",
  props: ["paymentLink"],
  data() {
    return {
      dialog: this.paymentLink,
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
.send-check {
  font-size: 78px;
}
.d-process {
  font-size: 16px;
}
</style>
<template>
  <div>
    <v-dialog v-model="dialog_data.flag" width="380">
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Comfirmation
          <v-btn @click="dialog_data.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text class="pt-2 text-center">
          <div v-if="dialog_data.loan_status == 'Rejected'">
            <v-icon color="error" size="70" class="mb-2"
              >mdi-close-circle-outline</v-icon
            >
            <div class="text-body-2">
              Are you sure you want to reject<br />
              <span class="font-weight-bold">{{
                dialog_data.current_step
              }}</span
              >?
            </div>
          </div>
          <div v-else>
            <v-icon color="success" size="70" class="mb-2"
              >mdi-check-circle-outline</v-icon
            >
            <div class="text-body-2">
              Are you sure you want to approve<br />
              <span class="font-weight-bold">{{
                dialog_data.current_step
              }}</span
              >?
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-center pt-0 pb-5">
          <v-btn
            @click="dialog_data.flag = false"
            elevation="0"
            rounded
            outlined
            :loading="btn_loader"
            :disabled="btn_loader"
            class="primary--text"
            color="primary"
          >
            No
          </v-btn>
          <v-btn
            elevation="0"
            @click="updateLosStep()"
            rounded
            :loading="btn_loader"
            :disabled="btn_loader"
            class="white--text"
            color="primary"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {
      dialog_data: this.dialog,
      btn_loader: false,
    };
  },
  methods: {
    updateLosStep() {
      // console.log("loan_status",loan_status);
      this.btn_loader = true;
      let formdata = {
        loan_status: this.dialog_data.loan_status,
      };
      let look_up_key = this.$route.params.id;

      const successHandler = () => {
        this.$store.dispatch("losDetails/setCount");
        this.dialog_data.flag = false;
        if (this.dialog_data.current_step == "Document Verification") {
          this.$emit("onSuccess");
          this.btn_loader = false;
        }
      };
      const failureHandler = () => {
        this.btn_loader = false;
      };

      return this.$Axios("put", this.$apiUrl.UPDATE_LOS_LOAN_STATUS, {
        data: formdata,
        lookUpKey: look_up_key,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
  },
};
</script>
<style scoped></style>

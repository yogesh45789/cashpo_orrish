<template>
  <div>
    <v-dialog v-model="dialog.flag" width="500">
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Select Offer
          <v-btn @click="dialog.flag = false" icon>
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-7 pb-5 pt-3">
          <v-row>
            <v-col cols="12" class="text-body-1 font-weight-bold">
              Are you sure you want to select this offer?
            </v-col>
          </v-row>
          <v-row class="make_emi">
            <v-col cols="4">
              <div>Loan Amount</div>
              <div class="font-weight-bold">₹{{ dialog.data.loan_amount }}</div>
            </v-col>
            <v-col cols="4">
              <div>Tenure</div>
              <div class="font-weight-bold">
                {{ dialog.data.tenure }}
              </div>
            </v-col>
            <v-col cols="4">
              <div>Monthly EMI</div>
              <div class="font-weight-bold">₹{{ dialog.data.emi }}</div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-3">
          <v-btn
            @click="dialog.flag = false"
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
            @click="selectOffer(dialog.data)"
            elevation="0"
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
  name: "SelectOffer",
  props: ["dialog_data"],
  data() {
    return {
      dialog: this.dialog_data,
      btn_loader: false,
    };
  },
  methods: {
    selectOffer(value) {
      let formdata = {};
      this.btn_loader = true;
      let look_up_key = value.id;
      // formdata["lead_creation"] = this.$route.params.id;
      //   console.log("selectOffer", value);
      const successHandler = () => {
        this.$emit("onSuccess");
        this.dialog.flag = false;
        this.btn_loader = false;
      };
      const failureHandler = () => {
        this.btn_loader = false;
      };

      return this.$Axios("put", this.$apiUrl.SELECT_OFFER, {
        data: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        lookUpKey: look_up_key,
        isTokenRequired: true,
      });
    },
  },
};
</script>
<style scoped>
div.make_emi > div > div:first-child {
  color: #989393;
  font-size: 13px;
}
.make_emi {
  border: 2px solid #d3d3d3;
  border-radius: 8px;
}
</style>

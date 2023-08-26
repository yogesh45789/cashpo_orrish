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
          class="text-h6 white--text primary d-flex justify-space-between"
        >
          Update ENACH
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text class="pb-1">
          <v-form ref="enachValdate" v-model="valid">
            <v-container fluid>
              <v-row class="py-0 mt-2 mb-1 justify-end">
                <v-col cols="12" class="py-0">
                  <div class="">Token ID</div>
                  <v-text-field
                    :rules="[$rules.required]"
                    class="py-0"
                    placeholder="Enter ID"
                    dense
                    outlined
                    v-model="dialog.data.token_id"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Order ID</div>
                  <v-text-field
                    :rules="[$rules.required]"
                    class="py-0"
                    placeholder="Enter ID"
                    dense
                    v-model="dialog.data.order_id"
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Payment ID</div>
                  <v-text-field
                    :rules="[$rules.required]"
                    class="py-0"
                    placeholder="Enter ID"
                    v-model="dialog.data.payment_id"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <div class="d-flex mr-3">
                  <v-btn
                    @click="updateEnach"
                    elevation="0"
                    rounded
                    color="primary"
                    class="white--text"
                  >
                    Submit
                  </v-btn>
                </div>
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
  props: ["dialog_data"],
  data() {
    return {
      dialog: this.dialog_data,
      valid: true,
    };
  },
  methods: {
    updateEnach() {
      if (this.$refs.enachValdate.validate()) {
        this.btn_loader = true;
        let look_up_key = this.$route.params.id;
        let formdata = {
          token_id: this.dialog.data.token_id,
          order_id: this.dialog.data.order_id,
          payment_id: this.dialog.data.payment_id,
        };

        const successHandler = () => {
          this.btn_loader = false;
          this.dialog.flag = false;
          this.$emit("onSuccess");
        };
        const failureHandler = () => {
          this.btn_loader = false;
        };

        return this.$Axios(
          "put",
          this.$apiUrl.UPDATE_ENACH_DETAILS + `${look_up_key}/`,
          {
            data: formdata,
            onSuccess: successHandler,
            onFailure: failureHandler,
            isTokenRequired: true,
          }
        );
      }
    },
  },
};
</script>
<style scoped></style>

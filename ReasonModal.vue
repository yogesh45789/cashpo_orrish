<template>
  <v-dialog v-model="dialog.flag" width="450px" scrollable persistent>
    <v-card>
      <v-card-title class="primary d-flex justify-space-between align-center">
        <div class="white--text text-h6">
          <div v-if="$route.name === 'loan-scheme'">
            <div v-if="dialog.is_active">Active the Loan Scheme</div>
            <div v-else>Inactive the Loan Scheme</div>
          </div>
          <div v-else-if="$route.name === 'team'">
            <div v-if="dialog.is_active">Active the Team Member</div>
            <div v-else>Inactive the Team Member</div>
          </div>
        </div>
        <div>
          <v-btn icon @click="checkActiveInactive">
            <v-icon color="#fff"> mdi-close</v-icon></v-btn
          >
        </div>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-form ref="form" lazy-validation v-model="valid">
          <div v-if="!dialog.is_active">
            <v-row no-gutters justify="center" class="mt-4">
              <v-col cols="12" class="d-flex justify-center py-0">
                <v-textarea
                  v-model="reason"
                  height="90px"
                  placeholder="Write here"
                  outlined
                  required
                  :rules="[$rules.required]"
                >
                </v-textarea>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-row no-gutters justify="center" class="">
              <v-col cols="12" class="d-flex justify-center py-4">
                <h3 v-if="$route.name === 'loan-scheme'">
                  Are you sure you want to active this Loan Scheme
                </h3>
                <h3 v-else-if="$route.name === 'team'">
                  Are you sure you want to active this Team Member
                </h3>
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex justify-end mr-2 pt-0 pb-4">
        <v-btn
          v-if="$route.name === 'loan-scheme'"
          @click="ChangeLoanSchemeStatus()"
          class="white--text"
          color="primary"
        >
          {{ dialog.is_active ? "Yes" : "Save" }}
        </v-btn>
        <v-btn
          v-else-if="$route.name === 'team'"
          @click="ChangeTeamMemberStatus()"
          class="white--text"
          color="primary"
        >
          {{ dialog.is_active ? "Yes" : "Save" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  name: "ReasonModal",
  props: ["dialog_data"],
  data() {
    return {
      reason: "",
      dialog: this.dialog_data,
      activeInac: false,
      valid: true,
    };
  },

  methods: {
    checkActiveInactive() {
      this.$emit("onClose", {
        id: this.dialog.id,
        is_active: !this.dialog.is_active,
      });
      this.dialog.flag = false;
    },

    reasonEmit() {
      this.$emit("success", {
        id: this.dialog.id,
        comment: this.reason,
      });
      console.log(this.reason);
      this.dialog.flag = false;
    },
    activeInactive() {
      return (this.activeInac = this.dialog.is_active ? "Active" : "Inactive");
    },

    ChangeLoanSchemeStatus() {
      if (this.$refs.form.validate() || this.dialog.is_active) {
        let formData = {};
        const successHandler = () => {
          this.$emit("success", {
            id: this.dialog.id,
            comment: this.reason,
          });
          this.dialog.flag = false;
        };
        const failureHandler = () => {};

        if (this.dialog.is_active) {
          formData["comment"] = "";
        } else {
          formData["comment"] = this.reason;
        }
        return this.$Axios(
          "put",
          this.$apiUrl.MAKE_LOAN_SCHEME_MEMBER_ACTIVE_INACTIVE +
            this.dialog.id +
            "/",
          {
            data: formData,
            onSuccess: successHandler,
            onFailure: failureHandler,
            isTokenRequired: true,
          }
        );
      }
    },

    ChangeTeamMemberStatus() {
      if (this.$refs.form.validate() || this.dialog.is_active) {
        let formData = {};
        const successHandler = () => {
          this.$emit("success", {
            id: this.dialog.id,
            comment: this.reason,
          });
          this.dialog.flag = false;
        };
        const failureHandler = () => {};

        if (this.dialog.is_active) {
          formData["comment"] = "";
        } else {
          formData["comment"] = this.reason;
        }
        return this.$Axios(
          "put",
          this.$apiUrl.MAKE_TEAMMEMBER_ACTIVE_INACTIVE + this.dialog.id + "/",
          {
            data: formData,
            onSuccess: successHandler,
            onFailure: failureHandler,
            isTokenRequired: true,
          }
        );
      }
    },

    postComment() {
      if (this.$refs.reason_form.validate()) {
        // let look_up_key = this.dialog.id;
        let formData = {};
        const successHandler = () => {
          this.$emit("success", {
            id: this.dialog.id,
            comment: this.reason,
          });
          this.dialog.flag = false;
        };
        const failureHandler = () => {};

        formData["comment"] = this.reason;
        if (this.$route.name === "team") {
          return this.$Axios(
            "put",
            this.$apiUrl.MAKE_TEAMMEMBER_ACTIVE_INACTIVE + this.dialog.id + "/",
            {
              data: formData,
              onSuccess: successHandler,
              onFailure: failureHandler,
              isTokenRequired: true,
            }
          );

          // this.$Axios.request_PUT(
          //   this.$apiUrl.MAKE_TEAMMEMBER_ACTIVE_INACTIVE,
          //   look_up_key,
          //   formData,
          //   {},
          //   successHandler,
          //   failureHandler,
          //   true
          // );
        } else if (this.$route.name === "loan-scheme") {
          return this.$Axios(
            "put",
            this.$apiUrl.MAKE_LOAN_SCHEME_MEMBER_ACTIVE_INACTIVE +
              this.dialog.id +
              "/",
            {
              data: formData,
              onSuccess: successHandler,
              onFailure: failureHandler,
              isTokenRequired: true,
            }
          );
          // this.$Axios.request_PUT(
          //   this.$apiUrl.MAKE_LOAN_SCHEME_MEMBER_ACTIVE_INACTIVE,
          //   look_up_key,
          //   formData,
          //   {},
          //   successHandler,
          //   failureHandler,
          //   true
          // );
        }
      }
    },
  },
  mounted() {
    this.activeInactive();
  },
};
</script>

<style scoped>
.reasonTitle > div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

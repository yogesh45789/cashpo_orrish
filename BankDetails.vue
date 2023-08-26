<template>
  <div>
    <v-form>
      <v-container fluid>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="8" md="8" sm="10" class="py-0">
              <div class="field-name">Bank Name</div>
              <v-text-field
                v-model="bank_details.bank_name"
                placeholder="Bank Name"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="8" sm="10" class="py-0">
              <div class="field-name">Account No.</div>
              <v-text-field
                v-model="bank_details.account_number"
                type="text"
                placeholder="Account No."
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="8" sm="10" class="py-0">
              <div class="field-name">Confirm Account No</div>
              <v-text-field
                type="text"
                placeholder="Confirm Account No"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="8" sm="10" class="py-0">
              <div class="field-name">IFSC Code</div>
              <v-text-field
                v-model="bank_details.IFSC_code"
                type="text"
                placeholder="Enter IFSC"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="8" sm="10" class="py-0">
              <div class="field-name">Account Holder Name</div>
              <v-text-field
                v-model="bank_details.account_holder_name"
                type="text"
                placeholder="Enter Account Holder's Name"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-form>
    <div class="d-flex justify-end mb-1">
      <v-btn class="mr-4" outlined color="primary" @click="changeStepper(2)">
        Back
      </v-btn>
      <v-btn
        rounded
        class="white--text"
        color="primary"
        @click="createBorrowerInfo()"
      >
        <!-- @click="changeStepper(4)" -->
        Save
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      basic_info: "createLead/getBasicInfo",
      employment_info: "createLead/getEmploymentInfo",
      bank_info: "createLead/getBankDetails",
      identity_info: "createLead/getIdentity",
      uploaded_document: "createLead/getUploadedDocument",
    }),
    bank_details: {
      get() {
        return this.bank_info;
      },
      set(value) {
        return this.$store.dispatch("createLead/setBankDetails", value);
      },
    },
  },
  methods: {
    ...mapActions({
      bankInfo: "createLead/bank_information",
    }),

    changeStepper(value) {
      this.$store.dispatch("createLead/setStepperId", value);
    },
    createBorrowerInfo() {
      const successHandler = () => {};
      const failureHandler = () => {};

      let formData = {
        basic_information: this.basic_info.basic_details,
        employment_information: this.employment_info,
        current_address_information: this.basic_info.current_add,
        permanent_address_information: this.basic_info.current_add,
        // permanent_address_information: this.basic_info.permanent_add,
        bank_information: this.bank_info,
        reference_information: this.basic_info.reference_info,
      };

      return this.$Axios("post", this.$apiUrl.ADD_BORROWER_COMPLETE_INFO, {
        data: formData,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
  },
};
</script>
<style scoped></style>

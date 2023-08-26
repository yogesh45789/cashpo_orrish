<template>
  <div>
    <v-form>
      <v-container fluid>
        <v-col cols="8" md="8">
          <v-row>
            <v-col cols="3" md="3" class="py-0">
              <div>Employement Type</div>
            </v-col>
            <v-col cols="9" md="9" class="py-0">
              <v-radio-group
                v-model="employee_info.employment_type"
                row
                class="py-0 mt-0"
              >
                <v-radio label="Self Employed" value="Self Employed"></v-radio>
                <v-radio label="Salaried" value="Salaried"></v-radio>
                <v-radio label="Unemployed" value="Unemployed"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" md="3" class="py-0">
              <div>Salary Type</div>
            </v-col>
            <v-col cols="9" md="9" class="py-0">
              <v-radio-group
                v-model="employee_info.salary_type"
                row
                class="py-0 mt-0"
              >
                <v-radio
                  label="Direct Account Transfer"
                  value="Direct Account Transfer"
                ></v-radio>
                <v-radio label="Cash" value="Cash"></v-radio>
                <v-radio label="Cheque" value="Cheque"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8" md="8">
          <v-row>
            <v-col cols="12" md="12" class="py-0">
              <div class="field-name">Company Name</div>
              <v-text-field
                v-model="employee_info.company_name"
                placeholder="Enter Company Name"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="12" class="py-0">
              <div class="field-name">Complete Company Address</div>
              <v-text-field
                v-model="employee_info.complete_company_address"
                placeholder="Enter Address"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8" md="8">
          <v-row>
            <v-col cols="6" md="6" class="py-0">
              <div class="field-name">Designation</div>
              <v-text-field
                v-model="employee_info.designation"
                placeholder="Enter Designation"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" md="6" class="py-0">
              <div class="field-name">Total Work Experience</div>
              <v-row class="">
                <v-col cols="6" md="6">
                  <v-text-field
                    v-model="employee_info.work_experience_in_year"
                    rounded
                    placeholder="Years"
                    dense
                    outlined
                    background-color="#FFF"
                    class="rounded-r-0"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                  <v-text-field
                    v-model="employee_info.work_experience_in_months"
                    rounded
                    placeholder="Months"
                    dense
                    outlined
                    background-color="#FFF"
                    class="rounded-l-0"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="6" class="py-0">
              <div class="field-name">Net Monthly Salary</div>
              <v-text-field
                v-model="employee_info.monthly_income"
                placeholder="Enter Amount (₹)"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" md="6" class="py-0">
              <div class="field-name">
                Official Email Address
                <span style="color: #989393"> (Optional)</span>
              </div>
              <v-text-field
                v-model="employee_info.company_email_id"
                placeholder="Enter Amount (₹)"
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
      <v-btn class="mr-4" outlined color="primary" @click="changeStepper(1)">
        Back
      </v-btn>
      <v-btn
        rounded
        class="white--text"
        color="primary"
        @click="changeStepper(3)"
      >
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
      employment_info: "createLead/getEmploymentInfo",
    }),
    employee_info: {
      get() {
        return this.employment_info;
      },
      set(value) {
        return this.$store.dispatch("createLead/setEmployementDetails", value);
      },
    },
  },
  methods: {
    ...mapActions({
      employeeInfo: "createLead/employment_information",
    }),

    changeStepper(value) {
      this.$store.dispatch("createLead/setStepperId", value);
    },
  },
};
</script>
<style scoped>
</style>
<template>
  <div>
    <v-form>
      <v-container fluid>
        <v-col cols="8" md="8">
          <h1 color="primary" class="pb-5 primary--text">Basic Details</h1>
          <v-row>
            <v-col cols="12" md="12" class="py-0">
              <div class="field-name">
                Full Name <span style="color: #989393">(as per PAN)</span>
              </div>
              <v-text-field
                v-model="basic_information.basic_details.borrower_name"
                placeholder="Enter Customer Name"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="12" class="py-0">
              <div class="field-name">Father's Name</div>
              <v-text-field
                v-model="basic_information.basic_details.guardian_name"
                placeholder="Enter Father's Name"
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
              <div class="field-name">Mobile No.</div>
              <v-text-field
                v-model="basic_information.basic_details.mobile_no"
                placeholder="Enter Mobile No."
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" md="6" class="py-0">
              <div class="field-name">Email ID</div>
              <v-text-field
                v-model="basic_information.basic_details.email_id"
                placeholder="Enter Email"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Gender</div>
              <v-select
                v-model="basic_information.basic_details.gender"
                :items="gender_list"
                item-value="text"
                placeholder="Select Gender"
                dense
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Date of Birth</div>
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
                    v-model="basic_information.basic_details.dob"
                    placeholder="Start Date"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    background-color="#FFF"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="basic_information.basic_details.dob"
                  no-title
                  scrollable
                >
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
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Marital Status</div>
              <v-select
                v-model="basic_information.basic_details.marital_status"
                :items="martial_status_list"
                item-value="text"
                placeholder="Marital Status"
                dense
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Education</div>
              <v-text-field
                v-model="basic_information.basic_details.highest_degree"
                placeholder="Enter Course/Program"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="8" md="8" class="py-0">
              <div class="field-name">Institute Name</div>
              <v-text-field
                v-model="basic_information.basic_details.institute"
                placeholder="Enter University/Institute"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" md="6">
          <h3 class="pb-5">Current Address</h3>
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div>Resident Type</div>
            </v-col>
            <v-col cols="8" md="8" class="py-0">
              <v-radio-group
                v-model="basic_information.current_add.resident_type"
                row
                class="py-0 mt-0"
              >
                <v-radio label="Rented" value="Rented" class="px-4"></v-radio>
                <v-radio label="Own" value="Own" class="px-4"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8" md="8">
          <v-row>
            <v-col cols="12" md="12" class="py-0">
              <div class="field-name">Address Line 1</div>
              <v-text-field
                v-model="basic_information.current_add.address_line_one"
                placeholder="Enter Address"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
              <div class="field-name">Address Line 2</div>
              <v-text-field
                v-model="basic_information.current_add.address_line_two"
                placeholder="Enter Address"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Pincode</div>
              <v-text-field
                v-model="basic_information.current_add.pincode"
                placeholder="Enter Pincode"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">City</div>
              <v-text-field
                v-model="basic_information.current_add.city"
                placeholder="Enter City"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">State</div>
              <v-text-field
                v-model="basic_information.current_add.state"
                placeholder="Enter State"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" md="6">
          <h3 class="pb-5">Permanent Address</h3>
          <v-checkbox
            v-model="basic_information.permanent_add.is_permanent_address"
            label="Same as Current Address"
            :v-bind="true"
            hide-details
            class="pb-5 mb-4"
          ></v-checkbox>
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div>Resident Type</div>
            </v-col>
            <v-col cols="8" md="8" class="py-0">
              <v-radio-group
                v-model="basic_information.permanent_add.resident_type"
                row
                class="py-0 mt-0"
              >
                <v-radio label="Rented" value="Rented" class="px-4"></v-radio>
                <v-radio label="Own" value="Own" class="px-4"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8" md="8">
          <v-row>
            <v-col cols="12" md="12" class="py-0">
              <div class="field-name">Address Line 1</div>
              <v-text-field
                v-model="basic_information.permanent_add.address_line_one"
                placeholder="Enter Address"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
              <div class="field-name">Address Line 2</div>
              <v-text-field
                v-model="basic_information.permanent_add.address_line_two"
                placeholder="Enter Address"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Pincode</div>
              <v-text-field
                v-model="basic_information.permanent_add.pincode"
                placeholder="Enter Pincode"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">City</div>
              <v-text-field
                v-model="basic_information.permanent_add.city"
                placeholder="Enter City"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">State</div>
              <v-text-field
                v-model="basic_information.permanent_add.state"
                placeholder="Enter State"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <h1 color="primary" class="pb-5 primary--text">Reference Contact</h1>
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Person Name</div>
              <v-text-field
                v-model="basic_information.reference_info[0].name"
                placeholder="Enter Name"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Relation</div>
              <v-text-field
                v-model="basic_information.reference_info[0].relations_type"
                placeholder="Select Relation"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Contact</div>
              <v-text-field
                v-model="basic_information.reference_info[0].contact_no"
                placeholder="Contact"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Person Name</div>
              <v-text-field
                v-model="basic_information.reference_info[1].name"
                placeholder="Enter Name"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Relation</div>
              <v-text-field
                v-model="basic_information.reference_info[1].relations_type"
                placeholder="Select Relation"
                dense
                outlined
                background-color="#FFF"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Contact</div>
              <v-text-field
                v-model="basic_information.reference_info[1].contact_no"
                placeholder="Contact"
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
    <div class="d-flex justify-end pr-6 mb-1">
      <v-btn
        rounded
        class="white--text"
        color="primary"
        @click="changeStepper(2)"
      >
        Save
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      // full_name: "",
      // father_name: "",
      // mobile: null,
      // email: "",
      // gender: "",
      // dob: "",
      // martial_status: "",
      // education: "",
      // institute: "",
      gender_list: ["Male", "Female", "Transgender"],
      martial_status_list: [
        "Single",
        "Married",
        "Divorced",
        "Separated",
        "Widowed",
      ],
      // DateOB: null,
      formated_dateOB: null,
      dateObMenu: false,
    };
  },
  // watch() {},
  mounted() {},
  computed: {
    ...mapGetters({
      basic_info: "createLead/getBasicInfo",
    }),
    basic_information: {
      get() {
        return this.basic_info;
      },
      set(value) {
        return this.$store.dispatch("createLead/setBasicInfo", value);
      },
    },
  },
  methods: {
    ...mapActions({
      basicInfo: "createLead/basic_information",
    }),

    changeStepper(value) {
      this.$store.dispatch("createLead/setStepperId", value);
    },
  },
};
</script>
<style scoped>
</style>
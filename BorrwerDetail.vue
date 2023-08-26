<template>
  <div class="main-div">
    <h2 class="header-info">Basic Information</h2>
    <v-row class="align-center">
      <v-col cols="12" md="3">
        <v-img
          class="rounded-lg"
          height="200px"
          width="200px"
          src="https://picsum.photos/350/165?random"
        >
        </v-img>
      </v-col>
      <v-col cols="12" md="9">
        <div class="container">
          <div class="box-field">
            <div>Name</div>
            <div>Sagar Patel</div>
          </div>
          <div class="box-field">
            <div>Father's Name</div>
            <div>Chandra Gopal Patel</div>
          </div>
          <div class="box-field">
            <div>Date of Birth</div>
            <div>28 March 1998</div>
          </div>
          <div class="box-field">
            <div>Mobile No.</div>
            <div>7898446528</div>
          </div>
          <div class="box-field">
            <div>Email ID</div>
            <div>sagar@gmail.com</div>
          </div>
          <div class="box-field">
            <div>Gender</div>
            <div>Male</div>
          </div>
          <div class="box-field">
            <div>Martial Status</div>
            <div>Single</div>
          </div>
          <div class="box-field">
            <div>Education</div>
            <div>MCA</div>
          </div>
          <div class="box-field">
            <div>Institute</div>
            <div>Rungta College of Enginering and Technology</div>
          </div>
        </div>
      </v-col>
    </v-row>
    <h2 class="header-info mt-4">Address</h2>
    <v-row class="labels">
      <v-col cols="3">
        <label>Current Address</label>
      </v-col>
      <v-col cols="9">
        <div>
          Own <br />
          Block 4/A Street-40 , Sector-6, Bhilai Nagar, Durg Chhattisgarh, India
          <!-- {{ current_address.resident_type }}<br />
          {{ current_address.address_line_one }}
          {{ current_address.address_line_two }}
          {{ current_address.city }}
          {{ current_address.state }}
          {{ current_address.pincode }} -->
        </div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Permanent Address</label>
      </v-col>
      <v-col cols="9">
        <div>
          Own <br />
          Block 4/A Street-40 , Sector-6, Bhilai Nagar, Durg Chhattisgarh, India
          <!-- {{ permanent_address.resident_type }}<br />
          {{ permanent_address.address_line_one }}
          {{ permanent_address.address_line_two }}
          {{ permanent_address.city }}
          {{ permanent_address.state }}
          {{ permanent_address.pincode }} -->
        </div>
      </v-col>
    </v-row>

    <h2 class="header-info mt-4">Employement Details</h2>
    <v-row class="labels">
      <v-col cols="3">
        <label>Employment Type</label>
      </v-col>
      <v-col cols="9">
        <div>Salaried</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Salary Type</label>
      </v-col>
      <v-col cols="9">
        <div>Direct Account Transfer</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Company Name</label>
      </v-col>
      <v-col cols="9">
        <div>Direct Account Transfer</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Company Address</label>
      </v-col>
      <v-col cols="9">
        <div>Golbazar, Naya Raipur, 492004</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Designation</label>
      </v-col>
      <v-col cols="9">
        <div>Astt. Project Manager</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Total Work Experience</label>
      </v-col>
      <v-col cols="9">
        <div>3 Years 4 Months</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Official Email ID</label>
      </v-col>
      <v-col cols="9">
        <div>officialmail@mail.com`</div>
        <!-- <div>{{ employee_details.company_email_id }}</div> -->
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Net Monthly Salary</label>
      </v-col>
      <v-col cols="9">
        <div>70,000</div>
        <!-- <div>{{ employee_details.monthly_income }}</div> -->
      </v-col>
    </v-row>
    <h2 class="header-info mt-4">Bank Details</h2>
    <v-row class="labels">
      <v-col cols="3">
        <label>Bank Name</label>
      </v-col>
      <v-col cols="9">
        <div>IDBI Bank</div>
        <!-- <div>{{ bank_details.bank_name }}</div> -->
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Account No.</label>
      </v-col>
      <v-col cols="9">
        <div>04560987089767</div>
        <!-- <div>{{ bank_details.account_number }}</div> -->
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>IFSC Code</label>
      </v-col>
      <v-col cols="9">
        <div>04560987089767</div>
        <!-- <div>{{ bank_details.IFSC_code }}</div> -->
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Account Holder's Name</label>
      </v-col>
      <v-col cols="9">
        <div>Sagar Patel</div>
        <!-- <div>{{ bank_details.account_holder_name }}</div> -->
      </v-col>
    </v-row>
    <h2 class="header-info mt-4">Reference Contacts</h2>

    <v-row class="">
      <v-col cols="12">
        <v-row v-for="(items, i) in result.reference_information" :key="i">
          <v-col cols="3"> {{ items.name }} </v-col>
          <v-col cols="3">{{ items.relationship_type }}</v-col>
          <v-col cols="3"
            ><div class="contact_color font-weight-bold">
              {{ items.contact_number }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <h2 class="header-info mt-4">KYC</h2>
    <h4 class="my-3">Aadhaar</h4>

    <v-row class="labels">
      <v-col cols="3">
        <label>Name</label>
      </v-col>
      <v-col cols="9">
        <div>Sagar Patel</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Date of Birth</label>
      </v-col>
      <v-col cols="9">
        <div>28 March 1998</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Father's Name</label>
      </v-col>
      <v-col cols="9">
        <div>Ramesh Kumar</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Address</label>
      </v-col>
      <v-col cols="9">
        <div>House No. 32, Block A, Sector 4, Naya Raipur, Raipur 492001</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Father’s Name</label>
      </v-col>
      <v-col cols="9">
        <div>Ramesh Kumar</div>
      </v-col>
    </v-row>

    <h4 class="mt-4 mb-3">PAN</h4>
    <v-row class="labels">
      <v-col cols="3">
        <label>Name</label>
      </v-col>
      <v-col cols="9">
        <div>Sagar Patel</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Date of Birth</label>
      </v-col>
      <v-col cols="9">
        <div>28 March 1998</div>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Father's Name</label>
      </v-col>
      <v-col cols="9">
        <div>Ramesh Kumar</div>
      </v-col>
    </v-row>

    <v-row class="labels">
      <v-col cols="3">
        <label>PAN No.</label>
      </v-col>
      <v-col cols="9">
        <div>CWDPD7888H</div>
      </v-col>
    </v-row>
    <h2 class="header-info mt-4">Documents</h2>

    <v-row class="labels">
      <v-col cols="3">
        <label>Aadhaar Front</label>
      </v-col>
      <v-col cols="8">
        <code> {{ splitUrl(indentity_info.aadhar_card_front_file) }} </code>
        <v-btn @click="viewDocument(indentity_info.aadhar_card_front_file)" icon
          ><v-icon color="#2f80ed">mdi-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Aadhaar Back</label>
      </v-col>
      <v-col cols="8">
        <code> {{ splitUrl(indentity_info.aadhar_card_back_file) }} </code>
        <v-btn @click="viewDocument(indentity_info.aadhar_card_back_file)" icon
          ><v-icon color="#2f80ed">mdi-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>PAN</label>
      </v-col>
      <v-col cols="8">
        <code> {{ indentity_info.pan_number }} </code>
        <v-btn @click="viewDocument(indentity_info.pan_card_file)" icon
          ><v-icon color="#2f80ed">mdi-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>Address Proof</label>
      </v-col>
      <v-col cols="8">
        <code> {{ splitUrl(indentity_info.address_proof_file) }} </code>
        <v-btn @click="viewDocument(indentity_info.address_proof_file)" icon
          ><v-icon color="#2f80ed">mdi-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="labels">
      <v-col cols="3">
        <label>CIBIl Report</label>
      </v-col>
      <v-col cols="8">
        <code> {{ splitUrl(indentity_info.cibil_report_file) }} </code>
        <v-btn @click="viewDocument(indentity_info.cibil_report_file)" icon
          ><v-icon color="#2f80ed">mdi-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-row class="labels">
      <v-col cols="12">
        <v-row v-for="(items, i) in result.uploaded_document" :key="i">
          <v-col cols="3">{{ items.document_type }}</v-col>
          <v-col cols="5" v-if="items.uploaded_file != null"
            >{{ items.uploaded_file }}
          </v-col>
          <v-col cols="5" v-else> {{ items.uploaded_url }} </v-col>
        </v-row>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col cols="12">
        <v-row v-if="statement" class="labels align-center">
          <v-col cols="3">Bank Statement</v-col>
          <v-col v-for="(items, i) in upload_documents" :key="i" cols="2">
            <v-chip
              v-if="items.uploaded_file != null"
              @click="viewDocument(items.uploaded_file)"
              class="ma-2"
              outlined
            >
              <v-icon left> mdi-bank </v-icon>
              Bank Statement
            </v-chip>
            <v-chip
              v-else
              @click="viewDocument(items.uploaded_url)"
              class="ma-2"
              outlined
            >
              <v-icon left> mdi-bank </v-icon>
              Bank Statement
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: {},
      basic_information: {},
      current_address: {},
      permanent_address: {},
      employee_details: {},
      bank_details: {},
      indentity_info: {},
      upload_documents: {},
    };
  },
  methods: {
    getBorrowerInfo() {
      // let params = {};
      let look_up_key = this.$route.params.id;

      const successHandler = (res) => {
        // let data = res.data.result;
        this.result = res.data.result;
        this.basic_information = res.data.result.basic_information;
        this.current_address = res.data.result.current_address_information;
        this.permanent_address = res.data.result.permanent_address_information;
        this.employee_details = res.data.result.employment_information;
        this.bank_details = res.data.result.bank_information;
        this.indentity_info = res.data.result.identity_information;
        this.upload_documents = res.data.result.uploaded_document;
        // console.log(this.basic_information);
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_BORROWER_COMPLETE_INFO, {
        // params: formdata,
        lookUpKey: look_up_key,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });

      // this.$Axios.request_GET(
      //   this.$apiUrl.GET_BORROWER_COMPLETE_INFO,
      //   look_up_key,
      //   params,
      //   {},
      //   successHandler,
      //   failureHandler,
      //   false,
      //   true
      // );
    },

    splitUrl(value) {
      if (value) {
        return value.split("/").pop();
      }
    },

    statement() {
      for (let i = 0; i <= this.upload_documents.length; i++) {
        if (this.upload_documents[i].document_type === "Bank Statement") {
          return true;
        }
      }
    },

    viewDocument(url) {
      if (url) window.open(url);
    },
  },

  mounted() {
    this.getBorrowerInfo();
  },
};
</script>

<style scoped>
.contact_color {
  color: #2f80ed;
}
div.labels > div:nth-child(1) {
  color: #989393;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
}
div.labels > div:nth-child(2) {
  color: #121212;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
}
.main-div {
  margin-left: 3%;
  margin-top: 2%;
}
.header-info {
  color: #2f80ed;
}
.container {
  display: grid;
  grid-template-columns: auto auto auto;
}
.box-field {
  border: 1px solid #d3d3d3;
  padding: 8px;
  /* font-size: 8px; */
  text-align: left;
}

div.box-field > div:nth-child(1) {
  font-size: 14px;
  color: #333333;
  opacity: 56%;
}
div.box-field > div:nth-child(2) {
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
}
</style>
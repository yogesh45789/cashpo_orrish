<template>
  <div>
    <v-form>
      <v-container fluid>
        <v-col cols="12" md="12">
          <v-row class="py-0">
            <v-col cols="6" md="6" class="py-0">
              <h3 class="">Aadhaar</h3>
              <div class="upload-col-box d-flex">
                <div class="upload-main" elevation="0">
                  <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                  <label for="files" class="upload-box">
                    <div
                      style="margin-right: 37px; margin-top: 21%"
                      for="files"
                    >
                      Upload <br />Aadhaar Front
                    </div>
                    <v-img
                      height="180px"
                      width="180px"
                      class="rounded-lg"
                      :src="aadhaar_front_preview"
                    >
                    </v-img>
                  </label>
                  <input
                    ref="aadhaarFrontFeild"
                    @change="saveAadhaarFront()"
                    id="files"
                    style="visibility: hidden"
                    accept="image/*"
                    type="file"
                  />
                </div>

                <div class="upload-main ml-3" elevation="0">
                  <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                  <label for="files2" class="upload-box">
                    <div
                      style="margin-right: 37px; margin-top: 21%"
                      for="files"
                    >
                      Upload <br />Aadhaar Back
                    </div>
                    <v-img
                      height="180px"
                      width="180px"
                      class="rounded-lg"
                      :src="aadhaar_back_preview"
                    >
                    </v-img>
                  </label>
                  <input
                    @change="saveAadhaarBack()"
                    ref="aadhaarBackField"
                    id="files2"
                    style="visibility: hidden"
                    accept="image/*"
                    type="file"
                  />
                </div>
              </div>
              <div class="mt-3">
                <div class="field-name">Aadhaar</div>
                <v-text-field
                  v-model="upload_doc.aadhar_number"
                  type="text"
                  placeholder="Enter Aadhaar No."
                  dense
                  outlined
                  background-color="#FFF"
                >
                </v-text-field>
              </div>
            </v-col>
            <v-col cols="6" md="6" class="py-0">
              <h3 class="">PAN</h3>
              <div class="upload-col-box">
                <div class="upload-main" elevation="0">
                  <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                  <label for="files3" class="upload-box">
                    <div
                      style="margin-right: 53px; margin-top: 21%"
                      for="files"
                    >
                      Upload <br />PAN Card
                    </div>
                    <v-img
                      height="180px"
                      width="180px"
                      class="rounded-lg"
                      :src="pan_preview"
                    >
                    </v-img>
                  </label>
                  <input
                    @change="savePan()"
                    ref="panField"
                    id="files3"
                    style="visibility: hidden"
                    accept="image/*"
                    type="file"
                  />
                </div>
              </div>
              <div class="mt-3">
                <div class="field-name">PAN</div>
                <v-text-field
                  v-model="upload_doc.pan_number"
                  type="text"
                  placeholder="Enter PAN No."
                  dense
                  outlined
                  background-color="#FFF"
                >
                </v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="6" md="6">
              <h3>
                Address Proof
                <span
                  style="color: #989393"
                  class="font-weight-light subtitle-1"
                  >(Aadhar Card/Utility Bill/Rental Agreement)</span
                >
              </h3>
              <div class="upload-main mt-4" elevation="0">
                <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                <label for="files6" class="upload-box">
                  <div style="margin-right: 52px; margin-top: 21%" for="files">
                    Upload <br />Document
                  </div>
                  <v-img
                    height="180px"
                    width="180px"
                    class="rounded-lg"
                    :src="address_proof_preview"
                  >
                  </v-img>
                </label>
                <input
                  @change="saveAddressProof()"
                  ref="addressProofField"
                  id="files6"
                  style="visibility: hidden"
                  accept="image/*"
                  type="file"
                />
              </div>
              <!-- </v-col> -->
            </v-col>
            <v-col cols="6" md="6">
              <h3>
                Upload Photo
                <span
                  style="color: #989393"
                  class="font-weight-light subtitle-1"
                  >(Customer's Photo)</span
                >
              </h3>
              <div class="upload-main mt-4" elevation="0">
                <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                <label for="files7" class="upload-box">
                  <div style="margin-right: 62px; margin-top: 21%" for="files">
                    Upload <br />
                    Photo
                  </div>
                  <v-img
                    height="180px"
                    width="180px"
                    class="rounded-lg"
                    :src="photo_preview"
                  >
                  </v-img>
                </label>
                <input
                  @change="savePhoto()"
                  ref="photoField"
                  id="files7"
                  style="visibility: hidden"
                  accept="image/*"
                  type="file"
                />
              </div>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="6" md="6">
              <h3>
                CIBIL Report
                <span
                  style="color: #989393"
                  class="font-weight-light subtitle-1"
                  >(Upload latest Report)</span
                >
              </h3>
              <div class="upload-main mt-4" elevation="0">
                <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                <label for="files8" class="upload-box">
                  <div style="margin-right: 52px; margin-top: 21%" for="files">
                    Upload <br />Document
                  </div>
                  <v-img
                    height="180px"
                    width="180px"
                    class="rounded-lg"
                    :src="cibil_preview"
                  >
                  </v-img>
                </label>
                <input
                  @change="saveCibil"
                  ref="cibilField"
                  id="files8"
                  style="visibility: hidden"
                  accept="image/*"
                  type="file"
                />
              </div>
              <!-- </v-col> -->
            </v-col>
            <v-col cols="6" md="6">
              <h3>
                Other Documents
                <span
                  style="color: #989393"
                  class="font-weight-light subtitle-1"
                  >(Customer's Photo)</span
                >
              </h3>
              <div class="upload-main mt-4" elevation="0">
                <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                <label for="files9" class="upload-box">
                  <div style="margin-right: 53px; margin-top: 21%" for="files">
                    Upload <br />
                    Document
                  </div>
                  <v-img
                    height="180px"
                    width="180px"
                    class="rounded-lg"
                    :src="other_preview"
                  >
                  </v-img>
                </label>
                <input
                  @change="saveOtherDocuments()"
                  ref="otherDocField"
                  id="files9"
                  style="visibility: hidden"
                  accept="image/*"
                  type="file"
                />
              </div>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" md="12">
              <h3>
                Salary Slip
                <span
                  style="color: #989393"
                  class="font-weight-light subtitle-1"
                  >(Last 3 Months)</span
                >
              </h3>
              <div class="upload-main mt-4" elevation="0">
                <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                <label for="files4" class="upload-box">
                  <div style="margin-right: 51px; margin-top: 21%" for="files">
                    Upload <br />Salary Slip
                  </div>
                  <v-img
                    height="180px"
                    width="180px"
                    class="rounded-lg"
                    :src="salary_preview"
                  >
                  </v-img>
                </label>
                <input
                  @change="saveSalarySlip()"
                  ref="salarySlipField"
                  id="files4"
                  style="visibility: hidden"
                  accept="image/*"
                  type="file"
                />
              </div>
              <!-- </v-col> -->
            </v-col>
            <v-col cols="12" md="12">
              <h3>
                Bank Statement
                <span
                  style="color: #989393"
                  class="font-weight-light subtitle-1"
                  >(Last 3 Months statement of salary account)</span
                >
              </h3>
              <div class="upload-main mt-4" elevation="0">
                <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
                <label for="files5" class="upload-box">
                  <div style="margin-right: 31px; margin-top: 21%" for="files">
                    Upload <br />Bank Statement
                  </div>
                  <v-img
                    height="180px"
                    width="180px"
                    class="rounded-lg"
                    :src="bank_statement_preview"
                  >
                  </v-img>
                </label>
                <input
                  @change="saveBankStatement"
                  ref="bankStatementField"
                  id="files5"
                  style="visibility: hidden"
                  accept="image/*"
                  type="file"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-form>

    <div class="d-flex justify-end mb-1">
      <v-btn class="mr-4" outlined color="primary" @click="changeStepper(3)">
        Back
      </v-btn>
      <v-btn
        rounded
        class="white--text"
        color="primary"
        @click="
          changeStepper(5);
          createBorrowerInfo();
        "
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
  name: "TheDocuements",
  data() {
    return {
      aadhaar_front_preview: "",
      aadhaar_back_preview: "",
      pan_preview: "",
      salary_preview: "",
      bank_statement_preview: "",
      address_proof_preview: "",
      photo_preview: "",
      cibil_preview: "",
      other_preview: "",
      aadhaar_front_file: "",
      aadhaar_back_file: "",
      pan_file: "",
      salary_file: "",
      bank_statement_file: "",
      address_proof_file: "",
      photo_file: "",
      cibil_file: "",
      other_file: "",
    };
  },
  computed: {
    ...mapGetters({
      basic_info: "createLead/getBasicInfo",
      employment_info: "createLead/getEmploymentInfo",
      bank_info: "createLead/getBankDetails",
      identity_info: "createLead/getIdentity",
      uploaded_document: "createLead/getUploadedDocument",
    }),
    upload_doc: {
      get() {
        return this.identity_info;
      },
      set(value) {
        return this.$store.dispatch("createLead/setIdentityInfo", value);
      },
    },
    upload_bs: {
      get() {
        return this.uploaded_document;
      },
      set(value) {
        return this.$store.dispatch("createLead/setBsIdentityInfo", value);
      },
    },
  },
  methods: {
    ...mapActions({
      upload_docs: "createLead/identity_info",
    }),
    changeStepper(value) {
      this.$store.dispatch("createLead/setStepperId", value);
    },
    // browseAadhaarF(e) {
    //   this.aadhaar_front_file = e.target.files[0];
    //   this.aadhaar_front_preview = URL.createObjectURL(e.target.files[0]);
    //   // console.log("Aadhaar F", this.aadhaar_front_preview);
    //   // console.log("Aadhaar S", this.aadhaar_front_file);
    //   this.upload_doc.aadhaar_front_file = this.aadhaar_front_file;
    //   console.log("Aadhaar S", this.upload_doc.aadhaar_front_file);
    // },
    // browseBS(e) {
    //   this.bank_statement_file = e.target.files[0];
    //   this.bank_statement_preview = URL.createObjectURL(e.target.files[0]);
    //   // console.log("Aadhaar F", this.aadhaar_front_preview);
    //   // console.log("Aadhaar S", this.aadhaar_front_file);
    //   this.upload_bs.uploaded_file = this.bank_statement_file;
    //   console.log("Aadhaar S", this.upload_bs.uploaded_file);
    // },
    saveAadhaarFront() {
      this.aadhaar_front_file = this.$refs.aadhaarFrontFeild.files.item(0);
      this.aadhaar_front_preview = URL.createObjectURL(this.aadhaar_front_file);
      this.postDocument("aadhaar_front_file", this.aadhaar_front_file);
    },
    saveAadhaarBack() {
      this.aadhaar_back_file = this.$refs.aadhaarBackField.files.item(0);
      this.aadhaar_back_preview = URL.createObjectURL(this.aadhaar_back_file);
      this.postDocument("aadhar_card_back_file", this.aadhaar_back_file);
    },
    savePan() {
      this.pan_file = this.$refs.panField.files.item(0);
      this.pan_preview = URL.createObjectURL(this.pan_file);
      this.postDocument("pan_card_file", this.pan_file);
    },
    saveSalarySlip() {
      this.salary_file = this.$refs.salarySlipField.files.item(0);
      this.salary_preview = URL.createObjectURL(this.salary_file);
    },
    saveBankStatement() {
      this.bank_statement_file = this.$refs.bankStatementField.files.item(0);
      this.bank_statement_preview = URL.createObjectURL(
        this.bank_statement_file
      );
    },
    saveAddressProof() {
      this.address_proof_file = this.$refs.addressProofField.files.item(0);
      this.address_proof_preview = URL.createObjectURL(this.address_proof_file);
      this.postDocument("address_proof_file", this.address_proof_file);
    },
    savePhoto() {
      this.photo_file = this.$refs.photoField.files.item(0);
      this.photo_preview = URL.createObjectURL(this.photo_file);
      this.postDocument("upload_photo_file", this.photo_file);
    },
    saveCibil() {
      this.cibil_file = this.$refs.cibilField.files.item(0);
      this.cibil_preview = URL.createObjectURL(this.cibil_file);
      this.postDocument("cibil_report_file", this.cibil_file);
    },
    saveOtherDocuments() {
      this.other_file = this.$refs.otherDocField.files.item(0);
      this.other_preview = URL.createObjectURL(this.other_file);
      this.postDocument("other_file", this.other_file);
      // this.uploaded_document[0].uploaded_file =
      //   this.$refs.PhotoFile9.files.item(0);
      // this.other_preview = URL.createObjectURL(
      //   this.uploaded_document[0].uploaded_file
      // );
    },

    postDocument(document_key, file) {
      // let formdata = {
      //   document_key: file,
      // };
      // const successHandler = (res) => {
      //   console.log("postDocument", res);
      // };
      // const failureHandler = () => {};

      // return this.$Axios(
      //   "put",
      //   this.$apiUrl.CREATE_BORROWER_INFO + `${look_up_key}/`,
      //   {
      //     data: formdata,
      //     onSuccess: successHandler,
      //     onFailure: failureHandler,
      //     isTokenRequired: true,
      //   }
      // );
      console.log(document_key, file);
    },

    createBorrowerInfo() {
      this.appendIdentity();
      let formData = new FormData();
      const successHandler = () => {};

      const failureHandler = () => {};
      // Basic Information ***xxx*** ***xxx*** ***xxx***
      //  Basic details
      formData.append(
        "basic_information",
        JSON.stringify(this.basic_info.basic_details)
      );

      // current address
      formData.append(
        "current_address_information",
        JSON.stringify(this.basic_info.current_add)
      );

      // permanent address
      formData.append(
        "permanent_address_information",
        JSON.stringify(this.basic_info.permanent_add)
      );

      // Reference info
      formData.append(
        "reference_information",
        JSON.stringify(this.basic_info.reference_info)
      );

      // Employement Info ***xxx*** ***xxx*** ***xxx***

      formData.append(
        "employment_information",
        JSON.stringify(this.employment_info)
      );

      // formData.append(
      //   "aadhaar_front_file",
      //   this.identity_info.aadhaar_front_file
      // );

      // Bank Info ***xxx*** ***xxx*** ***xxx***
      formData.append("bank_information", JSON.stringify(this.bank_info));

      // Documents ***xxx*** ***xxx*** ***xxx***
      formData.append("uploaded_document", this.appendBank());
      formData.append(
        "identity_information",
        JSON.stringify(this.identity_info)
      );

      // let identifyInfoForm = new FormData();
      // identifyInfoForm["aadhaar_front_file"] =
      //   this.identity_info.aadhaar_front_file;
      // identifyInfoForm["aadhaar_back_file"] =
      //   this.identity_info.aadhaar_back_file;
      // identifyInfoForm["pan_file"] = this.identity_info.pan_file;
      // identifyInfoForm["aadhar_number"] = this.identity_info.aadhar_number;
      // identifyInfoForm["pan_number"] = this.identity_info.pan_number;
      // identifyInfoForm["address_proof_file"] =
      //   this.identity_info.address_proof_file;
      // identifyInfoForm["upload_photo_file"] =
      //   this.identity_info.upload_photo_file;
      // identifyInfoForm["cibil_report_file"] =
      //   this.identity_info.cibil_report_file;
      // formData.append("identity_information", identifyInfoForm);
      // Upload documents
      // let otherDocument = new FormData();
      // otherDocument["document_type"] =
      //   this.identity_info.uploaded_document[0].document_type;
      // otherDocument["document_password"] =
      //   this.identity_info.uploaded_document[0].document_password;
      // otherDocument["uploaded_file"] =
      //   this.identity_info.uploaded_document[0].uploaded_file;

      // formData.append("uploaded_document", otherDocument);

      // formData.append("aadhar_number", this.upload_doc.aadhar_number);
      // formData.append("pan_number", this.upload_doc.pan_number);
      // if (this.aadhaar_front_file)
      //   formData.append("aadhaar_front_file", this.aadhaar_front_file);
      // if (this.aadhaar_back_file)
      //   formData.append("aadhaar_back_file", this.aadhaar_back_file);
      // if (this.pan_file) formData.append("pan_file", this.pan_file);
      // if (this.address_proof_file)
      //   formData.append("address_proof_file", this.address_proof_file);
      // if (this.photo_file)
      //   formData.append("upload_photo_file", this.photo_file);
      // if (this.cibil_file)
      //   formData.append("cibil_report_file", this.cibil_file);
      // if (this.other_file)
      //   formData.append("other_file", this.other_file);

      this.$Axios.request_POST(
        this.$apiUrl.ADD_BORROWER_COMPLETE_INFO,
        formData,
        {},
        successHandler,
        failureHandler,
        false,
        true
      );
    },

    appendIdentityDoc() {
      let identity_documents = new FormData();
      identity_documents.append("aadhar_number", "121231312312");
      identity_documents.append("pan_number", "121231312312");
      identity_documents.append("aadhaar_front_file", this.aadhaar_front_file);
      return identity_documents;
    },
    appendBankStatement() {
      let upload_bss = new FormData();

      upload_bss.append("document_type", "Bank Statement");
      upload_bss.append("document_password", "121231312312");
      upload_bss.append("uploaded_file", this.bank_statement_file);
      return upload_bss;
    },
    createNewBorrowerInfo() {
      const successHandler = {};
      const failureHandler = {};
      const finallyHandler = {};

      // console.log(identity_documents, upload_bss, "forms");
      // let newIdentity = {
      //   aadhar_number: "123432123456",
      //   pan_number: "aasdasddasd",
      //   aadhaar_front_file: this.aadhaar_front_file,
      // };
      // let newBs = {
      //   document_type: "Bank Statement",
      //   document_password: "aasdasddasd",
      //   uploaded_file: this.bank_statement_file,
      // };

      console.log(
        "Aadhar & BS",
        this.aadhaar_front_file instanceof File,
        this.bank_statement_file instanceof File
      );

      let formData = {
        basic_information: this.basic_info.basic_details,
        employment_information: this.employment_info,
        current_address_information: this.basic_info.current_add,
        permanent_address_information: this.basic_info.current_add,
        // permanent_address_information: this.basic_info.permanent_add,
        bank_information: this.bank_info,
        reference_information: this.basic_info.reference_info,
        uploaded_document: this.appendBankStatement(),
        identity_information: this.appendIdentityDoc(),
        // identity_information: {
        //   aadhar_number: "12345678",
        //   pan_number: "asdasd8658s",
        //   aadhaar_front_file: this.aadhaar_front_file,
        // },
        // uploaded_document: {
        //   document_type: "Bank Statement",
        //   document_password: "asdasd8658s",
        //   uploaded_file: this.aadhaar_front_file,
        // },
        // uploaded_document: newBs,
        // identity_information: newIdentity,
      };

      this.$Axios.request_POST(
        this.$apiUrl.ADD_BORROWER_COMPLETE_INFO,
        formData,
        {},
        successHandler,
        failureHandler,
        false,
        true,
        finallyHandler
      );
    },
  },
};
</script>
<style scoped>
.upload-box {
  text-align: center;
  display: flex;
  justify-content: end;
  align-items: center;
  /* padding: 10px; */
  gap: 10px;
  width: 180px;
  height: 180px;
  border: 1.4px dashed #989393;
  border-radius: 8px;
  line-height: 16px;
  color: #989393;
  background-color: #fff;
  cursor: pointer;
}
.upload-main {
  position: relative;
  width: 180px;
  height: 180px;
}
.upload-icon {
  position: absolute;
  left: 50%;
  right: 50%;
  top: 30%;
  font-size: 33px;
  color: #989393;
}
.upload-col-box {
  padding-right: 20px;
}
</style>
<style>
label.upload-box > div {
  position: absolute !important;
}
</style>

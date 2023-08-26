<template>
  <div>
    <v-form ref="team_details_form" lazy-validation v-model="valid">
      <v-container fluid>
        <h3 style="color: #2f80ed" class="pl-3 pb-3">Basic Informations</h3>
        <v-col cols="12" md="12" sm="12">
          <v-row class="pl-0 pt-4">
            <v-col cols="4" md="4" sm="6" class="py-0">
              <div class="field-name">Name</div>
              <v-text-field
                v-model="name"
                dense
                outlined
                placeholder="Name"
                required
                :rules="[$rules.name]"
                background-color="#FFF"
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6" class="py-0">
              <div class="field-name">Contact</div>
              <v-text-field
                v-model="contact"
                dense
                outlined
                required
                :rules="[$rules.phone]"
                placeholder="Contact"
                background-color="#FFF"
                counter="10"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6" class="py-0">
              <div class="field-name">Company Contact No.</div>
              <v-text-field
                v-model="companyContact"
                dense
                outlined
                required
                :rules="[$rules.phone]"
                placeholder="Company Contact No."
                type="number"
                background-color="#FFF"
                counter="10"
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6" class="py-0">
              <div class="field-name">Email ID</div>
              <v-text-field
                v-model="email"
                outlined
                dense
                placeholder="Email ID"
                type="email"
                required
                :rules="[$rules.email]"
                background-color="#FFF"
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6" class="py-0">
              <div class="field-name">Role</div>
              <v-select
                placeholder="Role"
                dense
                v-model="roles"
                :items="role"
                item-text="name"
                required
                :rules="[$rules.required]"
                item-value="id"
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
            <v-col cols="4" md="4" sm="6" class="py-0">
              <div class="field-name">Hierarchy Level</div>

              <v-select
                placeholder="Hierarchy Level"
                dense
                outlined
                v-model="hierarchies"
                :items="hierarchy"
                item-value="id"
                item-text="name"
                required
                :rules="[$rules.required]"
                background-color="#FFF"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <h3 style="color: #2f80ed" class="pl-3 pt-4">Upload Documents</h3>
        <v-row class="pl-3 pt-4 pb-5">
          <v-col cols="3" md="3" sm="4" class="upload-col-box">
            <div class="field-name">Passport Photo</div>
            <div class="upload-main" elevation="0">
              <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
              <label for="files" class="upload-box">
                <div style="margin-top: 21%" for="files">
                  Click here to upload image
                </div>
                <v-img
                  height="180px"
                  width="180px"
                  class="rounded-lg"
                  :src="passportPreview"
                >
                </v-img>
              </label>
              <input
                ref="PhotoFile"
                @change="selectPhoto"
                id="files"
                style="visibility: hidden"
                accept="image/*"
                type="file"
              />
            </div>
          </v-col>
          <v-col cols="3" md="3" sm="4" class="upload-col-box">
            <div class="field-name">PAN Card</div>
            <div class="upload-main">
              <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
              <label for="files2" class="upload-box">
                <div style="margin-top: 21%" for="files2">
                  Click here to upload image
                </div>
                <v-img
                  height="180px"
                  width="180px"
                  class="rounded-lg"
                  :src="panPreview"
                >
                </v-img>
              </label>
              <input
                ref="PhotoFile2"
                hidden
                @change="selectPhoto2"
                id="files2"
                style="visibility: hidden"
                accept="image/*"
                type="file"
              />
            </div>
          </v-col>
          <v-col cols="3" md="3" sm="4" class="upload-col-box">
            <div class="field-name">Aadhaar Card (Front)</div>
            <div class="upload-main">
              <v-icon class="upload-icon">mdi-cloud-upload-outline</v-icon>
              <label for="files3" class="upload-box">
                <div style="margin-top: 21%" for="files">
                  Click here to upload image
                </div>
                <v-img
                  height="180px"
                  width="180px"
                  class="rounded-lg"
                  :src="aadhaarFPreview"
                >
                </v-img>
              </label>
              <input
                ref="PhotoFile3"
                hidden
                @change="selectPhoto3"
                id="files3"
                style="visibility: hidden"
                accept="image/*"
                type="file"
              />
            </div>
          </v-col>
          <v-col cols="3" md="3" sm="4" class="upload-col-box">
            <div class="field-name">Aadhaar Card (Back)</div>
            <div class="upload-main">
              <v-icon for="files4" class="upload-icon"
                >mdi-cloud-upload-outline</v-icon
              >
              <label for="files4" class="upload-box">
                <div style="margin-top: 21%; position: absolute" for="files">
                  Click here to upload image
                </div>
                <v-img
                  height="180px"
                  width="180px"
                  class="rounded-lg"
                  :src="aadhaarBPreview"
                >
                </v-img>
              </label>
              <input
                ref="PhotoFile4"
                hidden
                @change="selectPhoto4"
                id="files4"
                style="visibility: hidden"
                accept="image/*"
                type="file"
              />
            </div>
          </v-col>
        </v-row>
        <h3 style="color: #2f80ed" class="pl-3 py-4">Permission Settings</h3>
        <v-row class="pl-3">
          <div style="width: 980px" class="pl-3 py-4">
            <v-expansion-panels :readonly="readOnly" accordion>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <template v-slot:actions>
                    <v-switch
                      color="#27AE60"
                      v-model="switch1"
                      inset
                      @click="run"
                    ></v-switch>
                  </template>
                  <h3>ADMIN</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-default-footer
                  >
                    <template v-slot:[`item.modules`]="{ item }">
                      <div>{{ item.name }}</div>
                    </template>
                    <template v-slot:[`item.editActions`]="{ item }">
                      <v-checkbox v-model="item.status1"></v-checkbox
                    ></template>
                    <template v-slot:[`item.deleteActions`]="{ item }">
                      <v-checkbox v-model="item.status2"></v-checkbox
                    ></template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-row>
      </v-container>
    </v-form>

    <div class="d-flex justify-end my-5 team_btn">
      <v-btn
        :loading="loading"
        class="rounded-pill text-capitalize white--text text-center"
        height="40px"
        color="primary"
        @click="postTeamDetails"
      >
        Save
      </v-btn>
    </div>
    <!-- <delete-modal> </delete-modal> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
// import DeleteModal from "@/components/DeleteModal/DeleteModal.vue";
// import { mapActions } from "vuex";

export default {
  name: "TeamDetails",
  // components: {
  //   DeleteModal,
  // },

  data() {
    return {
      valid: true,
      loading: false,
      id: null,
      switch1: false,
      readOnly: true,
      name: "Sagar Patel",
      contact: "9838229328",
      email: "sagar@gmail.con",
      companyContact: "9873772837",
      roles: "",
      hierarchies: "",

      role: [],
      hierarchy: [],
      selectedPhoto: "",
      passportPreview: "",
      panPreview: "",
      aadhaarFPreview: "",
      aadhaarBPreview: "",

      headers: [
        {
          text: "Modules",
          align: "start",
          filterable: false,
          value: "modules",
          sortable: false,
        },
        { text: "Edit", value: "editActions", sortable: false },
        { text: "Delete", value: "deleteActions", sortable: false },
      ],
      items: [
        {
          id: 1,
          name: "Team",
          status1: true,
          status2: true,
        },
        {
          id: 1,
          name: "Loan Schemes",
          status1: true,
          status2: true,
        },
      ],
    };
  },

  computed: {
    // snackBar: this.

    teamValidate() {
      return this.selectedPhoto &&
        this.selectPhoto2 &&
        this.selectPhoto3 &&
        this.selectPhoto4
        ? true
        : false;
    },
  },
  watch: {},
  methods: {
    ...mapActions({
      showToast: "snackBar/showToast",
    }),

    run() {
      this.readOnly = false;
      setTimeout(() => {
        this.readOnly = true;
      }, 250);
    },

    selectPhoto() {
      this.selectedPhoto = this.$refs.PhotoFile.files.item(0);
      this.passportPreview = URL.createObjectURL(this.selectedPhoto);
      console.log(this.contact, "contact");

      // let file = this.passportPreview
      // console.log(this.selectedPhoto);
    },
    selectPhoto2() {
      this.selectedPhoto2 = this.$refs.PhotoFile2.files.item(0);
      this.panPreview = URL.createObjectURL(this.selectedPhoto2);
      // console.log(this.selectedPhoto2);
    },
    selectPhoto3() {
      this.selectedPhoto3 = this.$refs.PhotoFile3.files.item(0);
      this.aadhaarFPreview = URL.createObjectURL(this.selectedPhoto3);
      // console.log(this.selectedPhoto3);
    },
    selectPhoto4() {
      this.selectedPhoto4 = this.$refs.PhotoFile4.files.item(0);
      this.aadhaarBPreview = URL.createObjectURL(this.selectedPhoto4);
      // console.log(this.selectedPhoto4);
    },

    getRoleList() {
      // let formData = {};
      // let look_up_key = "";
      const successHandler = (res) => {
        // console.log(res);
        this.role = res.data.result;
        console.log(res, "res");
      };

      const failureHandler = () => {
        console.log("failure");
      };

      return this.$Axios("get", this.$apiUrl.GET_ROLE_LIST, {
        // params: formData,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
      // this.$Axios.request_GET(
      //   this.$apiUrl.GET_ROLE_LIST,
      //   look_up_key,
      //   formData,
      //   {},
      //   successHandler,
      //   failureHandler,
      //   false,
      //   true
      // );
    },

    getHeirarchyList() {
      // let formData = {};
      // let look_up_key = "";

      const successHandler = (res) => {
        this.hierarchy = res.data.result;
        // console.log(File(this.selectedPhoto));
      };
      const failureHandler = (res) => {
        console.log(res);
      };

      return this.$Axios("get", this.$apiUrl.GET_HIERARCHY_LIST, {
        // params: formData,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
      // this.$Axios.request_GET(
      //   this.$apiUrl.GET_HIERARCHY_LIST,
      //   look_up_key,
      //   formData,
      //   {},
      //   successHandler,
      //   failureHandler,
      //   false,
      //   true
      // );
    },

    getTeamDetails() {
      if (this.$route.name === "team-details") {
        // let formData = {};
        // let look_up_key = this.$route.params.id;

        const successHandler = (res) => {
          this.name = res.data.result.full_name;
          this.contact = res.data.result.mobile;
          this.companyContact = res.data.result.company_contact_no;
          this.email = res.data.result.email;
          this.roles = res.data.result.role.id;
          this.hierarchies = res.data.result.hierarchy_level.id;
          this.passportPreview = res.data.result.photo;
          this.panPreview = res.data.result.pan_card;
          this.aadhaarFPreview = res.data.result.aadhar_card_front;
          this.aadhaarBPreview = res.data.result.aadhar_card_back;
        };

        const failureHandler = () => {};

        return this.$Axios(
          "get",
          this.$apiUrl.GET_TEAM_DETAILS + this.$route.params.id,
          {
            // params: formData,
            onSuccess: successHandler,
            onFailure: failureHandler,
            isTokenRequired: true,
          }
        );
        // this.$Axios.request_GET(
        //   this.$apiUrl.GET_TEAM_DETAILS,
        //   look_up_key,
        //   formData,
        //   {},
        //   successHandler,
        //   failureHandler,
        //   false,
        //   true
        // );
      }
    },

    postTeamDetails() {
      // console.log(this.teamValidate);
      if (this.$refs.team_details_form.validate()) {
        // this.loading = true;
        let formData = new FormData();
        const successHandler = () => {
          this.loading = false;
          this.$router.push({
            name: "team",
          });
        };

        const failureHandler = () => {
          this.loading = false;
        };

        formData.append("full_name", this.name);
        formData.append("mobile", this.contact);
        formData.append("company_contact_no", this.companyContact);
        formData.append("email", this.email);

        if (this.selectedPhoto) formData.append("photo", this.selectedPhoto);
        if (this.selectedPhoto2)
          formData.append("pan_card", this.selectedPhoto2);
        if (this.selectedPhoto3)
          formData.append("aadhar_card_front", this.selectedPhoto3);
        if (this.selectedPhoto4)
          formData.append("aadhar_card_back", this.selectedPhoto4);

        if (this.$route.name === "add-team") {
          if (!this.teamValidate) {
            this.showToast({
              message: "Documents Required",
              color: "e",
            });
          } else {
            this.loading = true;

            const finallyHandler = () => {
              this.loading = false;
            };
            formData.append("role", this.roles);
            formData.append("hierarchy_level", this.hierarchies);

            return this.$Axios("post", this.$apiUrl.ADD_TEAM_MEMBER, {
              data: formData,
              onSuccess: successHandler,
              onFailure: failureHandler,
              onFinally: finallyHandler,
              isTokenRequired: true,
            });
          }
        } else if (this.$route.name === "team-details") {
          this.loading = true;

          const finallyHandler = () => {
            this.loading = false;
          };
          formData.append("role", this.roles);
          formData.append("hierarchy_level", this.hierarchies);

          return this.$Axios(
            "patch",
            this.$apiUrl.PATCH_TEAM_DETAILS + this.$route.params.id + "/",
            {
              data: formData,
              onSuccess: successHandler,
              onFailure: failureHandler,
              onFinally: finallyHandler,
              isTokenRequired: true,
            }
          );
        }
      }
    },
  },

  created() {
    this.getTeamDetails();
  },
  mounted() {
    this.getRoleList();
    this.getHeirarchyList();
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }

    console.log(this.$route.name);
    console.log(this.$route.params.id);
  },
};
</script>

<style scoped>
.team_btn {
  margin-right: 70px;

  /* position: absolute;
  right: 0; */
}
.inputField {
  background-color: #fff;
}
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
.v-data-table-header {
  background-color: #dedede;
}
.v-data-table-header > tr > th {
  color: black !important;
  font-size: 15px !important;
  font-weight: 400 !important;
}
table > tbody > tr > td {
  height: 90px !important;
}
label.upload-box > div {
  position: absolute !important;
}
</style>

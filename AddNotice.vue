<template>
  <div>
    <div class="cardContent">
      <v-dialog
        max-width="730"
        scrollable
        persistent
        v-model="getNoticeModal.show"
      >
        <v-card>
          <v-card-title class="primary">
            <div class="white--text">Add Notice</div>
            <v-spacer />
            <v-btn icon @click="setNotice({ show: false })">
              <v-icon color="white">mdi-close</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text>
            <v-form ref="noticeValidate">
              <h3 class="pl-5 pt-4">Title</h3>
              <v-text-field
                :rules="[$rules.required]"
                type="text"
                outlined
                dense
                v-model="title"
                label="Enter title..."
                clearable
                class="pl-9 pt-1 pr-7"
              >
              </v-text-field>
              <h3 class="pl-5 pt-0">Body</h3>
              <div class="content">
                <wysiwyg
                  v-model="content"
                  :rules="[$rules.required]"
                  label="content"
                  class="pl-2 pr-0"
                >
                </wysiwyg>
                <!-- {{ content.length }} -->
              </div>
              <div class="btn">
                <v-card-actions class="md-1 pt-1">
                  <v-btn
                    class="mt-n6 text-center"
                    rounded
                    color="primary"
                    :loading="loading"
                    @click="save()"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
  <script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "NoticeModal",
  data() {
    return {
      loading: false,
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapState({
      getNoticeModal: (state) => state.noticeModal.notice_modal,
    }),
    show: {
      get() {
        if (this.getNoticeModal.show) return this.getNoticeModal.show;
        else return null;
      },
    },
  },
  methods: {
    ...mapMutations({
      setNotice: "noticeModal/SET_NOTICE_MODAL",
    }),

    ...mapActions({
      showToast: "snackBar/showToast",
    }),
    openModal() {},
    closeModal() {
      this.loading = false;
    },
    save() {
      if (this.$refs.noticeValidate.validate() && this.content) {
        let formData = new FormData();
        this.loading = true;
        const successHandler = () => {
          this.loading = false;
          this.setNotice({
            show: false,
          });
          this.$router.push({
            name: "notice-management",
          });
        };
        const failureHandler = () => {
          this.loading = false;
          console.log("failure");
        };
        const finallyHandler = () => {
          this.loading = false;
        };
        formData.append("title", this.title),
          formData.append("content", this.content);
        return this.$Axios("post", this.$apiUrl.POST_NOTICE_DETAILS, {
          data: formData,
          onSuccess: successHandler,
          onFailure: failureHandler,
          onFinally: finallyHandler,
          isTokenRequired: true,
        });
      } else {
        this.showToast({
          message: "Required all field",
          color: "e",
        });
      }
    },
  },
};
</script>
  <style scoped>
.btn {
  display: flex;
  justify-content: end;
  align-items: end;
  padding-right: 2%;
  padding-bottom: 1%;
  padding-top: 8%;
}
.content {
  padding-left: 0%;
  padding-right: 0%;
  outline: auto;
  outline-color: gray;
  margin-left: 5%;
  margin-right: 4%;
  margin-top: 1%;
  grid-auto-rows: min-content;
  overflow: auto;
}
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
<style scoped>
/* Medium devices (landscape tablets, 768px and up) */
/* @media only screen and (max-width:600px) {
       .cardContent {
           height: 430!important;
       }
  }  */
</style>
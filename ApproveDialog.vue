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
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Approve
          <v-btn
            @click="dialog.flag = false"
            icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-row no-gutters justify="center" class="mt-2 mb-5">
            <v-col cols="3" class="mb-3 d-flex justify-center">
              <!-- <img src="@/assets/deleteIcon.png" alt="" width="100px" /> -->
              <v-icon x-large color="primary" class=""
                >mdi-comment-alert</v-icon
              >
            </v-col>
            <v-col class="d-flex justify-center" cols="12">
              <h3 class="text-center">
                Are you sure want to approve video verification
              </h3>
            </v-col>
            <v-col class="d-flex justify-center" cols="12">
              <v-btn
                @click="dialog.flag = false"
                rounded
                outlined
                class="mt-3 mx-3"
                color="#D7443E"
              >
                Reject</v-btn
              >
              <v-btn rounded class="white--text mt-3 mx-3" color="#27AE60">
                Approve</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["approve_data"],
  data() {
    return {
      dialog: this.approve_data,
    };
  },
};
</script>
<style scoped>
</style>
<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      width="580"
      height="800"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Amendment History
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container fluid>
              <v-col cols="12">
                <v-row
                  v-for="histry in history"
                  :key="histry.name"
                  class="py-0 mt-2 mb-1 justify-end history"
                >
                  <v-col cols="12">
                    <div>{{ histry.history_date }}</div>
                  </v-col>
                  <v-col cols="4">
                    <div>Previous EMI Date</div>
                    <div>{{ histry.ammended.emi_date }}</div>
                  </v-col>
                  <v-col cols="4">
                    <div>Amended Date</div>
                    <div>{{ histry.ammended.ammended }}</div>
                  </v-col>
                  <v-col cols="4">
                    <div>Amended by</div>
                    <div>{{ histry.ammended.ammended_by }}</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["ammendment"],
  data() {
    return {
      dialog: this.ammendment,

      history: [
        {
          history_date: "20 June 2022",
          ammended: {
            emi_date: "22 June 2022",
            ammended: "27 June 2022",
            ammended_by: "Sagar Patel",
          },
        },
        {
          history_date: "20 June 2022",
          ammended: {
            emi_date: "22 June 2022",
            ammended: "27 June 2022",
            ammended_by: "Sagar Patel",
          },
        },
      ],
    };
  },
};
</script>
<style scoped>
div.history > div > div:nth-child(2) {
  font-weight: 600 !important;
}
</style>
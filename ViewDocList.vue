<template>
  <div>
    <v-dialog v-model="dialog_data.flag" width="380">
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          List
          <v-btn @click="dialog_data.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text class="pt-2 pb-6">
          <!-- {{ dialog_data }} -->
          <v-row>
            <v-col cols="12">
              <template v-if="dialog_data.data.title == 'Aadhar Card'">
                <v-row class="bottom-border">
                  <v-col cols="6" class="d-flex align-center">
                    <div>Aadhaar Front</div>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-end">
                    <v-btn
                      fab
                      elevation="0"
                      small
                      @click="viewDocument(dialog_data.data.files[0])"
                    >
                      <v-icon color="primary">mdi-eye</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row class="bottom-border">
                  <v-col cols="6" class="d-flex align-center">
                    <div>Aadhaar Back</div>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-end">
                    <v-btn
                      fab
                      elevation="0"
                      small
                      @click="viewDocument(dialog_data.data.files[1])"
                    >
                      <v-icon color="primary">mdi-eye</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
              <template v-else>
                <v-row
                  v-for="(doc, index) in dialog_data.data.files"
                  :key="index"
                  class="bottom-border"
                >
                  <v-col cols="6" class="d-flex align-center">
                    <div>
                      <span class="font-weight-bold mr-2"
                        >{{ index + 1 }}.</span
                      >
                      {{ dialog_data.data.title }}
                    </div>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center justify-end">
                    <v-btn fab elevation="0" small @click="viewDocument(doc)">
                      <v-icon color="primary">mdi-eye</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {
      dialog_data: this.dialog,
    };
  },
  methods: {
    viewDocument(item) {
      // console.log("viewDocument", item);
      if (item.uploaded_file) {
        window.open(item.uploaded_file);
      } else {
        window.open(item.uploaded_url);
      }
    },
  },
};
</script>
<style scoped>
.bottom-border {
  border-bottom: 1px solid #1b1b1b34;
}
</style>

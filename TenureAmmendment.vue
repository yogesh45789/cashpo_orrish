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
          Tenure Amendment
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form ref="tenureValidate">
            <v-container fluid>
              <v-row class="py-0 mt-2 mb-1 justify-end">
                <v-col cols="12" class="py-0">
                  <div class="">Current Tenure</div>
                  <v-select
                    :rules="[$rules.required]"
                    class="py-0"
                    placeholder="Select Tenure"
                    dense
                    outlined
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Amendment Tenure</div>
                  <v-select
                    :rules="[$rules.required]"
                    class="py-0"
                    placeholder="Select Tenure"
                    dense
                    outlined
                  >
                  </v-select>
                </v-col>

                <div class="d-flex mr-3">
                  <v-btn rounded color="primary" class="white--text">
                    Submit
                  </v-btn>
                </div>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["tenure_data"],
  data() {
    return {
      dialog: this.tenure_data,
    };
  },
};
</script>
<style scoped>
</style>
<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      persistent
      transition="dialog-bottom-transition"
      width="400"
    >
      <v-card height="">
        <v-card-title class="primary">
          <div class="white--text">Add Tag</div>
          <v-spacer />
          <v-btn @click="dialog.flag = false" icon>
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-col cols="12" md="12" class="py-2">
                  <v-radio-group row class="py-2 mt-0">
                    <v-row>
                      <v-radio value="No. Switched Off" class="pr-12 py-2"></v-radio>
                      <label class="ml-0 py-2">No. Switched Off </label>
                    </v-row>

                    <v-row>
                      <v-radio value="No. Switched On" class="pr-12 py-2"></v-radio>
                      <label class="ml-0 py-2">No. Switched Off </label>
                    </v-row>

                    <v-row>
                      <v-radio value="No Switched Off" class="pr-12 py-2"></v-radio>
                      <label class="ml-0 py-2">No. Switched Off </label>
                    </v-row>
                    <v-row>
                      <v-radio value="1" class="pr-12 "></v-radio>
                      <v-text-field  v-model="text" label="Other- Specify Here" clearable class="ml-0 text-center " height="25" width="24" >
                      </v-text-field>
                    </v-row>
                  </v-radio-group>
                </v-col>
                <div class="btn">
                  <v-btn rounded color="primary" class="white--text">
                    Save
                  </v-btn>
                </div>
                  <!-- <v-radio-group  class="pt-0">
                    <v-row class="my-0 mt-0 justify-end">
                     <v-col cols="12" md="12" sm="8" class="pl-0 pt-0">  
                    <v-radio
                       active-class="pl-0" 
                       label="NO.Switched off"
                      v-bind:value="0"
                      class=""
                    ></v-radio>
                     </v-col>
                     <v-col cols="12" md="12" sm="8" class="pl-0 pt-0">
                    <v-radio
                      label="NO.Switched off"
                      v-bind:value="1"
                      class="mx-0"
                    ></v-radio>
                     </v-col>
                     <v-col cols="12" md="12" sm="8" class="pl-0 pt-0">
                    <v-radio
                      label="NO.Switched off"
                      v-bind:value="2"
                      class="mx-0"
                    ></v-radio>
                     </v-col>
                     <v-col cols="1" class="pl-0 pt-0">
                    <v-radio 
                    v-bind:value="3"
                    class="mx-0"
                    >
                    </v-radio>
                     </v-col>
                     <v-col cols="11" class="pl-0 pt-0">
                      <v-text-field 
                      label="Other-Specify Here"
                      v-model="others"
                      dense
                      class="grey--text"
                      >
                      </v-text-field>
                     </v-col>
                    </v-row>
                  </v-radio-group>
                <div class="d-flex justify-end pb-0">
                  <v-btn rounded color="primary" class="white--text">
                    Save
                  </v-btn>
                </div> -->
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "CallTag",
  props: ["tag"],
  data() {
    return {
      dialog: this.tag,
      text: " ",
    };
  },
};
</script>
<style scoped >
.btn {
  display: flex;
  align-content: center;
  justify-content: end;
}
</style>
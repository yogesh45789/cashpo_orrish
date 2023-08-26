<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      persistent
      transition="dialog-bottom-transition"
      width="450"
    >
      <v-card>
        <v-card-title class="primary">
          <div class="white--text">Send Notice</div>
          <v-spacer />
          <v-btn @click="dialog.flag = false" icon>
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-col cols="12" md="12">
                <v-row>
                  <v-radio-group row class="py-2 mx-1">
                       <v-row>
                        <v-col cols="2" class="pl-7">
                      <v-radio value="0" class="pl-1"></v-radio>
                        </v-col>
                        <v-col cols="7"  class="">
                      <label class="ml-2">Recovery Notice</label>
                        </v-col>
                     <v-col cols="3" class="py-1">
                    <v-card-actions class="mx-9 ">
                      <v-btn
                        @click="view"
                        outlined
                        small
                        class=""
                        color="primary"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                    </v-col>
                       </v-row>
                        <v-row>
                        <v-col cols="2" class="pl-7">
                      <v-radio value="1" class="pl-1"></v-radio>
                        </v-col>
                        <v-col cols="7"  class="">
                      <label class="ml-2">Constructive Notice</label>
                        </v-col>
                     <v-col cols="3" class="py-1">
                    <v-card-actions class="mx-9 ">
                      <v-btn
                        @click="view"
                        outlined
                        small
                        class=""
                        color="primary"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                    </v-col>
                       </v-row>
                        <v-row>
                        <v-col cols="2" class="pl-7">
                      <v-radio value="2" class="pl-1"></v-radio>
                        </v-col>
                        <v-col cols="7"  class="">
                      <label class="ml-2">Non-Judicial Notice</label>
                        </v-col>
                     <v-col cols="3" class="py-1">
                    <v-card-actions class="mx-9 ">
                      <v-btn
                        @click="view"
                        outlined
                        small
                        class=""
                        color="primary"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                    </v-col>
                       </v-row>
                        <v-row>
                        <v-col cols="2" class="pl-7">
                      <v-radio value="3" class="pl-1"></v-radio>
                        </v-col>
                        <v-col cols="7"  class="">
                      <v-text-field  v-model="text" label="Other- Specify Here" class="ml-0 text-center " height="20" clearable >
                      </v-text-field>
                        </v-col>
                     <v-col cols="3" class="py-1">
                    <v-card-actions class="mx-6 ">
                      <v-btn
                        @click="view"
                        outlined
                        small
                        class=""
                        color="primary"
                      >
                        Update
                      </v-btn>
                    </v-card-actions>
                    </v-col>
                       </v-row>
                    <!-- <v-col cols="9" class="">
                    <v-radio
                      label="Constructive Notice"
                      v-bind:value="1"
                      class="mx-0"
                    ></v-radio>
                    </v-col>
                   <v-col cols="3" class="">
                    <v-card-actions class="mx-9">
                      <v-btn
                        @click="view"
                        outlined
                        small
                        class=""
                        color="primary"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                   </v-col>
                   <v-col cols="9" class="">
                    <v-radio
                      label="Non Judicial Notice"
                      v-bind:value="2"
                      class="mx-0"
                    ></v-radio>
                   </v-col>
                   <v-col cols="3" class=" pr-0">
                    <v-card-actions class="mx-9">
                      <v-btn
                        @click="view"
                        outlined
                        small
                        class=""
                        color="primary"
                      >
                        View
                      </v-btn>
                    </v-card-actions>
                   </v-col>
                    <v-col cols="2" class="">
                    <v-radio 
                    v-bind:value="3"
                    class="mx-0"
                    >
                    </v-radio>
                     </v-col>
                     <v-col cols="7" class=" pl-0">
                      <v-text-field 
                      label="Other-Specify Here"
                      v-model="others"
                      dense
                      class="grey--text"
                      >
                      </v-text-field>
                     </v-col>
                     <v-col cols="3" class=" pr-0">
                    <v-card-actions class="mx-5 pr-0">
                      <v-btn
                        @click="view"
                        outlined
                        small
                        class=""
                        color="primary"
                      >
                        Update 
                      </v-btn>
                    </v-card-actions>
                     </v-col> -->
                  </v-radio-group>
                </v-row>
              </v-col>
              <div class="btn">
                  <v-btn width="100px" rounded color="primary" class="white--text ">
                    Save
                  </v-btn>
                </div>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "SendNotice",
  props: ["sendNotice"],
  data() {
    return {
      dialog: this.sendNotice,
      text: "",
    };
  },
  methods: {
    view() {},
  },
};
</script>
<style scoped >
.btn {
  display: flex;
  justify-content: end;
  align-items: flex-end;
  margin-bottom: 5%;
  margin-top: 0%;
  margin-right: 0%;
}
.radio-group {
  margin-top: 0%;
  padding-left: 0%;
}
</style>
    
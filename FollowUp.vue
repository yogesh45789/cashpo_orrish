<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      width="390"
      height="270"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="primary">
          <div class="white--text">Follow Up</div>
          <v-spacer />
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-menu
                ref="menu1"
                v-model="datePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <h4 class="pl-0">Date</h4>
                  <v-text-field
                    class="pt-2"
                    v-model="date"
                    placeholder="Select Date"
                    append-icon="mdi-chevron-down"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    background-color="#FFF"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="datePicker = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="datePicker = false">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-menu
                ref="menu"
                v-model="timePicker"
                :close-on-content-click="false"
                :nudge-right="30"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs}">
                  <div class="time-field">
                  <h4 class="pl-0 pt-0">Time</h4>
                  <v-text-field
                    class="pt-1"
                    append-icon="mdi-chevron-down"
                    v-model="time"
                    placeholder="Select Time"
                    transition="scale-transition"
                    dense
                    readonly
                    outlined
                    v-on="on"
                    v-bind="attrs"
                  ></v-text-field>
                  </div>
                </template>
                <div class="time-picker">
                  <v-time-picker
                    v-if="timePicker"
                    v-model="time"
                    ampm-in-title
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </div>
              </v-menu>
              <h4 class="pl-0 mt-0">Remarks</h4>
              <v-textarea
                v-model="remark"
                label="Write here..."
                auto-grow
                rows="3"
                outlined
                dense
                clearable
                class="pl-0 pt-2"
                color="primary"
              ></v-textarea>
              <div class="btn">
              <div class="d-flex justify-end">
                <v-btn rounded color="primary" class="white--text">
                  Save
                </v-btn>
              </div>
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
  name: "FollowUp",
  props: ["followUp"],
  data() {
    return {
      dialog: this.followUp,
      datePicker: false,
      time: null,
      timePicker: false,
      modal2: false,
      remark: "",
      date: null,
    };
  },
};
</script>
<style scoped>
.time-picker {
  cursor: pointer;
}
.time-field {
  cursor: pointer;
}
.btn {
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 0%;
  padding-bottom: 0%;
}
</style>
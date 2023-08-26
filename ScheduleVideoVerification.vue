<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      width="450"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="primary"
        >
          Schedule Video Verification
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text class="pb-0">
          <v-form ref="scheduleValidate">
            <v-container fluid class="pb-0">
              <v-row class="py-0 mt-2 mb-1">
                <v-col cols="12" class="py-0">
                  <div class="">Date Slot</div>
                  <v-menu
                    ref="menu1"
                    v-model="date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        placeholder="Select Date"
                        append-icon="mdi-calendar"
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
                      <v-btn text color="primary" @click="date_menu = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="date_menu = false">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="">Time Slot</div>
                  <v-select
                    class="py-0"
                    :rules="[$rules.required]"
                    placeholder="select Date and Time"
                    dense
                    v-model="selected_time"
                    outlined
                    :items="time_list"
                    item-text="name"
                    item-value="name"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0 pb-3">
          <!-- <div class="d-flex mr-3 justify-end"> -->
          <v-spacer></v-spacer>
          <v-btn
            rounded
            color="primary"
            class="white--text px-3"
            @click="addVideoCallSchedule()"
          >
            Submit
          </v-btn>
          <!-- </div> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialog_data"],
  data() {
    return {
      dialog: this.dialog_data,
      time_list: [],
      selected_time: "",
      date_menu: false,
      date: "",
    };
  },
  mounted() {
    this.getVideoCallTimingList();
  },
  methods: {
    getVideoCallTimingList() {
      const successHandler = (res) => {
        this.time_list = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_VIDEO_CALL_TIMING_LIST, {
        // params: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
    addVideoCallSchedule() {
      let look_up_key = this.$route.params.id;
      let formdata = {
        time: this.selected_time,
        date: this.date,
      };
      const successHandler = () => {
        this.dialog.flag = false;
      };
      const failureHandler = () => {};

      return this.$Axios("post", this.$apiUrl.ADD_VIDEO_CALL_SCHEDULE+ `${look_up_key}/`, {
        data: formdata,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });
    },
  },
};
</script>
<style scoped></style>

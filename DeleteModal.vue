<template>
  <v-dialog v-model="getDeleteModal.show" width="420px" persistent scrollable>
    <v-card>
      <v-card-title class="primary">
        <!-- <v-row> -->
        <!-- <v-col> -->
        <!-- <div> -->
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="show = false" color="#fff">mdi-close</v-icon></v-btn
        >
        <!-- </div> -->
        <!-- </v-col> -->
        <!-- </v-row> -->
      </v-card-title>
      <v-card-text v-if="!getDeleteModal.isActive">
        <v-row no-gutters justify="center" class="mt-2 mb-5">
          <v-col cols="3" class="d-flex justify-center">
            <!-- <img src="@/assets/deleteIcon.png" alt="" width="100px" /> -->
            <v-icon color="red" class="delete-icon"
              >mdi-trash-can-outline</v-icon
            >
          </v-col>
        </v-row>
        <!-- {{ getDeleteModal.isActive }} -->
        <v-row no-gutters justify="center">
          <v-col cols="10" class="text-center">
            <div class="text-description">
              <h2 class="font-weight-bold mb-2">Deleted Successfully.</h2>

              <div>User deleted successfully</div>
              <!-- {{ getDeleteModal.ID }} -->
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
        <v-row no-gutters justify="center" class="mt-2 mb-5">
          <v-col cols="3" class="d-flex justify-center">
            <!-- <img src="@/assets/deleteIcon.png" alt="" width="100px" /> -->
            <v-icon color="orange" class="delete-icon"
              >mdi-comment-alert</v-icon
            >
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="10" class="text-center">
            <div class="text-description">
              <h2 class="font-weight-bold mb-2">Delete can't be performed.</h2>

              <div>If user has any activities it can't be deleted.</div>
              <!-- {{ getDeleteModal.ID }} -->
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteModal",

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      getDeleteModal: "deleteWarning/getDeleteModal",
      getisActive: "deleteWarning/getActive",
    }),

    show: {
      get() {
        return this.getShow;
      },
      set(value) {
        return this.toggleModal({ show: value });
      },
    },
  },

  methods: {
    ...mapActions({
      toggleModal: "deleteWarning/toggleModal",
    }),
  },
};
</script>

<style scoped>
/* .deleteTitle {
  background-color: #194e76;
} */
.delete-icon {
  font-size: 75px;
}
</style>
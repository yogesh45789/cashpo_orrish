<template>
  <v-snackbar
    v-model="snackBar.show"
    :color="snackBar.config.color"
    :multi-line="snackBar.config.multi_line"
    :top="snackBar.config.top"
    :bottom="snackBar.config.bottom"
    :left="snackBar.config.left"
    :right="snackBar.config.right"
    :timeout="snackBar.config.timeout"
  >
    <v-row class="ma-0 text-capitalize" justify="center" align="center">
      {{ snackBar.config.message }}
      <v-spacer></v-spacer>
      <v-btn dark text @click="closeSnackBar" v-if="!$store.state.showMenu">
        Close
      </v-btn>
    </v-row>
  </v-snackbar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SnackBar",
  computed: {
    snackBar() {
      return this.$store.state.snackBar;
    },
  },
  methods: {
    ...mapActions({ closeSnack: "snackBar/hideToast" }),
    closeSnackBar() {
      this.closeSnack();
    },
  },
};
</script>

<style scoped></style>

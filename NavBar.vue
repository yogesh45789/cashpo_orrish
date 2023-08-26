<template>
  <!-- <div></div> -->
  <v-app-bar absolute app class="elevation-3" color="white" height="72">
    <v-btn
      v-if="$route.meta.show_back_btn"
      fab
      small
      text
      @click="$router.go(-1)"
    >
      <v-icon color="#333333">mdi-chevron-left</v-icon>
    </v-btn>

    <v-toolbar-title class="font-bold" style="color: #333333">
      <h4>{{ $route.meta.title }}</h4>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <div class="search-field-text">
      <v-text-field
        dense
        hide-details
        v-model="search_text"
        label="Search"
        outlined
        prepend-inner-icon="mdi-magnify"
        rounded
        single-line
        clearable
      ></v-text-field>
    </div>
    <div class="ml-3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="secondary" size="40" v-bind="attrs" v-on="on">
            <div class="font-weight-medium white--text">{{ agent_name }}</div>
          </v-avatar>
        </template>
        <span>{{ agent_full_name }}</span>
      </v-tooltip>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    search_text: {
      get() {
        return this.$store.getters["getSearchText"];
      },
      set(value) {
        return this.$store.dispatch("setSearchText", value);
      },
    },
    agent_name() {
      let full_name = sessionStorage.getItem("user_name");
      let display_name = full_name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
      return display_name;
    },
    agent_full_name() {
      return sessionStorage.getItem("user_name");
    },
  },
};
</script>
<style scoped>
.search-field-text {
  width: 400px;
}
</style>

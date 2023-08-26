<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="elevation-3"
      color="#FFFFF"
      permanent
      width="200"
    >
      <div class="pt-4 pb-3 text-center">
          <v-img
            class="mt-2"
            src="@/assets/images/orrish_logo.png"
            width="110px"
          ></v-img>
      </div>
      <v-divider></v-divider>
      <v-list class="pa-0 drawer_list py-0" dense nav>
        <div v-for="(item, i) in tabs_item" :key="i">
          <!-- <div v-if="item.expand">
            <v-list-item
              active-class="active-class"
              :class="i == 0 ? 'tab-border-t' : ''"
              class="pa-0"
              @click="item.flex = !item.flex"
            >
              <v-list-item-content class="py-0">
                <v-list-item-title class="drawer-text py-4 pl-4">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div v-if="item.flex">
              <v-list-item
                v-for="(itm, i) in item.module"
                :key="i"
                :to="itm.url"
                link
              >
                <v-list-item-content class="py-0">
                  <v-list-item-title class="drawer-text py-4 pl-4">
                    {{ itm.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </div> -->
          <div>
            <v-list-item
              active-class="active-class"
              :class="i == 0 ? 'tab-border-t' : ''"
              :to="item.url"
              class="pa-0"
              link
              @click="tabClicked()"
            >
              <v-list-item-content class="py-0">
                <v-list-item-title class="drawer-text py-4 pl-4">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </v-list>
      <v-card-actions>
        <div class="logout">
          <v-btn block outlined color="#EB5757">Logout</v-btn>
        </div>
      </v-card-actions>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  name: "DrawerLayout",

  data() {
    return {
      drawer: false,
      warehouse: null,
      loading: false,
      mini: false,
      tabs_item: [
        // {
        //   id: 1,
        //   title: "Admin",
        //   module: [
        //     {
        //       title: "Team",
        //       url: { name: "team" },
        //     },
        //     {
        //       title: "Loan Sceheme",
        //       url: { name: "loan-scheme" },
        //     },
        //   ],
        //   expand: true,
        //   flex: false,
        // },

        {
          id: 1,
          title: "Team",
          url: { name: "team" },
        },
        {
          id: 2,
          title: "Loan Sceheme",
          url: { name: "loan-scheme" },
        },
        {
          id: 3,
          title: "LOS",
          url: { name: "lead-list" },
        },
        {
          id: 4,
          title: "LMS",
          url: { name: "lms-List" },
        },
        {
          id: 5,
          title: "Accounts",
          url: { name: "account-list" },
        },
        {
          id: 5,
          title: "Collections of EMI",
          url: { name: "collection-list" },
        },
        {
          id: 6,
          title: "Notice Management",
          url: {name: "notice-management"},
        }
      ],
    };
  },
  methods: {
    tabClicked() {
      this.$store.dispatch("setSearchText", "");
    },
  },
};
</script>

<style scoped>
.logout {
  position: absolute;
  margin-bottom: 10px;
  bottom: 0;
  left: 10px;
  right: 10px;
}
</style>
<style media="screen" type="text/css">
.drawer-icons {
  height: 14px;
  width: 14px;
}

.drawer-text {
  /* font-family: Gotham; */
  /*font-weight: bold !important;*/
  font-style: normal;
  font-size: 16px !important;
  line-height: 19px;
  align-items: center;
  color: #333333;
  /* font-weight: 300; */
}

.drawer_list .v-list-item--link::before {
  background-color: transparent !important;
}

.drawer_list .v-list-item--active .drawer-text {
  color: #ffff !important;
  background-color: #2f80ed;
  font-weight: 300;
}

/* .v-list-item--active {
  border-left: 5px solid primary !important;
} */

/* .v-list-item {
  border-left: 5px solid transparent;
} */
</style>

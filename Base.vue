<template>
  <v-app>
    <div>
      <Drawer />
    </div>
    <NavBar />
    <v-main app>
      <Body />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "BaseLayout",
  components: {
    Body: () => import("@/components/layouts/Body"),
    NavBar: () => import("@/components/layouts/NavBar"),
    Drawer: () => import("@/components/layouts/Drawer"),
  },
};
</script>
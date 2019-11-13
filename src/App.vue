<template>
    <v-app>
      <HeaderNav v-if="$router.currentRoute.name != 'login'" />

      <router-view />
    </v-app>
</template>

<script>
import HeaderNav from "./components/HeaderNav";

export default {
  components: {
    HeaderNav
  }
  
}
</script>
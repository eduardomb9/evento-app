<style scoped>
#divisor {
  margin-bottom: 3%;
}
</style>

<template>
    <v-app>
      <v-snackbar :timeout="timeout" v-model="snackbar" v-for="(msg, index) in messages" :key="index" top>
          {{ msg }}
      </v-snackbar>

      <HeaderNav v-if="$router.currentRoute.name != 'login'" />
      
      <v-divider id="divisor" />

      <router-view @emitir-snackbar="mostrarSnack" />
    </v-app>
</template>

<script>
import HeaderNav from "./components/HeaderNav";

export default {
  components: {
    HeaderNav
  },
  data: function() {
    return {
      messages: [],
      snackbar: false,
      timeout: 5000,
    }
  },
  methods: {
    mostrarSnack: function (msgs) {
      this.messages = msgs
      this.snackbar = true
    },
  },
}
</script>

<template>
    <v-app>
      <v-tabs v-if="!login" dark>
        <v-tab @click="$router.push('/home')">
          Eventos
        </v-tab>
        <v-tab @click="$router.push('/participantes')">
          Participantes
        </v-tab>
        <v-tab right @click="resetToken()" class="float-right"><v-icon color="dark">mdi-power</v-icon></v-tab>
      </v-tabs>
      
      <router-view />
    </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      login: false,
    }
  },
  methods: {
    resetToken: function () {
      sessionStorage.removeItem('token')
      this.login = true
      this.$router.push('/')
    },
  }
}
</script>
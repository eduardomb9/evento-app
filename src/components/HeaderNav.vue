<template>
  <div class="container-fluid">
    <v-tabs>
      <v-tab @click="$router.push('/home').catch(err => {})">
        Eventos
      </v-tab>
      <v-tab @click="$router.push('/participantes').catch(err => {})">
        Participantes
      </v-tab>
      <v-tab
        class="float-right"
        @click="resetToken()"
      >
        <v-icon color="dark">mdi-power</v-icon>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  methods: {
    resetToken: function () {
      sessionStorage.removeItem('token')
      this.$router.push('/').catch()
    }
  }
}
</script>
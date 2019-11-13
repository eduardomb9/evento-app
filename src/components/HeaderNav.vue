<template>
    <v-tabs dark>
        <v-tab @click="$router.push('/home')">
          Eventos
        </v-tab>
        <v-tab @click="$router.push('/participantes')">
          Participantes
        </v-tab>
        <v-tab right @click="resetToken()" class="float-right"><v-icon color="dark">mdi-power</v-icon></v-tab>
      </v-tabs>
</template>

<script>
export default {
    methods: {
        resetToken: function () {
        sessionStorage.removeItem('token')
        this.$router.push('/')
        },
    }
}
</script>
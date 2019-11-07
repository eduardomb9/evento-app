<template>
    <v-app>
    <v-snackbar :timeout="timeout" v-model="snackbar" v-for="(msg, index) in messages" :key="index" top>
      {{ msg }}
    </v-snackbar>
    <div v-if="token">
      <v-tabs dark>
        <v-tab @click="principal = 'evento-table'">Eventos</v-tab>
        <v-tab @click="principal = 'participante-table'">Participantes</v-tab>
        <v-tab @click="resetToken()">Logout</v-tab>
      </v-tabs>

      <component :is="principal" @add-participante="mostrarDialog" @emitir-snackbar="mostraSnack" ></component>
      <participante-dialog :dialog="dialog" @fechar-dialog="fechar" :evento="eventoEdit" @emitir-snackbar="mostraSnack" />
    </div>
    <div v-else>
      <login @emitir-snackbar="mostraSnack"></login>
    </div>
    </v-app>
</template>

<script>
import { http } from './service/config'
import EventoTable from './components/EventoTable'
import ParticipanteTable from './components/ParticipanteTable'
import ParticipanteDialog from './components/ParticipanteDialog'
import Login from './components/Login'

import Evento from './service/eventos'

export default {
  name: 'App',
  components: {
    'evento-table' : EventoTable,
    'participante-table': ParticipanteTable,
    'participante-dialog' : ParticipanteDialog,
    'login' : Login,
  },
  data: function () {
      return {
        principal: 'evento-table',
        components: {
          tabelaEvento : 'evento-table',
          formParticipante : 'participante-form',
        },
        participantes: [
        ], 
        dialog: false,
        eventoEdit: { id: '', nome: '' },
        messages: [],
        timeout: 2000,
        snackbar: false,
        token: sessionStorage.getItem('token'),
    }
  },
  methods: {
    mostrarDialog: function (evento) {
      this.eventoEdit = evento
      this.dialog = true
    },
    fechar: function () {
      this.dialog = false
    },
    mostraSnack: function (msgs) {
      this.messages = msgs
      this.snackbar = true
    },
    resetToken: function () {
      sessionStorage.removeItem('token')
      window.location.reload()
    },
  }
}
</script>

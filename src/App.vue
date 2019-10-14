<template>
    <v-app>

    <v-tabs dark>
      <v-tab @click="principal = 'evento-table'">Eventos</v-tab>
      <v-tab @click="principal = 'participante-table'">Participantes</v-tab>
    </v-tabs>

    <v-snackbar :timeout="timeout" v-model="snackbar" v-for="(msg, index) in messages" :key="index" top>
      {{ msg }}
    </v-snackbar>

    <component :is="principal" @add-participante="mostrarDialog" @emitir-snackbar="mostraSnack" ></component>
    <participante-dialog :dialog="dialog" @fechar-dialog="fechar" :evento="eventoEdit" @emitir-snackbar="mostraSnack" />

    </v-app>
</template>

<script>

import EventoTable from './components/EventoTable'
import ParticipanteTable from './components/ParticipanteTable'
import ParticipanteDialog from './components/ParticipanteDialog'

import Evento from './service/eventos'

export default {
  name: 'App',
  components: {
    'evento-table' : EventoTable,
    'participante-table': ParticipanteTable,
    'participante-dialog' : ParticipanteDialog,
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
  }
}
</script>

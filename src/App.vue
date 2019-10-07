<template>
    <v-app>

    <v-tabs dark>
      <v-tab @click="principal = 'evento-table'">Eventos</v-tab>
      <v-tab @click="principal = 'participante-table'">Participantes</v-tab>
    </v-tabs>

    <component :is="principal" @add-participante="mostrarDialog" ></component>
    <participante-form :dialog="dialog" @fechar-dialog="fechar" :evento="eventoEdit" />

    </v-app>
</template>

<script>

import EventoTable from './components/EventoTable'
import ParticipanteTable from './components/ParticipanteTable'
import ParticipanteForm from './components/ParticipanteForm2'

import Evento from './service/eventos'

export default {
  name: 'App',
  components: {
    'evento-table' : EventoTable,
    'participante-table': ParticipanteTable,
    'participante-form' : ParticipanteForm,
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
        eventoEdit: { id: '', nome: '' }
    }
  },
  methods: {
    mostrarDialog: function (evento) {
      this.eventoEdit = evento
      this.dialog = true
    },
    fechar: function () {
      this.dialog = false
    }
  }
}
</script>

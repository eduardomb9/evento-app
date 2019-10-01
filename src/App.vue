<template>
    <div id="app">

  <v-tabs style="margin-bottom: 30px">
    <v-tab @click="principal = 'evento-table'">Eventos</v-tab>
    <v-tab @click="principal = 'participante-table'">Participantes</v-tab>
  </v-tabs>

      <component :is="principal" v-on:add-participante="showParticipanteId" ></component>

      <participante-form :dialog="dialog" :evento="eventoEdit" />
    </div>
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
          'Ana',
          'Paulo',
          'Lucas',
          'Maria',
        ], 
        dialog: false,
        eventoEdit: { id: '', nome: '' }
    }
  },
  methods: {
    showParticipanteId: function (evento) {
      this.eventoEdit = evento
      this.dialog = true
    }
  }
}
</script>

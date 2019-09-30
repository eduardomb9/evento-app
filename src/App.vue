<template>
  <!-- <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app> -->
    <div id="app">
      <EventoTable v-on:add-participante="showParticipanteId" />

      <ParticipanteForm2 :dialog="dialog" :evento="eventoEdit" />
    </div>
</template>

<script>
import EventoTable from './components/EventoTable'
import ParticipanteForm2 from './components/ParticipanteForm2'
import Evento from './service/eventos'

export default {
  name: 'App',
  components: {
    EventoTable,
    ParticipanteForm2
  },
  // http://localhost:8080/api/evento
  data: function () {
      return {
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

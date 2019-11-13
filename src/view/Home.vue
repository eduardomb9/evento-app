<template>
    <div id="home">
      <div v-if="token">
          <component :is="principal" @add-participante="mostrarDialog" @emitir-snackbar="mostraSnack" ></component>
          <participante-dialog :dialog="dialog" @fechar-dialog="fechar" :evento="eventoEdit" @emitir-snackbar="mostraSnack" />
      </div>
    </div>
</template>

<script>
import { http } from '../service/config'
import EventoTable from '../components/EventoTable'
import ParticipanteTable from '../components/ParticipanteTable'
import ParticipanteDialog from '../components/ParticipanteDialog'
import Login from './Login'

import Evento from '../service/eventos'

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
      console.log(msgs)
      this.messages = msgs
      this.$emit('emitir-snackbar', this.messages)
    },
    resetToken: function () {
      sessionStorage.removeItem('token')
      window.location.reload()
    },
  }
}
</script>

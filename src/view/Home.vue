<template>
  <div id="home">
    <div v-if="token">
      <evento-table :coordenadas="coordenadas" @alterar-coordenadas="alterarCoordenadas" @add-participante="mostrarDialog" @emitir-snackbar="mostraSnack" ></evento-table>
      <participante-dialog :dialog="dialog" @fechar-dialog="fechar" :evento="eventoEdit" @emitir-snackbar="mostraSnack" />
      <mapa :coordenadasEdit="coordenadas" @alterar-coordenadas="alterarCoordenadas" />
    </div>
  </div>
</template>

<script>
import { http } from '../service/config'
import EventoTable from '../components/EventoTable'
import ParticipanteTable from '../components/ParticipanteTable'
import ParticipanteDialog from '../components/ParticipanteDialog'
import Mapa from '../components/Mapa'
import Evento from '../service/eventos'

export default {
  name: 'App',
  components: {
    'evento-table' : EventoTable,
    'participante-dialog' : ParticipanteDialog,
    'mapa' : Mapa,
  },
  data: function () {
      return {
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
        coordenadas: [],
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
      this.$emit('emitir-snackbar', this.messages)
    },
    alterarCoordenadas: function(val) {
      if (this.coordenadas.length == 0) {
        if (val.length > 0) {
          this.coordenadas.push(val[0], val[1])
        }
      } else {
        if (this.coordenadas.length > 0) {
          if (val.length > 0) {
            this.coordenadas.splice(0, this.coordenadas.length, val[0], val[1])
          } else {
            this.coordenadas.splice(0, this.coordenadas.length)
          }
        }
      }
    },
  },
}
</script>

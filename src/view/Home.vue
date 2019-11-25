<style scoped>
  #mapa { height: 280px; }
</style>

<template>
    <div id="home">
      <div v-if="token">
          <evento-table @add-participante="mostrarDialog" @emitir-snackbar="mostraSnack" ></evento-table>
          
          <participante-dialog :dialog="dialog" @fechar-dialog="fechar" :evento="eventoEdit" @emitir-snackbar="mostraSnack" />
      </div>
      {{ coordenadas[0] }} , {{ coordenadas[1] }}
      <div id="mapa"></div>
    </div>
</template>

<script>
import { http } from '../service/config'
import EventoTable from '../components/EventoTable'
import ParticipanteTable from '../components/ParticipanteTable'
import ParticipanteDialog from '../components/ParticipanteDialog'
import Evento from '../service/eventos'

export default {
  name: 'App',
  components: {
    'evento-table' : EventoTable,
    'participante-dialog' : ParticipanteDialog,
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
        mapa: [],
        layerGroup: []
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
    onMapClick: function (e) {
      this.layerGroup.clearLayers()
      if (this.coordenadas) {
          this.coordenadas = []
      }

      this.coordenadas.push(e.latlng.lat)
      this.coordenadas.push(e.latlng.lng)

      var marcador = L.marker(this.coordenadas).addTo(this.layerGroup)
    }
  },
  mounted () {
    this.mapa = L.map('mapa').setView([-3.810239, -38.484828], 16);
    this.mapa.on('click', this.onMapClick)

    this.layerGroup = L.layerGroup().addTo(this.mapa)

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWFyYW5oYW9lZHUiLCJhIjoiY2szZXE5bWJ1MDB3ejNucnUwN2JsNXBiZiJ9.gyB6TW6Q0qGZ54njdGoiCA'
    }).addTo(this.mapa)
  }
}
</script>

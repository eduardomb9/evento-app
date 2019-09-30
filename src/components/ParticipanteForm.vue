<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
      </template>
      <v-card>
        <v-card-title>Evento: {{ evento.nome }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-model="participanteId" v-for="val in participantes" :key="val.id" column>
            <v-radio :label="val.nome" :value="val.id"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="cancelar">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="salvar">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Evento from '../service/eventos'
  import Participante from '../service/participantes'

export default {
    name: 'ParticipanteForm',
    props: {
        values: Array,
        dialog: Boolean,
        evento: Object
    },
    data() {
        return {
            participanteId: '',
            participantes: {},
            dialogData: this.dialog
        }
    },
    methods: {
      salvar: function () {
        Participante.obterPorId(this.participanteId).then(response => {
          let participante = response.data
          Evento.adicionarParticipante(this.evento.id, participante)
          console.log(participante)
          this.participanteId = ''
          this.dialog = false
        })
      },
      cancelar: function () {
        this.participante = { id: '', nome: '' }
        this.dialog = false
      },
    },
      mounted: function () {
        Participante.listar().then(resp => {
          this.participantes = resp.data
        })
    }
}
</script>

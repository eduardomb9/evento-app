<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
      </template>
      <v-card>
        <v-card-title>Evento: {{ evento.nome }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-text-field required v-model="participante.nome"  placeholder="Nome"/>
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
        dialog: Boolean,
        evento: Object
    },
    data() {
        return {
            participanteId: '',
            participante: { id: '', nome: '' },
            participantes: {},
            dialogData: this.dialog
        }
    },
    methods: {
      salvar: function () {
        console.log(this.participante)
        Participante.adicionar(this.participante).then(response => {
          console.log(response)
          Evento.adicionarParticipante(this.evento.id, this.participante).then(resp => {
            this.participanteId = ''
            this.participante = { id: '', nome: '' }
            this.dialog = false
          })
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

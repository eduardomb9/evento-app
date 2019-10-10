<style scoped>
h3 {
  text-align: center;
  margin-top: 30px;
}
</style>
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog2" scrollable max-width="300px">
      <v-card>
        <v-card-title>{{ evento.nome }}</v-card-title>
        <v-divider></v-divider>
        <h3>Novo Participante:</h3>
        <v-card-text style="height: 300px;">
          <v-text-field required v-model="participante.nome"  placeholder="Nome"/>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="cancelar">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="adicionar">Adicionar</v-btn>
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
    computed: {
      dialog2: {
        get: function () {
          return this.dialog
        },
        set: function (value) {
          if ( this.dialog ) {
            this.$emit('fechar-dialog')
          }
        }
      }
    },
    data() {
        return {
            participanteId: '',
            participante: { id: '', nome: '' },
            participantes: {},
        }
    },
    methods: {
      adicionar: function () {
        Evento.adicionarParticipante(this.evento.id, this.participante)
        .then(resp => {
          this.participanteId = ''
          this.participante = { id: '', nome: '' }
          this.dialog2 = false
        })
      },
      cancelar: function () {
        this.participante = { id: '', nome: '' }
        this.dialog2 = false
      },
    },
      mounted: function () {
        Participante.listar().then(resp => {
          this.participantes = resp.data
        })
    }
}
</script>

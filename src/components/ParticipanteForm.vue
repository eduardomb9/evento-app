<template>
  <v-form v-if="editando" class="container" ref="form">
      <h2> Editar Participante </h2>
      <div class="row col-8">
      <v-text-field class="col-6" required v-model="participante.nome" placeholder="Nome" />
      </div>
      <div style="float: right">
        <v-btn aria-label="salvar editando participante"  @click="salvar">Salvar</v-btn>
        <v-btn aria-label="cancelar editanto participante" @click="cancelar">Cancelar</v-btn>
      </div>
    </v-form>
</template>
<script>

import Participante from '../service/participantes'

export default {
    name: 'ParticipanteForm',
    props: {
      participante: Object,
      editando: Boolean,
    },
    data() {
        return {
        }
    },
    methods: {
      salvar: function () {
        Participante.editar(this.participante).then(resp => {
          this.$emit('finalizar-edicao', ['Participante editado com sucesso.'])
        })
      },
      cancelar: function () {
        this.$emit('finalizar-edicao')
      },
    },
}
</script>

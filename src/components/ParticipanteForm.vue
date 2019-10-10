<template>
  <v-form class="container" ref="form">
      <h2> Cadastrar Participante </h2>
      <div class="row col-8">
      <v-text-field class="col-6" required v-model="participante.nome" placeholder="Nome" />
      </div>
      <div style="float: right">
        <v-btn v-if="!editando" @click="adicionar">Adicionar</v-btn>
        <v-btn v-else @click="salvar">Salvar</v-btn>
        <v-btn v-show="editando" @click="cancelar">Cancelar</v-btn>
      </div>
    </v-form>
</template>
<script>

import Participante from '../service/participantes'

export default {
    name: 'ParticipanteForm',
    props: {
    },
    data() {
        return {
            participante: { id: '', nome: '' },
            editando: false,
        }
    },
    methods: {
      adicionar: function () {
        
      },
      salvar: function () {
      },
      cancelar: function () {
        this.participante = { id: '', nome: '' }
        this.editando = false
      },
    },
}
</script>

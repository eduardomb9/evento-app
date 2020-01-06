<style>
#espaco {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
<template>
  <div
    id="participante-table"
    class="container"
  >
    <v-data-table
      :headers="headers"
      :items="participantes"
      :items-per-page="5"
      class="elevation-1"
      dark
      fixed-header
      height="288px"
    >
      <template v-slot:item.acao="{ item }">
        <button
          aria-label="deletar participante"
          type="button"
          @click="deletar(item.id)"
        >
          <v-icon color="dark">mdi-delete</v-icon>
        </button>
        <button
          aria-label="editar participante"
          type="button"
          @click="editar(item)"
        >
          <v-icon color="dark">mdi-pencil</v-icon>
        </button>
      </template>
    </v-data-table>

    <v-divider id="espaco" />

    <ParticipanteForm
      :participante="participanteEdit"
      :editando="mostraEditando"
      @finalizar-edicao="finalizaEdicao"
    />
  </div>
</template>

<script>
import Participante from '../service/participantes'
import ParticipanteForm from '../components/ParticipanteForm.vue'

export default {
  name: 'participante-table',
  components: {
    ParticipanteForm
  },
  data: function () {
    return {
      headers: [
        { text: 'Código', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Ações', value: 'acao' }
      ],
      participantes: [
      ],
      participanteEdit: { id: '', nome: '' },
      mostraEditando: false
    }
  },
  methods: {
    deletar: function (id) {
      Participante.remover(id)
        .then(response => {
          this.participantes = this.participantes.filter(val => val.id !== id)
          this.mostraMensagem(['Participante deletado com sucesso'])
        })
        .catch(e => {
          alert(e)
        })
    },
    editar: function (participante) {
      this.participanteEdit = participante
      this.mostraEditando = true
    },
    finalizaEdicao: function (msg) {
      this.mostraEditando = false
      if (msg) {
        this.mostraMensagem(msg)
      }
    },
    mostraMensagem: function (msgs) {
      this.$emit('emitir-snackbar', msgs)
    }
  },
  mounted: function () {
    Participante.listar().then(resp => {
      this.participantes = resp.data
    })
  }
}
</script>

<style>
#espaco {
  margin-top: 20px;
  margin-bottom: 20px;
  /* comentario adicionado */
}
.vdatetime-input {
  width: 100%;
  height: 32px;
  margin-top: 17px;
  border-bottom: 1px solid gray;
}
.overlay {
  /* position: absolute; */
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
}
.grupo-botoes {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.grupo-botoes button {
  margin-left: 1%;
}
.v-skeleton-loader__image {
  height: 100%;
}
</style>

<template>
  <div
    id="eventoTable"
    class="container"
  >
    <v-skeleton-loader
      v-if="!loaded"
      class="mx-auto"
      height="288px"
      type="image"
    ></v-skeleton-loader>
    <div v-else>
      <v-simple-table
        dark
        fixed-header
        height="288px"
      >
        <thead>
          <th>Id</th>
          <th>Nome</th>
          <th>Data Inicio</th>
          <th>Data Fim</th>
          <th>Lat</th>
          <th>Long</th>
          <th>Tipo Evento</th>
          <th>Ações</th>
        </thead>
        <tbody>
          <tr
            v-for="val in eventos"
            :key="val.id"
          >
            <td
              v-for="(data, i) in val"
              :key="i"
            >
              <span v-if="i.toString().includes('tipo')">{{ data.descricao }}</span>
              <span v-else-if="i.toString().includes('inicio')">{{ data | formatarData }}</span>
              <span v-else-if="i.toString().includes('fim')">{{ data | formatarData }}</span>
              <span v-else>{{ data }}</span>
            </td>
            <td>
              <button
                aria-label="remover evento"
                type="button"
                @click="remover(val.id)"
              >
                <v-icon color="dark">mdi-delete</v-icon>
              </button>
              <button
                aria-label="editar evento"
                type="button"
                @click="editar(val)"
              >
                <v-icon color="dark">mdi-pencil</v-icon>
              </button>
              <button
                aria-label="adicionar participante"
                type="button"
                @click="$emit('add-participante', val)"
              >
                <v-icon color="dark">mdi-plus</v-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn
        aria-label="adicionar evento"
        class="mx-2 float-right"
        style="margin-top: -20px"
        fab
        dark
        color="indigo"
        @click="mostraFormularioAdicionar"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </div>

    <v-form
      v-show="mostraFormulario"
      class="container"
      ref="form"
    >
      <v-divider id="espaco" />
      <h2 v-if="!editando"> Cadastrar Evento </h2>
      <h2 v-else> Editar Evento </h2>
      <v-text-field
        :rules="regras.nome"
        required
        v-model="evento.nome"
        placeholder="Nome"
      />
      <v-autocomplete
        id="campoTipoEvento"
        :items="tiposEventos"
        placeholder="Tipo do Evento"
        v-model="evento.tipoEvento.id"
        item-text="descricao"
        item-value="id"
        @change="atualizarTextoTabela(evento.tipoEvento.id)"
      >
      </v-autocomplete>
      <datetime
        placeholder="Data/Hora do Inicio do Evento"
        type="datetime"
        v-model="evento.inicio"
        format="dd/MM/yyyy HH:mm:ss"
        value-zone="America/Fortaleza"
        label="Inicio do Evento"
      >
      </datetime>
      <datetime
        placeholder="Data/Hora do Fim do Evento"
        type="datetime"
        v-model="evento.fim"
        format="dd/MM/yyyy HH:mm:ss"
        value-zone="America/Fortaleza"
        style="margin-top: 21px;"
        label="Fim do Evento"
      >
      </datetime>
      <div class="grupo-botoes">
        <v-btn
          label="Adicionar localização"
          aria-label="adicionar localizacao ao evento"
          large
          dark
          @click="$emit('dialog-map', true)"
        >
          <v-icon color="dark">mdi-map-marker-plus</v-icon>
        </v-btn>
        <v-btn
          aria-label="confirmar adicionar evento"
          large
          v-if="!editando"
          @click="adicionar"
        >Adicionar</v-btn>
        <v-btn
          aria-label="salvar alteracoes evento"
          large
          v-else
          @click="salvar"
        >Salvar</v-btn>
        <v-btn
          aria-label="cancelar acao do evento"
          large
          @click="cancelar"
        >Cancelar</v-btn>
      </div>
      <div style="display: block; clear: both"></div>
    </v-form>

    <DialogConfirm
      :dialog="dialogConfirm"
      @confirm="excluir"
      @cancel="cancelar"
    />

    <ParticipantesList
      v-show="!!participantes.length"
      :participantes="participantes"
    />

  </div>
</template>

<script>
import Evento from '../service/eventos'
import TipoEvento from '../service/tiposeventos'
import ParticipantesList from './ParticipantesList'
import DialogConfirm from './DialogConfirm'

export default {
  name: 'EventoTable',
  props: {
    coordenadas: Array
  },
  components: {
    ParticipantesList,
    DialogConfirm
  },
  computed: {
  },
  data: function () {
    return {
      coordenadasCopia: [],
      dialogConfirm: false,
      dialogMapa: false,
      editando: false,
      menuini: false,
      menufim: false,
      eventos: [],
      tiposEventos: [],
      eventoCopia: { id: '', nome: '', inicio: '', fim: '', tipoEvento: { id: '', descricao: '' }, latitude: '', longitude: '' },
      evento: { id: '', nome: '', inicio: '', fim: '', tipoEvento: { id: '', descricao: '' }, latitude: '', longitude: '' },
      participantes: [],
      messages: [],
      regras: {
        nome: [
          value => !!value || 'Campo obrigatorio.',
          value => (value.length || '') >= 3 || 'Mínimo de 3 caracteres.'
        ]
      },
      mostraFormulario: false,
      loaded: false
    }
  },
  methods: {
    remover: function (id) {
      this.eventoCopia.id = id
      this.dialogConfirm = true
    },
    excluir: function () {
      let id = this.eventoCopia.id
      Evento.remover(id).then(resp => {
        this.eventos = this.eventos.filter(val => val.id !== id)
        this.messages.push('Evento removido com sucesso.')
      }).catch(e => {
        this.messages.push('Erro ao remover o evento. Verifique se o evento têm participantes associados.')
      })
      this.$emit('emitir-snackbar', this.messages)
      this.dialogConfirm = false
      this.eventoCopia.id = ''
    },
    editar: function (evento) {
      Evento.obterParticipantesPorId(evento.id).then(
        response => {
          this.participantes = response.data
        }
      )

      this.coordenadasCopia[0] = evento.latitude
      this.coordenadasCopia[1] = evento.longitude
      if (this.coordenadasCopia[0] == null) {
        this.coordenadasCopia[0] = ''
        this.coordenadasCopia[1] = ''
      }
      this.$emit('alterar-coordenadas', this.coordenadasCopia)
      this.eventoCopia.id = evento.id
      this.eventoCopia.nome = evento.nome
      this.eventoCopia.tipoEvento = evento.tipoEvento
      this.eventoCopia.inicio = evento.inicio
      this.eventoCopia.fim = evento.fim
      this.evento = evento
      this.editando = true
      this.mostraFormulario = true
      this.$refs.form.resetValidation()
    },
    salvar: function () {
      this.evento.latitude = this.coordenadas[0]
      this.evento.longitude = this.coordenadas[1]
      Evento.editar(this.evento)
        .then(resp => {
          this.messages.push('Alteração realizada com sucesso.')
          this.$emit('emitir-snackbar', this.messages)
        })
      this.limpar()
    },
    cancelar: function () {
      this.evento.latitude = this.coordenadasCopia[0]
      this.evento.longitude = this.coordenadasCopia[1]
      this.evento.id = this.eventoCopia.id
      this.evento.nome = this.eventoCopia.nome
      this.evento.tipoEvento = this.eventoCopia.tipoEvento
      this.evento.inicio = this.eventoCopia.inicio
      this.evento.fim = this.eventoCopia.fim
      this.limpar()
    },
    mostraFormularioAdicionar: function () {
      if (this.editando === true) {
        this.cancelar()
      }
      this.mostraFormulario = true
    },
    adicionar: function () {
      this.messages = []

      if (!this.evento.nome) {
        this.messages.push('Campo nome é obrigatorio.')
        this.$emit('emitir-snackbar', this.messages)
        return
      } else if (this.evento.nome.length < 3) {
        this.messages.push('Campo nome deve ser maior que 2.')
        this.$emit('emitir-snackbar', this.messages)
        return
      }

      if (!this.evento.tipoEvento.descricao) {
        this.messages.push('Campo tipo de evento é obrigatorio.')
        this.$emit('emitir-snackbar', this.messages)
        return
      }

      if (!this.coordenadas[0]) {
        console.log('Evento sem localizacao')
        this.messages.push('Localização do evento é obrigatório.')
        this.$emit('emitir-snackbar', this.messages)
        return
      }

      this.evento.latitude = this.coordenadas[0]
      this.evento.longitude = this.coordenadas[1]

      Evento.adicionar(this.evento)
        .then(response => {
          this.eventos.push(response.data)
          this.messages.push('Evento adicionado com sucesso')
        })
        .catch(e => {
          this.messages.push('Erro geral contate administração!')
        })

      this.$emit('emitir-snackbar', this.messages)
      this.limpar()
    },
    limpar: function () {
      this.evento = { id: '', nome: '', inicio: '', fim: '', tipoEvento: { id: '', descricao: '' }, latitude: '', longitude: '' }
      this.editando = false
      this.participantes = []
      this.dialogConfirm = false
      this.mostraFormulario = false
      this.$refs.form.resetValidation()
      this.$emit('dialog-map', false)
      this.$emit('alterar-coordenadas', [])
    },
    atualizarTextoTabela: function (id) {
      this.tiposEventos.forEach(item => {
        if (item.id === id) {
          this.evento.tipoEvento.descricao = item.descricao
        }
      })
    }
  },
  filters: {
    formatarData: function (value) {
      if (!value) return ''
      value = value.toString()
      let dataHora = value.split('T')
      dataHora[0] = dataHora[0].split('-').reverse().join('/')
      return dataHora[0] + ' ' + dataHora[1]
    }
  },
  mounted: async function () {
    this.loaded = false
    await Evento.listar().then(response => {
      this.eventos = response.data
    })
    await TipoEvento.listar().then(response => {
      this.tiposEventos = response.data
    })
    this.loaded = true
  }
}
</script>

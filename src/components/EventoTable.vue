<style>
#espaco {
  margin-top: 40px;
  margin-bottom: 40px;
  /* comentario adicionado */
}
</style>

<template>
  <div id="eventoTable" class="container">
    <v-simple-table dark fixed-header height="288px">
      <thead>
        <th>Id</th>
        <th>Nome</th>
        <th>Data Inicio</th>
        <th>Data Fim</th>
        <th>Tipo Evento</th>  
        <th>Ações</th>
      </thead>
      <tbody>
        <tr v-for="val in eventos" :key="val.id">
          <td v-for="(data, i) in val" :key="i">
            <span v-if="i.toString().includes('tipo')">{{ data.descricao }}</span>
            <span v-else-if="i.toString().includes('inicio')">{{ data | formatarData }}</span>
            <span v-else-if="i.toString().includes('fim')">{{ data | formatarData }}</span>
            <span v-else>{{ data }}</span>
          </td>
          <td>
            <button type="button" @click="remover(val.id)"><v-icon color="dark">mdi-delete</v-icon></button>
            <button type="button" @click="editar(val)"><v-icon color="dark">mdi-pencil</v-icon></button>
            <button type="button" @click="$emit('add-participante', val)"><v-icon color="dark">mdi-plus</v-icon></button>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    
    <v-divider id="espaco" />

    <v-form class="container" ref="form">
      <h2> Cadastrar Evento </h2>
      <div class="row">
        <div class="col-6">
          <v-text-field :rules="regras.nome" required v-model="evento.nome" placeholder="Nome" />
          <v-select :items="tiposEventos" placeholder="Tipo do Evento" v-model="evento.tipoEvento.id" item-text="descricao" item-value="id" @change="atualizarTextoTabela(evento.tipoEvento.id)">
          </v-select>
          <div class="float-right">
            <v-btn v-if="!editando" @click="adicionar">Adicionar</v-btn>
            <v-btn v-else @click="salvar">Salvar</v-btn>
            <v-btn v-show="editando" @click="cancelar">Cancelar</v-btn>
          </div>
        </div>
        <div class="col-6">
      <v-menu
        ref="menuini"
        v-model="menuini"
        :close-on-content-click="false"
        :return-value.sync="evento.inicio"
        transition="scale-transition"
        offset-y
        min-width="290px"
        >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="evento.inicio"
            label="Inicio do Evento"
            readonly
            v-on="on"
            clearable
          ></v-text-field>
        </template>
        <v-date-picker v-model="evento.inicio" no-title scrollable locale="pt-br">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menuini = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menuini.save(evento.inicio)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        ref="menufim"
        v-model="menufim"
        :close-on-content-click="false"
        :return-value.sync="evento.fim"
        transition="scale-transition"
        offset-y
        min-width="290px"
        >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="evento.fim"
            label="Fim do Evento"
            readonly
            clearable
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="evento.fim" no-title scrollable locale="pt-br">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menufim = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menufim.save(evento.fim)">OK</v-btn>
        </v-date-picker>
      </v-menu>
          <!-- <v-date-picker v-model="evento.inicio"></v-date-picker>
          <v-date-picker v-model="evento.fim"></v-date-picker> -->
        </div>
      </div>
    </v-form>

    <DialogConfirm :dialog="dialogConfirm" @confirm="excluir" @cancel="cancelar" />
    <ParticipantesList v-show="!!participantes.length" :participantes="participantes" />

  </div>
</template>

<script>
import Evento from "../service/eventos";
import TipoEvento from "../service/tiposeventos"
import ParticipantesList from "./ParticipantesList";
import DialogConfirm from "./DialogConfirm"
import { isNullOrUndefined } from "util";

export default {
  name: "EventoTable",
  props: {},
  components: {
    ParticipantesList,
    DialogConfirm
  },
  computed: {
  },
  data: function() {
    return {
      dialogConfirm: false,
      desativado: false,
      editando: false,
      menuini: false,
      menufim: false,
      eventos: [],
      tiposEventos: [],
      eventoCopia: { id: '', nome: '', inicio: '', fim: '', tipoEvento: { id: '', descricao: '' } },
      evento: { id: '', nome: '', inicio: '', fim: '', tipoEvento: { id: '', descricao: '' } },
      participantes: [],
      messages: [],
      regras: {
        nome: [
          value => !!value || "Campo obrigatorio.",
          value => (value.length || "") >= 3 || "Mínimo de 3 caracteres."
        ]
      },
    };
  },
  methods: {
    remover: function(id) {
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
    editar: function(evento) {
      Evento.obterParticipantesPorId(evento.id).then(
        response => {
          this.participantes = response.data;
        }
      );

      this.eventoCopia.id = evento.id;
      this.eventoCopia.nome = evento.nome;
      this.eventoCopia.tipoEvento = evento.tipoEvento
      this.eventoCopia.inicio = evento.inicio
      this.eventoCopia.fim = evento.fim
      this.evento = evento;
      this.editando = true;
      this.desativado = true;
      this.$refs.form.resetValidation();
    },
    salvar: function() {
      Evento.editar(this.evento)
      .then(resp => {
        this.messages.push('Alteração realizada com sucesso.')
        this.$emit('emitir-snackbar', this.messages)
      })

      this.limpar()
    },
    cancelar: function() {
      this.evento.id = this.eventoCopia.id;
      this.evento.nome = this.eventoCopia.nome;
      this.evento.tipoEvento = this.eventoCopia.tipoEvento
      this.limpar()
    },
    adicionar: function() {
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

      Evento.adicionar(this.evento)
      .then(response => {
        this.eventos.push(response.data)
        this.messages.push('Evento adicionado com sucesso')
      })
      .catch(e => {
        this.messages.push('Erro geral contate administração!')
      });
      
      this.$emit('emitir-snackbar', this.messages)
      this.limpar()
    },
    limpar: function() {
      this.evento = { id: '', nome: '', inicio: '', fim: '', tipoEvento: { id: '', descricao: '' } }
      this.editando = false
      this.desativado = false
      this.participantes = []
      this.dialogConfirm = false
      this.$refs.form.resetValidation()
    },
    atualizarTextoTabela: function (id) {
      this.tiposEventos.forEach(item => {
        if (item.id == id) {
          this.evento.tipoEvento.descricao = item.descricao
        }
      })
    },
  },
  filters: {
    formatarData: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('-').reverse().join('/')
    },
  },
  mounted: function() {
    Evento.listar().then(response => {
      this.eventos = response.data;
    })
    TipoEvento.listar().then(response => {  
        this.tiposEventos = response.data
    })
  }
};
</script>

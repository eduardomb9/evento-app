<style>
</style>

<template>
  <div id="eventoTable" class="container">
    <v-simple-table>
      <thead>
        <th>Id</th>
        <th>Nome</th>
        <th>Tipo Evento</th>
        <th>Ações</th>
      </thead>
      <tbody>
        <tr v-for="val in eventos" :key="val.id">
          <td v-for="(data, i) in val" :key="i">
            <span v-if="i.toString().includes('tipo')">{{ data.descricao }}</span>
            <span v-else>{{ data }}</span>
          </td>
          <td>
            <button type="button" @click="remover(val.id)"><v-icon color="primary">mdi-delete</v-icon></button>
            <button type="button" @click="editar(val)"><v-icon color="primary">mdi-pencil</v-icon></button>
            <button type="button" @click="$emit('add-participante', val)"><v-icon color="primary">mdi-plus</v-icon></button>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    
    <v-snackbar :timeout="timeout" v-model="snackbar" v-for="(msg, index) in messages" :key="index" top>
      {{ msg }}
    </v-snackbar>

    <v-form ref="form">
      <v-text-field :rules="regras.nome" required v-model="evento.nome" placeholder="Nome" />
      <v-select :items="tiposEventos" v-model="evento.tipoEvento.id" item-text="descricao" item-value="id" @change="atualizarTextoTabela(evento.tipoEvento.id)">
      </v-select>
      <div style="float: right">
        <v-btn v-if="!editando" @click="adicionar">Adicionar</v-btn>
        <v-btn v-else @click="salvar">Salvar</v-btn>
        <v-btn v-show="editando" @click="cancelar">Cancelar</v-btn>
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
      snackbar: false,
      timeout: 2000,
      desativado: false,
      editando: false,
      eventos: [],
      tiposEventos: [],
      eventoCopia: { id: '', nome: '', tipoEvento: { id: '', descricao: '' } },
      evento: { id: '', nome: '', tipoEvento: { id: '', descricao: '' } },
      participantes: [],
      messages: [],
      regras: {
        nome: [
          value => !!value || "Campo obrigatorio.",
          value => (value.length || "") >= 3 || "Mínimo de 3 caracteres."
        ]
      }
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
        this.snackbar = true
      }).catch(e => {
        this.messages.push('Erro ao remover um evento. Verifique se o evento têm participantes associados.')
        this.snackbar = true
      })
      this.dialogConfirm = false
      this.eventoCopia.id = ''
    },
    editar: function(evento) {
      console.log(evento)
      Evento.obterParticipantesPorId(evento.id).then(
        response => {
          this.participantes = response.data;
        }
      );

      this.eventoCopia.id = evento.id;
      this.eventoCopia.nome = evento.nome;
      this.eventoCopia.tipoEvento = evento.tipoEvento
      this.evento = evento;
      this.editando = true;
      this.desativado = true;
      this.$refs.form.resetValidation();
    },
    salvar: function() {
      Evento.editar(this.evento)
      .then(resp => {
        this.messages.push('Alteração realizada com sucesso.')
        this.snackbar = true
      })

      this.evento = { id: '', nome: '', tipoEvento: { id: '', descricao: '' } };
      this.editando = false;
      this.desativado = false;
      this.participantes = [];
      this.$refs.form.resetValidation();
    },
    cancelar: function() {
      this.evento.id = this.eventoCopia.id;
      this.evento.nome = this.eventoCopia.nome;
      this.evento.tipoEvento = this.eventoCopia.tipoEvento
      this.evento = { id: '', nome: '', tipoEvento: { id: '', descricao: '' } };
      this.editando = false;
      this.desativado = false;
      this.participantes = [];
      this.dialogConfirm = false
      this.$refs.form.resetValidation();
    },
    adicionar: function() {
      this.messages = []

      if (!this.evento.nome) {
          this.messages.push('Campo nome é obrigatorio.')
          this.snackbar = true
          return
      } else if (this.evento.nome.length < 3) {
          this.messages.push('Campo nome deve ser maior que 2.')
          this.snackbar = true
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
      
      this.snackbar = true
      this.evento = { id: '', nome: '', tipoEvento: { id: '', descricao: '' } }
      this.$refs.form.resetValidation();
    },
    atualizarTextoTabela: function (id) {
      this.tiposEventos.forEach(item => {
        if (item.id == id) {
          this.evento.tipoEvento.descricao = item.descricao
        }
      })
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

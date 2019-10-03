<style>
#espaco {
  margin-top: 40px;
}
</style>

<template>
  <div id="eventoTable" class="container">
    <v-simple-table>
      <thead>
        <th>Id</th>
        <th>Nome</th>
        <th>Ações</th>
      </thead>
      <tbody>
        <tr v-for="val in eventos" :key="val.id">
          <td v-for="data in val" :key="data">{{ data }}</td>
          <td>
            <button type="button" @click="remover(val.id)"><v-icon color="primary">mdi-delete</v-icon></button>
            <button type="button" @click="editar(val)"><v-icon color="primary">mdi-pencil</v-icon></button>
            <button type="button" @click="$emit('add-participante', val)"><v-icon color="primary">mdi-plus</v-icon></button>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <div id="espaco" />
    <p v-if="erros.length">
      <b>Os seguintes erros foram encontrados:</b>
    </p>
    <v-list>
      <v-list-item-content v-for="error in erros" :key="error">
        <v-list-item>{{ error }}</v-list-item>
      </v-list-item-content>
    </v-list>
    <v-form ref="form">
      <v-text-field :rules="regras.nome" required v-model="evento.nome" placeholder="Nome" />
      <div style="float: right">
        <v-btn v-if="!editando" @click="adicionar">Adicionar</v-btn>
        <v-btn v-else @click="salvar">Salvar</v-btn>
        <v-btn v-show="editando" @click="cancelar">Cancelar</v-btn>
      </div>
    </v-form>

    <ParticipantesList v-show="editando" :participantes="participantes" />
    
  </div>
</template>

<script>
import Evento from "../service/eventos";
import ParticipantesList from "./ParticipantesList";
import { isNullOrUndefined } from "util";

export default {
  name: "EventoTable",
  props: {},
  components: {
    ParticipantesList
  },
  data: function() {
    return {
      desativado: false,
      editando: false,
      eventos: [],
      eventoCopia: { id: "", nome: "" },
      evento: { id: "", nome: "" },
      participantes: [],
      erros: [],
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
      Evento.remover(id);
      this.eventos = this.eventos.filter(val => val.id !== id);
    },
    editar: function(evento) {
      let participantes = Evento.obterParticipantesPorId(evento.id).then(
        response => {
          this.participantes = response.data;
        }
      );

      this.eventoCopia.id = evento.id;
      this.eventoCopia.nome = evento.nome;
      this.evento = evento;
      this.editando = true;
      this.desativado = true;
      this.$refs.form.resetValidation();
    },
    salvar: function() {
      Evento.editar(this.evento);
      this.evento = { id: "", nome: "" };
      this.editando = false;
      this.desativado = false;
      this.participantes = [];
      this.$refs.form.resetValidation();
    },
    cancelar: function() {
      this.evento.id = this.eventoCopia.id;
      this.evento.nome = this.eventoCopia.nome;
      this.evento = { id: "", nome: "" };
      this.editando = false;
      this.desativado = false;
      this.participantes = [];
      this.$refs.form.resetValidation();
    },
    adicionar: function() {
      this.erros = []

      if (!this.evento.nome) {
          this.erros.push('Campo nome é obrigatorio.')
          return
      } else if (this.evento.nome.length < 3) {
          this.erros.push('Campo nome deve ser maior que 2.')
          return
      }

      Evento.adicionar(this.evento)
        .then(response => {
          this.eventos.push(response.data);
        })
        .catch(e => {
          this.erros.push('Erro geral contate administração!')
        });
        this.evento = { id: '', nome: '' };
        this.$refs.form.resetValidation();
    },
  },
  mounted: function() {
    Evento.listar().then(response => {
      this.eventos = response.data;
    });
  }
};
</script>

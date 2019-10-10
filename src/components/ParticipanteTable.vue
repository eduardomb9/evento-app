<template>
    <div id="participante-table">
        <v-data-table
        :headers="headers"
        :items="participantes"
        :items-per-page="5"
        class="elevation-1"
        >
            <template v-slot:item.acao="{ item }">
                <button type="button" @click="deletar(item.id)"><v-icon color="primary">mdi-delete</v-icon></button>
                <button type="button" @click="editar(item)"><v-icon color="primary">mdi-pencil</v-icon></button>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">

import Participante from '../service/participantes'
import participantes from '../service/participantes'

export default {
    name: 'participante-table',
    data: function () {
        return {
            headers: [
                { text: 'Código', value: 'id' },
                { text: 'Nome', value: 'nome' },
                { text: 'Ações', value: 'acao' },
            ],
            participantes: [
            ],
        }
    },
    methods: {
        deletar: function(id) {
            Participante.remover(id)
            .then(response => {
                this.participantes = this.participantes.filter(val => val.id != id)
            })
            .catch(e => {
                alert(e)
            })
        },
        editar: function(participante) {
            alert('Editar Participante: ' + participante.nome)
        },
    },
    mounted: function () {
        Participante.listar().then(resp => {
          this.participantes = resp.data
        })
    },
}
</script>

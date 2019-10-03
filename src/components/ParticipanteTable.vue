<template>
    <div id="participante-table">
        <v-data-table
        :headers="headers"
        :items="participantes"
        :items-per-page="5"
        class="elevation-1"
        >
        <td>
            <button type="button" @click="remover(val.id)"><v-icon color="primary">mdi-delete</v-icon></button>
            <button type="button" @click="editar(val)"><v-icon color="primary">mdi-pencil</v-icon></button>
            <button type="button" @click="$emit('add-participante', val)"><v-icon color="primary">mdi-plus</v-icon></button>
        </td>

        </v-data-table>
    </div>
</template>

<script lang="ts">

import Participante from '../service/participantes'

export default {
    name: 'participante-table',
    data: function () {
        return {
            headers: [
                { text: 'Código', value: 'id' },
                { text: 'Nome', value: 'nome' },
            ],
            participantes: [
            ]
        }
    },
    mounted: function () {
        Participante.listar().then(resp => {
          this.participantes = resp.data
        })
    }
}
</script>
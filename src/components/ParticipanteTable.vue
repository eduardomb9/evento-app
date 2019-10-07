<template>
    <div id="participante-table">
        <v-data-table
        :headers="headers"
        :items="participantes"
        :items-per-page="5"
        class="elevation-1"
        >
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
            ],
        }
    },
    mounted: function () {
        Participante.listar().then(resp => {
          this.participantes = resp.data
        })
    }
}
</script>

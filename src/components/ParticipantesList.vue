<template>
  <div class="container">
      <h3>LISTA DE PARTICIPANTES: </h3>
    <v-list v-for="part in participantes" :key="part.id">
            <v-list-item-content>
                <v-list-item-title v-text="part.nome"></v-list-item-title>
            </v-list-item-content>
    </v-list>
  </div>
</template>

<script>
import Participante from '../service/participantes'

export default {
    name: 'ParticipantesList',
    props: {
        participantes: Array,
    },
}
</script>

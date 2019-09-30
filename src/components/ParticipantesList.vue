<template>
  <div class="container">
      <h3>LISTA DE PARTICIPANTES</h3>
    <ul v-for="part in participantes" :key="part.id">
        <li>
            {{ part.nome }}
        </li>
    </ul>
  </div>
</template>

<script>
import Participante from '../service/participantes'

export default {
    name: 'ParticipantesList',
    props: {
        participantes: Array,
    },
    data: function () {
        return {
        }
    },
    methods: {
        clicou: function() {
            console.log('Clicou na lista de participantes!')
        }
    },
}
</script>

<style>

</style>
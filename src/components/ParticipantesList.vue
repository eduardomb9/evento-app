<template>
  <div class="container">
    <h3> </h3>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>LISTA DE PARTICIPANTES:</v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="part in participantes"
          :key="part.id"
        >
          {{ part.nome }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'ParticipantesList',
  props: {
    participantes: Array
  }
}
</script>

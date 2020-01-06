<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Remover: {{ nomeEvento }}</v-card-title>
      <v-card-text>Tem certeza que deseja remover o evento?</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn
          aria-label="cancelar deletar evento"
          color="green darken-1"
          text
          @click="$emit('cancel')"
        >Cancelar</v-btn>
        <v-btn
          aria-label="confirmar deletar evento"
          color="green darken-1"
          text
          @click="$emit('confirm')"
        >Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'DialogConfirm',
  props: {
    dialog: Boolean,
    nomeEvento: Object
  }
}
</script>

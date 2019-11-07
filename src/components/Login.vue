<template>
    <v-container>
        <v-text-field label="Usuário" v-model="user" />
        <v-text-field label="Senha" type="password" v-model="password" />
        <v-btn @click="cancelar">Cancelar</v-btn>
        <v-btn @click="logar()">Enviar</v-btn>
    </v-container>
</template>
<script>
import Auth from '../service/auth'

export default {
    data: function (){
        return {
            user: '',
            password: '',
            messages: [],
        }
    },
    methods: {
        logar: function () {
            let token = ''
            Auth.logar(this.user, this.password).then(response => {
                if (response.data.token) {
                    localStorage.token = response.data.token
                }
                this.cancelar()
                window.location.reload()
            }).catch(error => {
                this.messages.push('Usuário e senha informados são inválidos. Verifique as credenciais.')
                this.$emit('emitir-snackbar', this.messages)
            })
        },
        cancelar: function() {
            this.user = ''
            this.password = ''
            this.messages = []
        },
    },
}
</script>

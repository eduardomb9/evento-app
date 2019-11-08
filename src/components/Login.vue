<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="dark"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-icon></v-icon>
                    <v-text-field
                        autofocus
                        label="Usuário"
                        name="usuario"
                        prepend-icon="mdi-login"
                        type="text"
                        v-model="user"
                        @keyup.enter="focusPassword"
                    />
                    <v-text-field
                        ref="password"
                        label="Senha"
                        name="senha"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        @keyup.enter="logar"
                    />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="secondary" @click="logar">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
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
                    sessionStorage.token = response.data.token
                }
                this.cancelar()
                window.location.reload()
            }).catch(error => {
                this.messages.push('Usuário e senha informados são inválidos. Verifique as credenciais.')
                this.$emit('emitir-snackbar', this.messages)
                this.password = ''
            })
        },
        cancelar: function() {
            this.user = ''
            this.password = ''
            this.messages = []
        },
        focusPassword: function() {
          this.$refs.password.focus()
        },
    },
    directives: {
      focus: {
        // definição da diretiva
        inserted: function (el) {
          el.focus()
        }
      },
    },
}
</script>

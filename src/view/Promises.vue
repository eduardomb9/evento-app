<template>
    <v-container id="promessa">
        <h2>Tentando estudar promises.</h2>
        <v-form>
            <v-text-field v-model="nomeParticipante" label="Participante" />
            <span>{{ nomeParticipante }}</span><br>
            <v-btn @click="hello()">Olá</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import Participante from '../service/participantes'
import { async } from 'q'

export default {
    data: function() {
        return {
            nomeParticipante: 'init'
        }
    },
    methods: {
        hello: function () {
            // Implementacao usando CALLBACK FUNC
            const fetchData = (valor, callback) => {
                const dado = setTimeout(() => { 
                    valor += 10 
                    callback(valor)
                }, 500)
            }
            const printar = dado => console.log('Aqui está o dado: ' + dado)
            
            fetchData(70, printar)
            
            // PROMISES
            const val = 10
            const fetchData2 = val => new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() < 0.1) {
                        reject("Erro ao obter valor")
                    } else {
                        resolve(val + 10)
                    }
                }, 500)
            })
            
            fetchData2(20).then(retorno => printar(retorno)).catch(err => {
                console.log('Erro 1: ' + err)
            })

            // ASYNC AWAIT
            const ret = async (val) => {
                try {
                    const asd = await fetchData2(val)
                    printar(asd)
                } catch (error) {
                    console.log('Erro async/await: ' + error)
                }
            }

            ret(18)
        },
    }
}
</script>
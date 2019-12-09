<template>
    <v-container id="promessa">
        <h2>Tentando estudar promises.</h2>
        <v-form>
            <v-text-field v-model="idParticipante" label="Participante" />
            <span>{{ nomeParticipante }}</span><br>
            <v-btn aria-label="teste" @click="hello()">Obter Participante</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import Participante from '../service/participantes'

export default {
    data: function() {
        return {
            nomeParticipante: 'init',
            idParticipante: 1
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
            
            // fetchData(70, printar)
            
            // PROMISES
            const val = 10
            const fetchData2 = vl => new Promise((resolve, reject) => {
                let participante = { id: '', nome: '' }
                Participante.obterPorId(vl).then(response => {
                    participante = response.data
                    if (!participante.nome) {
                        reject("Erro ao obter participante")
                    } else {
                        resolve(participante.nome)
                    }
                })
            })
            
            // fetchData2(20).then(retorno => printar(retorno)).catch(err => {
            //     console.log('Erro 1: ' + err)
            // })

            // ASYNC AWAIT
            const obterNomesParticipanteEProxPorId = async (val) => {
                try {
                    const asd = await fetchData2(val)
                    const asd2 = await fetchData2(val + 1)
                    return (asd + ', ' + asd2)
                } catch (error) {
                    console.log('Erro async/await: ' + error)
                }
            }

            console.log('OLAOLA1')
            
            obterNomesParticipanteEProxPorId(Number.parseInt(this.idParticipante)).then(retorno => {
                console.log(retorno)
            })
            
            console.log('OLAOLA2')
        },
    }
}
</script>

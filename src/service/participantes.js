import { http } from './config'

const url = 'api/participante'

export default {

  listar: () => {
    return http.get(url + '/')
  },

  obterPorId: (id) => {
    return http.get(url + '/' + id)
  },

  adicionar: (participante) => {
    return http.post(url + '/', {
        id: participante.id,
        nome: participante.nome,
        evento: participante.evento
    })
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
  },

  remover: (id) => {
    return http.delete(url + '/' + id)
      .then(response => {
        console.log(response)
      })
      .then(error => {
        console.log(error)
      })
  },

  editar:  (participante) => {
    return http.put(url + '/' + participante.id, participante)
      .then(response => {
        console.log('Editando participante de id: ' + participante.id)
      })
      .then(error => {
        console.log(error)
      })
  }

}

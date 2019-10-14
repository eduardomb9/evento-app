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
  },

  remover: (id) => {
    return http.delete(url + '/' + id)
  },

  editar:  (participante) => {
    return http.put(url + '/' + participante.id, participante)
  }

}

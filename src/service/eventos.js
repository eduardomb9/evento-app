import { http } from './config'


const url = 'api/evento'

export default {

  listar: () => {
    return http.get(url + '/')
  },

  obterPorId: id => {
    return http.get(url + '/' + id)
  },

  obterParticipantesPorId: idEvento => {
    return http.get(url + '/' + idEvento + '/participante')
  },

  adicionarParticipante: (idEvento, participante ) => {
    return http.post(url + '/' + idEvento + '/participante', participante)
  },

  adicionar: (evento) => {
    let resultado = {}
    return http.post(url + '/', {
      id: evento.id,
      nome: evento.nome
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

  editar:  (evento) => {
    return http.put(url + '/' + evento.id, evento)
      .then(response => {
        console.log('Editando evento de id: ' + evento.id)
      })
      .then(error => {
        console.log(error)
      })
  }

}

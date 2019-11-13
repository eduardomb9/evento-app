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
    evento.inicio = evento.inicio.replace('.000-03:00', '')
    evento.fim = evento.fim.replace('.000-03:00', '')

    return http.post(url + '/', {
      id: evento.id,
      nome: evento.nome,
      inicio: evento.inicio,
      fim: evento.fim,
      tipoEvento: {
        id: evento.tipoEvento.id,
        descricao: evento.tipoEvento.descricao
      }
    })
  },

  remover: (id) => {
    return http.delete(url + '/' + id)
  },

  editar: (evento) => {
    evento.inicio = evento.inicio.replace('.000-03:00', '')
    evento.fim = evento.fim.replace('.000-03:00', '')

    return http.put(url + '/' + evento.id, evento)
  }

}

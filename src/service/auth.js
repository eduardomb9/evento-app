import { http } from './config'

export default {
  logar: function (user, password) {
    let authRequest = { username: user, password: password }
    return http.post('/authenticate', authRequest)
  }
}

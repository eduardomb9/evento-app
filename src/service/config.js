import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8080/'
})

http.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (!!error.response || error.response.status === 401) {
    window.location = '#/'
  }

  return Promise.reject(error)
})

export default http

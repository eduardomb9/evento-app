import Vue from 'vue'
import App from './App.vue'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import vuetify from './plugins/vuetify'
import router from './router'
import './registerServiceWorker'

Vue.use(Datetime)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './views/Home.vue'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$hostname = 'http://localhost:4242'

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$hostname = 'http://localhost:4242'

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')

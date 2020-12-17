import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'

import * as network from './utils/network.js'
import ElementUI from 'element-ui'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false
Vue.prototype.$network = network

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

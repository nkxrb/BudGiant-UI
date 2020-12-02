import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../packages/style/my-element-ui.scss';
import budAxios from '../packages/utils/axios.js';

Vue.config.productionTip = false;
Vue.prototype.budAxios = budAxios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

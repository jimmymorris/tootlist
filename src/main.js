import Vue from 'vue';
import { Howl, Howler } from 'howler';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Vue.use(Howl);
// Vue.use(Howler);

Vue.prototype.$howl = Howl;
Vue.prototype.$howler = Howler;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#tootlist');

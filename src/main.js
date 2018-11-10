import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-126950730-1',
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

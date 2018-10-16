import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playing: false,
  },
  getters: {
    isPlaying: state => state.playing,
  },
  mutations: {
    pausePlaying(state) {
      state.playing = false;
    },
    startPlaying(state) {
      state.playing = true;
    },
  },
  actions: {
    pausePlaying({ ...context }) {
      context.commit('pausePlaying');
    },
    startPlaying({ ...context }) {
      context.commit('startPlaying');
    },
  },
});

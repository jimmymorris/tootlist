import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playing: false,
    currentMixtape: {},
    currentTrackList: [],
    currentCover: '',
    mixtapes: [{
      id: 0,
      name: 'Estivated',
      info: '/mixtapes/estivated/estivated.json',
    }, {
      id: 1,
      name: 'Recrudesce',
      info: '/mixtapes/recrudesce/recrudesce.json',
    }],
  },
  getters: {
    isPlaying: state => state.playing,
    getMixtapes: state => state.mixtapes,
    getCurrentMixtape: state => state.currentMixtape,
    getCurrentTrackList: state => state.currentTrackList,
    getCurrentCover: state => state.currentCover,
  },
  mutations: {
    pausePlaying() {
      this.state.playing = false;
    },
    stopPlaying() {
      this.state.playing = false;
    },
    startPlaying() {
      this.state.playing = true;
    },
    setActiveMixtape(state, mixtape) {
      Object.assign(state.currentMixtape, mixtape);
    },
    setActiveTrackList(state, tracks) {
      this.state.currentTrackList.length = 0;
      this.state.currentTrackList = [...tracks];
    },
    setActiveCover(state, cover) {
      this.state.currentCover = cover;
    },
  },
  actions: {
    pausePlaying({ ...context }) {
      context.commit('pausePlaying');
    },
    startPlaying({ ...context }) {
      context.commit('startPlaying');
    },
    stopPlaying({ ...context }) {
      context.commit('stopPlaying');
    },
    setActiveMixtape({ ...context }, mixtape) {
      context.commit('setActiveMixtape', mixtape);
    },
    setActiveTrackList({ ...context }, tracks) {
      context.commit('setActiveTrackList', tracks);
    },
    setActiveCover({ ...context }, cover) {
      context.commit('setActiveCover', cover);
    },
  },
});

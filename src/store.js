import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sound: new Audio(),
    playing: false,
    currentMixtape: {},
    currentTrackList: [],
    activeQueue: [],
    currentCover: '',
    currentFileDir: '',
    currentTrack: {},
    currentTrackTime: 0,
    currentTrackDuration: 0,
    nextTrackOrder: 0,
    prevTrackOrder: 0,
    repeatOne: false,
    repeatAll: false,
    mixtapes: [{
      id: 0,
      name: 'Estivated',
      info: '/mixtapes/estivated/estivated.json',
      cover: '/mixtapes/estivated/estivated.jpg',
    }, {
      id: 1,
      name: 'Recrudesce',
      info: '/mixtapes/recrudesce/recrudesce.json',
      cover: '/mixtapes/recrudesce/recrudesce.jpg',
    }],
  },
  getters: {
    isPlaying: state => state.playing,
    repeatOne: state => state.repeatOne,
    repeatAll: state => state.repeatAll,
    getMixtapes: state => state.mixtapes,
    getCurrentMixtape: state => state.currentMixtape,
    getCurrentTrackList: state => state.currentTrackList,
    getCurrentTrack: state => state.currentTrack,
    getCurrentCover: state => state.currentCover,
    getCurrentFileDir: state => state.currentFileDir,
    getCurrentTrackDuration: state => state.currentTrackDuration,
    getCurrentTrackTime: state => state.currentTrackTime,
    getActiveQueue: state => state.activeQueue,
    getSound: state => state.sound,
    getNextTrack: state => state.nextTrackOrder,
    getPreviousTrack: state => state.prevTrackOrder,
  },
  mutations: {
    pausePlaying() {
      this.state.sound.pause();
      this.state.playing = false;
    },
    startPlaying() {
      this.state.sound.play();
      this.state.playing = true;
    },
    setCurrentFileDir(state, filepath) {
      Vue.set(this.state, 'currentFileDir', filepath);
    },
    loadSound() {
      this.state.sound.src = `${this.state.currentFileDir}${this.state.currentTrack.filename}`;
    },
    setActiveMixtape(state, mixtape) {
      Vue.set(this.state, 'currentMixtape', mixtape);
      this.dispatch('setCurrentFileDir', mixtape.filepath);
      this.dispatch('setActiveCover', mixtape.cover);
      this.dispatch('setActiveTrackList', mixtape.tracks);
      this.dispatch('setActiveQueue', 0);
    },
    setActiveTrackList(state, tracks) {
      Vue.set(this.state, 'currentTrackList', [...tracks]);
    },
    setActiveQueue(state, starting = 0) {
      const songQueue = [];
      // if (this.repeatAll) {
      if (starting > 0) {
        songQueue.push(...this.state.currentTrackList.slice(starting));
        songQueue.push(...this.state.currentTrackList.slice(0, starting));
      } else {
        songQueue.push(...this.state.currentTrackList);
      }
      // } else {
      //   songQueue.push(...this.state.currentTrackList.slice(starting));
      // }
      Vue.set(this.state, 'activeQueue', [...songQueue]);
      this.dispatch('setCurrentTrack', songQueue[0]);
    },
    setActiveCover(state, cover) {
      this.state.currentCover = cover;
    },
    setCurrentTrack(state, track) {
      this.dispatch('pausePlaying');
      Vue.set(this.state, 'currentTrack', track);
      this.dispatch('loadSound');
    },
    setCurrentTrackTime(state, seconds) {
      Vue.set(this.state, 'currentTrackTime', seconds);
    },
    setCurrentTrackDuration(state, duration) {
      Vue.set(this.state, 'currentTrackDuration', duration);
    },
    setNextTrack(state) {
      Vue.set(this.state, 'nextTrackOrder', Math.floor(this.state.currentTrack.order));
    },
    setPrevTrack(state) {
      Vue.set(this.state, 'prevTrackOrder', Math.floor(this.state.currentTrack.order - 2));
    }
  },
  actions: {
    pausePlaying({ ...context }) {
      context.commit('pausePlaying');
    },
    startPlaying({ ...context }) {
      context.commit('startPlaying');
    },
    setActiveMixtape({ ...context }, mixtape) {
      context.commit('setActiveMixtape', mixtape);
    },
    setActiveTrackList({ ...context }, tracks, starting) {
      context.commit('setActiveTrackList', tracks, starting);
    },
    setActiveQueue({ ...context }, starting) {
      context.commit('setActiveQueue', starting);
    },
    setActiveCover({ ...context }, cover) {
      context.commit('setActiveCover', cover);
    },
    setCurrentTrack({ ...context }, track) {
      context.commit('setCurrentTrack', track);
    },
    setCurrentTrackDuration({ ...context }, duration) {
      context.commit('setCurrentTrackDuration', duration);
    },
    async loadSound({ ...context }) {
      context.commit('loadSound');
    },
    setCurrentFileDir({ ...context }, filepath) {
      context.commit('setCurrentFileDir', filepath);
    },
    setCurrentTrackTime({ ...context }, seconds) {
      context.commit('setCurrentTrackTime', seconds);
    },
    setNextTrack({ ...context }) {
      context.commit('setNextTrack');
    },
    setPrevTrack({ ...context }) {
      context.commit('setPrevTrack');
    },
  },
});

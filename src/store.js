import Vue from 'vue';
import Vuex from 'vuex';
import { event } from 'vue-analytics';

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
    showListing: true,
    mixtapes: [{
      id: 0,
      name: 'Vestige',
      info: '/mixtapes/vestige/vestige.json',
      cover: '/mixtapes/vestige/vestige.jpg',
    }, {
      id: 1,
      name: 'Estivated',
      info: '/mixtapes/estivated/estivated.json',
      cover: '/mixtapes/estivated/estivated.jpg',
    }, {
      id: 2,
      name: 'Recrudesce',
      info: '/mixtapes/recrudesce/recrudesce.json',
      cover: '/mixtapes/recrudesce/recrudesce.jpg',
    }, {
      id: 3,
      name: 'Whitehurst Frwy',
      info: '/mixtapes/whitehurst-frwy/whitehurst-frwy.json',
      cover: '/mixtapes/whitehurst-frwy/whitehurst-frwy.jpg',
    }, {
      id: 4,
      name: 'No Rush',
      info: '/mixtapes/no-rush/no-rush.json',
      cover: '/mixtapes/no-rush/no-rush.jpg',
    }, {
      id: 5,
      name: 'Bearhaus',
      info: '/mixtapes/bearhaus/bearhaus.json',
      cover: '/mixtapes/bearhaus/bearhaus.jpg',
    }, {
      id: 6,
      name: 'Kibbles',
      info: '/mixtapes/kibbles/kibbles.json',
      cover: '/mixtapes/kibbles/kibbles.jpg',
    }, {
      id: 7,
      name: 'Feet Above Water',
      info: '/mixtapes/feet-above-water/feet-above-water.json',
      cover: '/mixtapes/feet-above-water/feet-above-water.jpg',
    }, {
      id: 8,
      name: 'Arlington',
      info: '/mixtapes/arlington/arlington.json',
      cover: '/mixtapes/arlington/arlington.jpg',
    }, {
      id: 9,
      name: 'Topeka',
      info: '/mixtapes/topeka/topeka.json',
      cover: '/mixtapes/topeka/topeka.jpg',
    }, {
      id: 10,
      name: 'Piedmont',
      info: '/mixtapes/piedmont/piedmont.json',
      cover: '/mixtapes/piedmont/piedmont.jpg',
    }],
  },
  getters: {
    showListing: state => state.showListing,
    showPlayer: state => state.showPlayer,
    isPlaying: state => state.playing,
    isMixtapeLoaded: state => Object.keys(state.currentMixtape).length,
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
      document.title = `Paused: ${this.state.currentTrack.song} by ${this.state.currentTrack.artist} from ${this.state.currentMixtape.name}`;
      event('click', 'Player Interaction', 'Pressed Pause');
    },
    startPlaying() {
      this.state.sound.play();
      this.state.playing = true;
      document.title = `Playing: ${this.state.currentTrack.song} by ${this.state.currentTrack.artist} from ${this.state.currentMixtape.name}`;
      event('click', 'Player Interaction', 'Pressed Play');
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
      event('load', 'Mixtape Loaded', mixtape.name);
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
      Vue.set(this.state, 'currentCover', cover);
    },
    setCurrentTrack(state, track) {
      this.dispatch('pausePlaying');
      Vue.set(this.state, 'currentTrack', track);
      this.dispatch('loadSound');
      document.title = `Loaded: ${track.song} by ${track.artist} from ${this.state.currentMixtape.name}`;
      event('load', 'Arist Loaded', track.artist);
      event('load', 'Song Loaded', track.song);
      event('load', 'Track Loaded', `${track.order} - ${track.artist} - ${track.song}`);
    },
    setCurrentTrackTime(state, seconds) {
      Vue.set(this.state, 'currentTrackTime', seconds);
    },
    setCurrentTrackDuration(state, duration) {
      Vue.set(this.state, 'currentTrackDuration', duration);
    },
    setNextTrack() {
      Vue.set(this.state, 'nextTrackOrder', Math.floor(this.state.currentTrack.order));
      event('click', 'Interaction', 'Pressed Next');
    },
    setPrevTrack() {
      Vue.set(this.state, 'prevTrackOrder', Math.floor(this.state.currentTrack.order - 2));
      event('click', 'Pressed Interaction', 'Pressed Prev');
    },
    toggleShowListing() {
      if (this.state.showListing) {
        event('click', 'Side Bar Interaction', 'Hide Mixtape Listing');
      } else {
        event('click', 'Side Bar Interaction', 'Show Mixtape Listing');
      }
      Vue.set(this.state, 'showListing', !this.state.showListing);
    },
    toggleShowPlayer() {
      Vue.set(this.state, 'showPlayer', !this.state.showPlayer);
      event('click', 'Show Player', 'Show Player');
    },
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
    toggleShowListing({ ...context }) {
      context.commit('toggleShowListing');
    },
    toggleShowPlayer({ ...context }) {
      context.commit('toggleShowPlayer');
    },
  },
});

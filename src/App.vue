<template>
  <div id="player">
    <ul>
      <li v-for="mixtape in mixtapes" :key="mixtape.id">
        <a href="#" @click="loadMixtape(mixtape.info)">{{ mixtape.name }}</a>
      </li>
    </ul>
    <ul>
      <li v-for="(track, index) in currentTracks" :key="index">
        {{ index+1 }} {{ artistSong(track) }}
      </li>
    </ul>
    <img width="150px" height="150px" v-if="currentCover" :src="currentCover" />
    <!-- <button @click="togglePlayback()">Play</button> -->
  </div>
</template>

<script>
export default {
  name: 'AppContainer',
  date() {
    return {
      sound: null,
      playStatus: 'Play',
    };
  },
  computed: {
    mixtapes() {
      return this.$store.getters.getMixtapes;
    },
    currentTracks() {
      return this.$store.getters.getCurrentTrackList;
    },
    currentCover() {
      return this.$store.getters.getCurrentCover;
    },
  },
  mounted() {
    this.sound = new this.$howl({
      html5: true,
      src: [''],
    });
  },
  methods: {
    artistSong(info) {
      return `${info.artist} - ${info.song}`;
    },
    togglePlayback() {
      if (!this.$store.getters.isPlaying) {
        this.sound.play();
        this.$store.dispatch('startPlaying');
      } else {
        this.sound.pause();
        this.$store.dispatch('pausePlaying');
      }
    },
    stopPlayback() {
      this.sound.stop();
      this.$store.dispatch('stopPlaying');
    },
    loadMixtape(file) {
      if (this.currentMixtape === undefined || this.currentMixtape === null) {
        fetch(file)
          .then(stream => stream.json())
          .then((data) => {
            this.setActiveMixtape(data);
          })
          .catch(error => console.error(error));
      }
    },
    async setActiveMixtape(data) {
      this.$store.dispatch('setActiveMixtape', data);
      this.$store.dispatch('setActiveTrackList', data.tracks);
      this.$store.dispatch('setActiveCover', data.cover);
    },
  },
};
</script>

<style lang="scss" scoped>
  button {
    width: 300px;
    height: 150px;
    font-size: 30px;
  }
</style>

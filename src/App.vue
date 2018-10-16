<template>
  <div id="player">
    <button @click="togglePlayback()">Play</button>
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
  mounted() {
    this.sound = new Howl({
      html5: true,
      src: ['/mixtapes/estivated/15 - Eaves - with out u.mp3'],
    });
  },
  methods: {
    togglePlayback() {
      if (!this.$store.getters.isPlaying) {
        this.sound.play();
        this.$store.dispatch('startPlaying');
      } else {
        this.sound.pause();
        this.$store.dispatch('pausePlaying');
      }
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

<template>
  <div id="player" class="container-fluid">
    <div class="row">
      <div class="col">
        <mixtape-listing />
      </div>
      <div class="col">
        <current-track></current-track>
        <player-controls></player-controls>
        <track-listing></track-listing>
      </div>
    </div>
  </div>
</template>

<script>
import MixtapeListing from '@/components/MixtapeListing.vue';
import CurrentTrack from '@/components/CurrentTrack.vue';
import TrackListing from '@/components/TrackListing.vue';
import PlayerControls from '@/components/PlayerControls.vue';

export default {
  name: 'AppContainer',
  components: {
    MixtapeListing,
    CurrentTrack,
    TrackListing,
    PlayerControls,
  },
  data() {
    return {
      runningTime: '00:00',
      percentdone: '0%',
    };
  },
  created() {
    this.sound.onended = () => {
      this.nextTrack();
    };
    this.sound.ondurationchange = () => {
      this.updateDuration();
    };
    this.sound.ontimeupdate = () => {
      this.updateRunningTime();
    };
  },
  computed: {
    sound() {
      return this.$store.getters.getSound;
    },
  },
  methods: {
    updateDuration() {
      this.$store.dispatch('setCurrentTrackDuration', this.sound.duration);
    },
    updateRunningTime() {
      this.$store.dispatch('setCurrentTrackTime', this.sound.currentTime);
    },
  },
};
</script>

<style lang="scss">
  @import '@/styles/custom-bootstrap.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

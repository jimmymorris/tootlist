<template>
<div v-if="this.getCurrentTrackList.length" class="global-controls">
  <div class="global-control previous">
    <button :disabled="disablePrevious" @click.prevent="previousTrack">
      <i class="fas fa-backward"></i>
    </button>
  </div>
  <div class="global-control play-pause">
    <button @click.prevent="togglePlayback">
      <i :class="playStatus"></i>
    </button>
  </div>
  <div class="global-control next">
    <button :disabled="disableNext" @click.prevent="nextTrack">
      <i class="fas fa-forward"></i>
    </button>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { togglePlayback, stopPlayback, nextTrack, previousTrack } from '@/mixins/playerControls';

export default {
  name: 'PlayerControls',
  mixins: [togglePlayback, stopPlayback, nextTrack, previousTrack],
  computed: {
    ...mapGetters([
      'getCurrentTrack',
      'getCurrentTrackList',
    ]),
    disableNext() {
      return this.getCurrentTrack.order === (this.getCurrentTrackList.length+1);
    },
    disablePrevious() {
      return this.getCurrentTrack.order === 1;
    },
    playStatus() {
      return this.$store.getters.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
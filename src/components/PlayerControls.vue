<template>
<div v-if="this.getCurrentTrackList.length" class="global-controls">
  <div class="global-control">
    <button :disabled="disablePrevious" @click.prevent="previousTrack" class="previous">
      <i class="fas fa-backward fa-fw fa-2x"></i>
    </button>
  </div>
  <div class="global-control">
    <button @click.prevent="togglePlayback" class="play-pause">
      <i :class="playStatus"></i>
    </button>
  </div>
  <div class="global-control">
    <button :disabled="disableNext" @click.prevent="nextTrack" class="next">
      <i class="fas fa-forward fa-fw fa-2x"></i>
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
      return this.getCurrentTrack.order === (this.getCurrentTrackList.length + 1);
    },
    disablePrevious() {
      return this.getCurrentTrack.order === 1;
    },
    playStatus() {
      return this.$store.getters.isPlaying ? 'fas fa-pause fa-fw fa-3x' : 'fas fa-play fa-fw fa-3x';
    },
  },
};
</script>

<style lang="scss">

  .global-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 30px;
  }

  .global-control {
    button {
      appearance: none;
      background: transparent;
      border: 0;
      color: $raven;
    }

    .play-pause {
      border: 4px solid $raven;
      width: 90px;
      height: 90px;
      border-radius: 100%;
      text-align: center;
    }

    .next, .previous {
      margin: 0 20px;
    }
  }
</style>

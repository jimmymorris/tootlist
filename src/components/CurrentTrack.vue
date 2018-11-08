<template>
  <div class="row current-track" v-if="getCurrentTrack.filename">
    <div class="current-track-header">
      <h2 class="current-song" v-if="getCurrentTrack.filename">{{ getCurrentTrack.song }}</h2>
      <p class="current-artist" v-if="getCurrentTrack.filename">by {{ getCurrentTrack.artist }}</p>
    </div>
    <!-- <h3 v-if="getCurrentTrack.filename">
      ({{ `${runningTime} / ${currentDuration}` }})
    </h3> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import niceTime from '@/helpers';

export default {
  name: 'CurrentTrack',
  computed: {
    ...mapGetters([
      'getCurrentTrack',
    ]),
    runningTime() {
      return niceTime(this.getCurrentTrackTime);
    },
    currentDuration() {
      return niceTime(this.getCurrentTrackDuration);
    },

  },
};
</script>

<style lang="scss">
  .mixtape-cover {
    width: 100%;
    height: auto;
    display: inline-block;
  }

  .song-progress-wrapper {
    width: 100%;
    height: 100%;
    display: block;
  }

  .song-progress {
    width: 0;
    height: 10px;
    background: $yellow;
  }

  .current-track-header {
    padding: 20px;
  }

  .current-artist {
    color: $gray-light;
    font-size: 16px;
    margin: 0;
  }
</style>

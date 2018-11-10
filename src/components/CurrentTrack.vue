<template>
  <div class="current-track" v-if="currentTrack.filename">
    <span class="running-time">{{ runningTime }}</span>
    <div class="current-track-header">
      <h2 class="current-song" v-if="currentTrack.filename">{{ currentTrack.song }}</h2>
      <p class="current-artist" v-if="currentTrack.filename">by {{ currentTrack.artist }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import niceTime from '@/helpers';

export default {
  name: 'CurrentTrack',
  computed: {
    ...mapGetters({
      rawRunningTime: 'getCurrentTrackTime',
      currentTrack: 'getCurrentTrack',
      rawDuration: 'getCurrentTrackTime',
    }),
    runningTime() {
      return niceTime(this.rawRunningTime);
    },
    duration() {
      return niceTime(this.rawDuration)
    }
  },
};
</script>

<style lang="scss">
  .current-track {
    position: relative;
  }

  .song-progress-wrapper {
    width: 100%;
    height: 10px;
    display: block;
  }

  .song-progress {
    width: 0;
    height: 100%;
    background: $yellow;
  }

  .current-track-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    height: 225px;
    position: relative;
    font: {
      family: $font-family-serif;
      weight: 900;
    };
  }

  .current-artist {
    color: $red;
    font-size: rem-calc(20px);
    margin: 0;
  }

  .running-time {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    color: $gray-lighter;
    font: {
      weight: 700;
      size: 10rem;
    }
  }
</style>

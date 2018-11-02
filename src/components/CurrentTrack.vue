<template>
  <div class="current-track">
    <h1 v-if="getCurrentTrack.filename">{{ getCurrentTrack.song }}</h1>
    <h2 v-if="getCurrentTrack.filename">By {{ getCurrentTrack.artist }}</h2>
    <h3 v-if="getCurrentTrack.filename">
      ({{ `${runningTime} / ${currentDuration}` }})
    </h3>
    <div class="song-progress-wrapper">
      <div class="song-progress" :style="{width: percentdone}"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import niceTime from '@/helpers';

export default {
  name: 'CurrentTrack',
  computed: {
    ...mapGetters([
      'getCurrentTrackTime',
      'getCurrentTrackDuration',
      'getCurrentTrack',
    ]),
    runningTime() {
      return niceTime(this.getCurrentTrackTime);
    },
    currentDuration() {
      return niceTime(this.getCurrentTrackDuration);
    },
    percentdone() {
      return `${(this.getCurrentTrackTime / this.getCurrentTrackDuration) * 100}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .song-progress-wrapper {
    width: 320px;
    display: inline-block;
    background: #eee;
    border-radius: 10px;
  }

  .song-progress {
    display: block;
    width: 0;
    height: 5px;
    background: black;
  }
</style>

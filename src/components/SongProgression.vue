<template>
  <div class="song-progress-wrapper">
    <div class="song-progress" :style="{width: percentdone}"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SongProgression',
  computed: {
    ...mapGetters([
      'getCurrentTrackTime',
      'getCurrentTrackDuration',
    ]),
    percentdone() {
      return `${(this.getCurrentTrackTime / this.getCurrentTrackDuration) * 100}%`;
    },
  },
};
</script>

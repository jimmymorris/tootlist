<template>
  <div class="mixtape-player">
    <div class="row no-gutters">
      <!-- make new cover component -->
      <div class="col-xs-12 col-md-3 offset-xl-2">
        <img class="mixtape-cover" v-if="getCurrentCover" :src="getCurrentCover" />
      </div>
      <!-- make new song progress component -->
      <div class="col-xs-12 col-md-9 col-xl-5">
        <div class="song-progress-wrapper">
          <div class="song-progress" :style="{width: percentdone}"></div>
        </div>
        <current-track></current-track>
        <player-controls></player-controls>
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col-12">
        <track-listing></track-listing>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CurrentTrack from '@/components/CurrentTrack.vue';
import TrackListing from '@/components/TrackListing.vue';
import PlayerControls from '@/components/PlayerControls.vue';

export default {
  name: 'MixtapePlayer',
  components: {
    CurrentTrack,
    TrackListing,
    PlayerControls,
  },
  computed: {
    ...mapGetters([
      'getCurrentCover',
      'getCurrentTrackTime',
      'getCurrentTrackDuration',
    ]),
    percentdone() {
      return `${(this.getCurrentTrackTime / this.getCurrentTrackDuration) * 100}%`;
    },
  },
};
</script>

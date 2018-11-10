<template>
  <div class="mixtape-player">
    <div class="row no-gutters">
      <div class="col-xs-12 col-md-3 offset-xl-2 mixtape-cover-art">
        <mixtape-cover-art></mixtape-cover-art>
      </div>
      <div class="col-xs-12 col-md-9 col-xl-5 mixtape-actions">
        <song-progression></song-progression>
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
import SongProgression from '@/components/SongProgression.vue';
import MixtapeCoverArt from '@/components/MixtapeCoverArt.vue';

export default {
  name: 'MixtapePlayer',
  components: {
    CurrentTrack,
    TrackListing,
    PlayerControls,
    SongProgression,
    MixtapeCoverArt,
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

<style lang="scss">
  .mixtape-cover-art {
    @media (max-height: rem-calc(767px)) {
      display: none;
    }
  }

  .mixtape-actions.col-md-9 {
    @media (max-height: rem-calc(400px)) and (orientation: landscape) {
      flex: 100%;
      max-width: 100%;
    }
  }
</style>
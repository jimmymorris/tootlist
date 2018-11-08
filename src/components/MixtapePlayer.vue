<template>
  <div class="mixtape-player">
    <!-- make new cover component -->
    <div class="col-xs-12 col-md-3">
      <img class="mixtape-cover" v-if="getCurrentCover" :src="getCurrentCover" />
    </div>
    <current-track></current-track>
    <!-- make new song progress component -->
    <div class="song-progress-wrapper">
      <div class="song-progress" :style="{width: percentdone}"></div>
    </div>
    <player-controls></player-controls>
    <track-listing></track-listing>
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
    }
  }
</script>

<style lang="scss">
</style>

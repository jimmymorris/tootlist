<template>
  <div id="player" class="container-fluid">
    <div class="color-gutter">
      <i class="fas fa-music"></i>
      <button class="show-playlist" v-if="isMixtapeLoaded" @click.prevent="toggleShowListing">
        {{viewHideText}} Playlists
      </button>
    </div>
    <div class="mixtape-listing-wrapper" :class="{ 'show-mixtape-listing': showListing }">
      <mixtape-listing />
    </div>
    <div class="mixtape-player-wrapper">
      <mixtape-player />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MixtapeListing from '@/components/MixtapeListing.vue';
import MixtapePlayer from '@/components/MixtapePlayer.vue';
import { nextTrack } from '@/mixins/playerControls';

export default {
  name: 'TootList',
  components: {
    MixtapeListing,
    MixtapePlayer,
  },
  mixins: [nextTrack],
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
    ...mapGetters([
      'showListing',
      'showPlayer',
      'isMixtapeLoaded',
    ]),
    sound() {
      return this.$store.getters.getSound;
    },
    viewHideText() {
      return this.showListing ? 'Hide' : 'View';
    },
  },
  methods: {
    ...mapActions([
      'toggleShowListing',
    ]),
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
  body {
    height: 100vh;
    background: $gray-light;

    @include media-breakpoint-up(md) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .container {
    flex: 1;
  }

  #player {
    display: flex;
    align-items: stretch;
    background: $white;
    padding: 0;
    overflow-x: hidden;
    position: relative;
    height: 100vh;
  }
  .mixtape-listing-wrapper, .mixtape-player-wrapper {
    width: calc(100vw - 60px);
    margin-left: 60px;
  }

  .mixtape-listing-wrapper {
    background: $primary;
    z-index: 10;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: translateX(-100vw);
    transition: 750ms transform cubic-bezier(0.86, 0, 0.07, 1);

    &.show-mixtape-listing {
      transform: translateX(0);
    }
  }

  .color-gutter {
    position: fixed;
    top: 0;
    left: 0;
    width: 60px;
    height: 100vh;
    padding: 20px 0;
    border-right: 1px solid $light-blue;
    background: $primary;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 15;

    .fas {
      color: $white;
    }

    .show-playlist {
      position: absolute;
      top: 90px;
      width: 240px;
      height: 60px;
      transform: rotate(-90deg);
      appearance: none;
      background: transparent;
      border: 0;
      color: #fff;
      text-transform: uppercase;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>

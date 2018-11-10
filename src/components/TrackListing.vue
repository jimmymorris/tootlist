<template>
  <div class="mixtape">
    <ol class="tracks">
      <li v-for="(track, index) in getCurrentTrackList" :key="index" class="track">
        <a
          href="#"
          :class="{ playing: (index+1) === getCurrentTrack.order }"
          @click.prevent="setTrack(index)">
            <span class="track-song">{{ track.song }}</span>
            <span class="track-artist">{{ track.artist }}</span>
            <i class="track-play-button fas fa-play fa-fw"></i>
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CurrentMixtape',
  computed: {
    ...mapGetters([
      'getCurrentTrackList',
      'getCurrentTrack',
      'getCurrentMixtape',
    ]),
  },
  methods: {
    setTrack(index) {
      this.$store.dispatch('setActiveQueue', index).then(() => {
        this.$store.dispatch('startPlaying');
      });
    },
  },
};
</script>

<style lang="scss">
  .tracks {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .track {
    border-top: 1px solid $deep-water;
  }

  .track a {
    display: block;
    width: 100%;
    padding: 15px 75px 15px 15px;
    color: $deep-water;
    position: relative;
  }

  .track-song {
    font: {
      size: rem-calc(16px);
      weight: bold;
    };
    display: block;
    transition: 100ms color ease;
  }

  .track-artist {
    font-size: 0.8125rem;
    color: $gray-light;
  }

  .track-play-button {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: $white;
    background: $deep-water;
    width: 40px;
    padding: 12px 0;
    border-radius: 50%;
  }

  .playing {
    .track-song {
      color: $red;
    }

    .track-play-button {
      background: $red;
    }
  }


</style>

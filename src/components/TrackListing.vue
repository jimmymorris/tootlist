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
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import concatArtistSong from '@/mixins/concatArtistSong';

export default {
  name: 'CurrentMixtape',
  mixins: [concatArtistSong],
  computed: {
    ...mapGetters([
      'getCurrentTrackList',
      'getCurrentTrack',
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
    padding: 15px;
  }

  .track-song {
    font: {
      size: rem-calc(16px);
      weight: 700;
    };
    display: block;
    color: $raven;
    transition: 100ms color ease;
  }

  .track-artist {
    font-size: 0.8125rem;
    color: $gray-light;
  }

  .playing .track-song {
    color: $red;
  }

</style>

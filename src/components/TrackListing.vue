<template>
  <div class="mixtape">
    <ol class="tracks">
      <li v-for="(track, index) in getCurrentTrackList" :key="index" class="track">
        <a
          href="#"
          @click.prevent="setTrack(index)">
            <span class="track-index">{{ track.order }}</span>
            <span class="track-info">{{ concatArtistSong(track) }}</span>
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
    display: flex;
    align-items: center;
  }

  .track-index {
    flex: 0 0 35px;
    text-align: center;
  }

  .track-info {
    padding: 18px 7px;
  }
</style>
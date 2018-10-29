<template>
  <div class="mixtape">
    <img width="150px" height="150px" v-if="getCurrentCover" :src="getCurrentCover" />
    <ul>
      <li v-for="(track, index) in getCurrentTrackList" :key="index">
        <a
          href="#"
          @click.prevent="setTrack(index)">
            {{ index+1 }} - {{ concatArtistSong(track) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import concatArtistSong from '@/mixins/concatArtistSong';

export default {
  name: 'CurrentMixtape',
  mixins: [concatArtistSong],
  computed: {
    ...mapGetters([
      'getCurrentTrackList',
      'getCurrentCover',
    ]),
  },
  methods: {
    setTrack(index) {
      this.$store.dispatch('setActiveQueue', index).then(() => {
        this.$store.dispatch('startPlaying');
      });
    }
  },
};
</script>

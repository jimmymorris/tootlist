<template>
  <div class="mixtape-listing">
    <h2>Playlists</h2>
    <ul>
      <li
        v-for="mixtape in getMixtapes"
        :key="mixtape.id"
        class="mixtape">
          <a
            href="#"
            @click.prevent="loadMixtape(mixtape.info)"
            :title="mixtape.name"
            class="play-mixtape">
              {{mixtape.name}}
          </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MixtapeListing',
  computed: {
    ...mapGetters([
      'getMixtapes',
    ]),
  },
  methods: {
    loadMixtape(file) {
      fetch(file)
        .then(stream => stream.json())
        .then((data) => {
          this.$store.dispatch('setActiveMixtape', data);
        })
        .catch(error => console.error(error));
    },
  },
};
</script>

<style lang="scss" scoped>
  .mixtape-listing {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
</style>

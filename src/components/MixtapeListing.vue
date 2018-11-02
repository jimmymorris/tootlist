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
            :class="{ 'active-mixtape': mixtape.name === active }"
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
  data() {
    return {
      active: '',
    };
  },
  computed: {
    ...mapGetters([
      'getMixtapes'
    ]),

  },
  methods: {
    loadMixtape(file) {
      fetch(file)
        .then(stream => stream.json())
        .then((data) => {
          this.$store.dispatch('setActiveMixtape', data);
          this.active = data.name;
        })
        .catch(error => console.error(error));
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '@/styles/custom-bootstrap.scss';

  .mixtape-listing {
    height: 100%;
    padding: 30px;
    
    @include media-breakpoint-up(md) {
      padding: 30px 0;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  .play-mixtape {
    display: block;
    padding: 5px 15px;
    margin: 10px 0;
    border-left: 4px solid transparent;
    font-weight: bold;
  }

  .active-mixtape {
    border-left-color: $orange;
  }
</style>

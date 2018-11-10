<template>
  <div class="mixtape-listing">
    <h1 class="mixtape-listing-header">Mixtapes</h1>
    <ul class="row no-gutters">
      <li
        v-for="mixtape in getMixtapes"
        :key="mixtape.id"
        class="mixtape col-xs-12 col-sm-6 col-lg-4">
          <a
            href="#"
            @click.prevent="loadMixtape(mixtape.info)"
            :title="mixtape.name"
            class="play-mixtape">
              {{mixtape.name}}
              <i class="fas fa-volume-up" v-if="mixtape.name === active"></i>
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
      'getMixtapes',
    ]),
  },
  methods: {
    loadMixtape(file) {
      fetch(file)
        .then(stream => stream.json())
        .then((data) => {
          this.$store.dispatch('setActiveMixtape', data);
          this.active = data.name;
          this.$store.dispatch('toggleShowListing');
        })
        .catch(error => console.error(error));
    },
  },
};
</script>

<style lang="scss">
  .mixtape-listing {
    display: inline-block;
    padding: 30px;

    @include media-breakpoint-up(md) {
      padding: 45px;
    }

    ul {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  .mixtape-listing-header {
    margin: 0 0 10px;
    font-size: rem-calc(32px);
    text-transform: uppercase;
    color: $white;

    @include media-breakpoint-up(md) {
      font-size: rem-calc(48px);
      margin-bottom: 30px;
    }
  }

  .mixtape {
    margin: 5px 0;
  }

  .play-mixtape {
    display: block;
    padding: 10px 0;
    color: $white;
    font-size: rem-calc(18px);

    @include media-breakpoint-up(md) {
      font-size: rem-calc(24px);
      margin: {
        top: 5px;
        bottom: 5px;
      };
    }
    @include media-breakpoint-up(lg) {
      font-size: rem-calc(32px);
      margin: {
        top: 15px;
        bottom: 15px;
      };
    }

    &:hover {
      color: white;
      text-decoration: none;
    }
  }


</style>

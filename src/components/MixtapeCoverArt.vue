<template>
  <img class="mixtape-cover" v-if="getCurrentCover" :src="getCurrentCover" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MixtapePlayer',
  computed: {
    ...mapGetters([
      'getCurrentCover',
    ]),
  },
};

</script>

<style lang="scss">
  .mixtape-cover {
    width: 100%;
    height: auto;
    display: inline-block;
  }

</style>

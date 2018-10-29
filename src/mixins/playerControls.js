export const togglePlayback = {
  methods: {
    togglePlayback() {
      if (!this.$store.getters.isPlaying) {
        this.$store.dispatch('startPlaying');
      } else {
        this.$store.dispatch('pausePlaying');
      }
    },
  },
};

export const stopPlayback = {
  methods: {
    stopPlayback() {
      this.$store.dispatch('pausePlaying');
    },
  },
};
export const nextTrack = {
  methods: {
    nextTrack() {
      this.$store.dispatch('setNextTrack');
      this.$store.dispatch('setActiveQueue', this.$store.getters.getNextTrack);
      this.$store.dispatch('startPlaying');
    },
  },
};

export const previousTrack = {
  methods: {
    previousTrack() {
      this.$store.dispatch('setPrevTrack');
      this.$store.dispatch('setActiveQueue', this.$store.getters.getPreviousTrack);
      this.$store.dispatch('startPlaying');
    },
  },
};

export default {
  methods: {
    concatArtistSong: (track) => {
      return `${track.artist} - ${track.song}`;
    },
  },
};

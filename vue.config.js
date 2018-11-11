module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/tootlist/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_helpers.scss";
          @import "@/styles/custom-bootstrap.scss";
          @import "./node_modules/bootstrap/scss/bootstrap.scss";
        `,
      },
    },
  },
};

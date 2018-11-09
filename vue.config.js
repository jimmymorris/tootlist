module.exports = {
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

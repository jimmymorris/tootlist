module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/custom-bootstrap.scss";  
          @import "./node_modules/bootstrap/scss/bootstrap.scss";
        `,
      },
    },
  },
};

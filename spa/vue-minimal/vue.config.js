/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    port: 3000
  },
  publicPath: `${process.env.PUBLIC_PATH}`,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/scss/_variables.scss";`
      }
    }
  }
};

const path = require('path')

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_mixin.scss";
        `
      }
    }
  },
  devServer: {
    port: 8082,
    hot: true,
    compress: true,
    disableHostCheck: true,
    allowedHosts: [''],
    proxy: {
      '/api': {
        target: 'http://api.co/mock/5071',
        changeOrigin: true,
        pathRewrite: { '/api': '' }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

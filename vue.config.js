const path = require('path')

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue3-project' : '/', // github里 vue3-project项目名,实际的项目一般不需要配置这项
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_BASE_URL,
  outputDir: process.env.VUE_APP_OUTPUT,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.join(__dirname, 'src'))
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

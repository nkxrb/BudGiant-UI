const path = require('path')
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  publicPath: '/',
  devServer: {
    port: 9000
  },
  pages: {
    index: {
      entry: 'src/examples/main.ts',
      template: 'index.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/examples'))
      .set('@packages', resolve('src/packages'))
  }
}
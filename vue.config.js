/**
 * 配置参数参考以下网址
 * https://cli.vuejs.org/zh/config/
 */
const webpack = require('webpack') // 引入webpack库

module.exports = {
  // 发布时服务访问路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 服务请求配置
  devServer: {
    port: 9000,
    proxy: 'http://62.234.41.165:8091/' // 这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:27001
  },
  // 打包文件输出路径
  // outputDir: 'D:\\workspace_demo\\my-vue-lib\\dict',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  // 多页面情况时需要配置
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  configureWebpack: {
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      },
      'element-ui': 'element-ui'
      // BMap: 'BMap'
    }
  },
  productionSourceMap: false,
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    console.log('111111111', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue'
        },
        'element-ui': 'element-ui'
      }
    }

    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
    config.plugin('contextReplacementPlugin').use(// 日期时间处理插件仅打包汉语包
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /zh-cn/
      )
    )
  }
}

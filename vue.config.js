const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
//   transpileDependencies: [
//     'fast-xml-parser',
// ],
  configureWebpack: config => {
    config.externals= {
    }
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))

      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }
  },
  productionSourceMap: false,
  outputDir:'D:/code/koa/server/public',
  assetsDir:'index',
  indexPath:"D:/code/koa/server/views/index.html",
  devServer: {
    proxy: { // 配置跨域
      '/api': {
        target: 'http://localhost:3000/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/kuyun': {
        target: 'http://caiji.kuyunzyw.com/inc/s_ldg_kkm3u8.asp',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/kuyun': ''
        }
      },
      '/zuida': {
        target: 'http://www.zdziyuan.com/inc/s_api_zuidam3u8.php',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/zuida': ''
        }
      },
      '/scc': {
        target: 'https://www.66s.cc',
        changOrigin: true,
        pathRewrite: {
          '^/scc': ''
        }
      }
    }
  },
}
module.exports = {
  // 上线前打包的时候不要map文件
  productionSourceMap: false,
  // 代理服务器，解决跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
        // pathRewrite: { '^/api': '' }
      }
    }
  }
}

module.exports = {
  // lintOnSave:'warning', // 只是显示警告, 不暂停运行
  lintOnSave:false, // 不做eslint检查
  devServer: {
    proxy: {
      '/api': {
        target: 'http://182.92.128.115/',
        ws: true,
        changeOrigin: true
      }
    }
  },
}
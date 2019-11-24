module.exports = {
  baseUrl: '/',
  devServer: {
    proxy: {
      '/': {
        target:'http://localhost:4242',
        changeOrigin: true,
      },
      '/test2': {
        target:'http://localhost:4242/test2',
        changeOrigin: true,
      },
    },
  },
  publicPath: ''
  // publicPath: 'http://192.168.0.1:4242'
}

module.exports = {
  // baseUrl: '/',
  devServer: {
    proxy: {
      '/': {
        target:'http://localhost:4242',
        changeOrigin: true,
      },
      // '/add-user': {
      //   target:'http://localhost:4242//add-user',
      //   changeOrigin: true,
      // },
    },
    // public: 'test3.sktestpage.kro.kr',
  },
  publicPath: ''
  // publicPath: 'http://192.168.0.1:4242'
}

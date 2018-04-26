module.exports = {
  devServer: {
    https: false,
  },
  lintOnSave: false,
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      globDirectory: './dist/',
      globPatterns: [
        '**/test-sw.js',
        '**/*.html'
      ],
      swDest: './src/service-worker.js',
      clientsClaim: true,
      skipWaiting: true
    }
  }
}

module.exports = {
  globDirectory: './dist/',
  globPatterns: [
    '**/test-sw.js',
    '**/*.html'
  ],
  swDest: './src/service-worker.js',
  clientsClaim: true,
  skipWaiting: true
};
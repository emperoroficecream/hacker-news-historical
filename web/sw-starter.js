module.exports = function(swFilePath) {
  swFilePath = swFilePath || './sw.js';
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swFilePath).then(registration => {
        console.log('SW registered and self: ', registration);
      }).catch(error => {
        console.log('SW registration failed: ', error);
      })
    })
  } 
}
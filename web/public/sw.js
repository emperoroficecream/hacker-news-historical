importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.1/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.skipWaiting();
workbox.clientsClaim();

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function routeHandler(context) {
  console.log('getcontent route handler');
  const url = context.url.href;
  const postId = getParameterByName('id', url);
  const resOpts = {
    stats: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'text/html'
    }
  };
  const post = self.posts.find(p => p.id == postId);
  return new Response(post.content, resOpts);
}

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});



workbox.routing.registerRoute(
  new RegExp('/getcontent'),
  routeHandler
);

self.addEventListener('message', (event) => {
  let message;
  try {
    message = JSON.parse(event.data);
  } catch (e) {};
  self.posts = message;
});


/* self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
}); */


workbox.precaching.precacheAndRoute([]);
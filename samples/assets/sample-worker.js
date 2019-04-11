self.addEventListener('install', function (event) {
  console.log('ws installed!', event);
});

self.addEventListener('activate', function (event) {
  console.log('sw activated!', event);
});

self.addEventListener('message', function (event) {
  var promise = self.clients.matchAll()
    .then(function (clientList) {
      var senderID = event.source.id;
      clientList.forEach(function (client) {
        if (client.id === senderID) return;
        client.postMessage({
          client: senderID,
          message: event.data
        });
      });
    });

  if (event.waitUntil) event.waitUntil(promise);
});

self.addEventListener('fetch', function (event) {
  console.log('sw fetch', event.request.url);
});
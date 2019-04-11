const broadcaster = document.createElement('div');

export function triggerEvent(type, data = {}, bubbles = false, cancelable = true) {
  var event = document.createEvent('Event');
  event.initEvent(type, false, true);
  event.data = data;
  broadcaster.dispatchEvent(event);
}

export function listenEvent(type, callback) {
  broadcaster.addEventListener(type, callback);
  return () => broadcaster.removeEventListener(type, callback);
}
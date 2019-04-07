import useState from './state';

export default function useHotkeys({ keys, when = 'down', target = window }, callback) {
  target.addEventListener(`key${when}`, onKeyDown);
  
  return [cancel];
  
  function onKeyDown(event) {
    const keysList = keys.map(k => k.split('+'));
    const selected = [event.key];
    if (event.ctrlKey) selected.push('ctrlKey');
    if (event.shiftKey) selected.push('shiftKey');
    if (event.metaKey) selected.push('metaKey');

    let shouldCall = false;
    let triggered;
    keysList.forEach((items) => {
      if (items.reduce((r, k) => r && selected.includes(k), true)) {
        shouldCall = true;
        triggered = items;
      }
    })
    if (shouldCall) callback(triggered, event);
  }

  function cancel() {
    target.removeEventListener(`key${when}`, onKeyDown);
  }
}

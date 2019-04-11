export default function useLocalStorage(context) {
  if (typeof (Storage) == "undefined") throw new Error('No web localStorage Support');
  const { localStorage } = window;

  return [get, set, remove, clear];

  function set(newState) {
    const state = Object.assign({}, get(), newState);
    localStorage.setItem(context, JSON.stringify(state));
  }

  function remove(key) {
    const state = get();
    delete state[key];
    localStorage.setItem(context, JSON.stringify(state));
  }

  function get() {
    return JSON.parse(localStorage.getItem(context));
  }
  function clear() {
    localStorage.setItem(context, null);
  }
}

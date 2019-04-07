export default function useState(initialState = {}) {
  const listeners = [];
  let state = initialState;

  return [getState, setState, subscribe];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    let unsubscribed = false;

    return function () {
      if (!unsubscribed) {
        listeners.splice(listeners.indexOf(listener), 1);
        unsubscribed = true;
        return true;
      }
      return false;
    };
  }

  function setState(newState) {
    let isEqual = false;

    if (Array.isArray(newState)) {
      isEqual = isArrayEqual(state, newState);
      if (!isEqual) state = newState;
    } else if (typeof newState == 'object') {
      isEqual = isObjectEqual(state, newState);
      if (!isEqual) state = Object.assign({}, state, newState);
    } else {
      isEqual = state === newState;
      if (!isEqual) state = newState;
    }

    if (!isEqual) listeners.forEach(listener => listener(state));
  }
}

function isObjectEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) return false;
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) return false;
  }
  return true;
}

function isArrayEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
import useState from './state';

export default function useArrayNavigation({ array, infinity, index = 0, autoPlay = false }) {
  const [getIndex, setIndex, onChangeIndex] = useState(index);
  let ticker;

  if (autoPlay) play();

  return { getIndex, onChangeIndex, next, previous, play, pause, stop };

  function next() {
    if (infinity)
      setIndex(getIndex() + 1 > array.length - 1 ? 0 : getIndex() + 1);
    else
      setIndex(Math.min(getIndex() + 1, array.length - 1));
  }

  function previous() {
    if (infinity)
      setIndex(getIndex() - 1 < 0 ? array.length - 1 : getIndex() - 1);
    else
      setIndex(Math.max(getIndex() - 1, 0));
  }

  function play() {
    ticker = setInterval(next, 1000);
  }

  function pause() {
    clearInterval(ticker);
  }

  function stop() {
    clearInterval(ticker);
    setIndex(0);
  }
}
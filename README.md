# Collection of vanilla hooks

## Import

### Web Modules

```
<script type="module">
  import * as hooks from "https://cdn.jsdelivr.net/npm/@victorpotasso/hooks@0.0.1/lib/index.js";
</script>
```

### Node Modules

```npm install --save @victorpotasso/hooks```

```import * as hooks from  "@victorpotasso/hooks"```

### Usage

## useState

```
import { useState } from '@victorpotasso/hooks';

const [getIndex, setIndex, onIndex] = useState(0);
onIndex((state) => {
  console.log(getIndex());
});

setIndex(1);
```

## useHotkeys

```
import { useHotkeys } from '@victorpotasso/hooks';

useHotkeys({ keys: ['a', 'ctrlKey+a'], when: 'down', target: window }, (key) => console.log(key));
```
## useArrayNavigation

```
import { useArrayNavigation } from '@victorpotasso/hooks';

const { getIndex, onChangeIndex, next, previous, play, pause, stop } = useArrayNavigation({ array: [0, 1, 2, 3], infinity: true, autoPlay: false }));
```
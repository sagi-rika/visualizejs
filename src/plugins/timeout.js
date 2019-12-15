/* eslint-disable */
const stringify = require('../utils/stringify');

export const timeoutServer = stringify(() => {
  const _setTimeout = setTimeout;

  setTimeout = (fn, timeout, ...args) => {
    let timerId;

    const data = {
      id: timerId,
      delay: timeout,
      created: +new Date(),
      state: 'timing',
      code: `${fn.name || 'anonymous'}()`
    };

    const instrumentedFn = () => {
      data.state = 'started';
      data.started = +new Date();
      boss.send('timeout:started', data);
      delay();

      fn(...args);

      data.state = 'finished';
      data.finished = +new Date();
      boss.send('timeout:finished', data);
      delay();
    };

    data.id = _setTimeout(instrumentedFn, timeout, ...args);
    boss.send('timeout:created', data);
  };
});

export const immediateServer = stringify(() => {
  setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
});

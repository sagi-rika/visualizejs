const stringify = require('./stringify');

const emitterFor = scope => {
  const inWebworkerThread = typeof Window === 'undefined';

  const onMessage = message => {
    message = JSON.parse(message.data);

    if (!message.weevil) return;

    const cbs = weevil.callbacks[message.name];
    if (!cbs || !cbs.length) return;

    cbs.forEach(cb => cb(...message.args));
  };

  const weevil = {
    callbacks: {},
    once: function(name, fn) {
      const on = (...args) => {
        this.off(name, on);
        fn(...args);
      };
    },
    on: function(name, fn) {
      this.callbacks[name] = this.callbacks[name] || [];
      this.callbacks[name].push(fn);
      return this;
    },
    off: function(name, fn) {
      const callbacks = this.callbacks[name];

      if (!callbacks || !callbacks.length) return;

      if (!fn) delete this.callbacks[name];

      const i = callbacks.indexOf(fn);
      callbacks.splice(i, 1);
      return this;
    },
    send: function(...args) {
      return this.emit(...args);
    },
    emit: function(name, ...args) {
      scope.postMessage(
        JSON.stringify({
          name,
          args,
          weevil: true
        })
      );

      return this;
    },
    kill: function() {
      this.callbacks = {};
      scope.removeEventListener('message', onMessage, false);
      if (inWebworkerThread) {
        scope.close();
      } else {
        scope.terminate();
      }
    }
  };

  scope.addEventListener('message', onMessage, false);

  return weevil;
};

const prelude = stringify(emitterCode => {
  const weevil = (() => {
    // Import emitter code
    $emitterCode$;

    return emitterFor(self);
  })();

  // user code, with access to weevil;
}, emitterFor.toString());

const weevil = code => {
  code = stringify(
    (prelude, code) => {
      // Prelude code
      $prelude$;

      // User code
      $code$;
    },
    prelude,
    code
  );

  const blob = new Blob([code], { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));

  return emitterFor(worker);
};

module.exports = weevil;

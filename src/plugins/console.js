/* eslint-disable */
const stringify = require('../utils/stringify');

module.exports.prependWorkerCode = code => `
${this.server};
${code}`;

module.exports.server = stringify(() => {
  const _console = {};

  _console.log = (...args) => {
    boss.send('console:log', ...args);
  };
});

module.exports.createClient = (codeModel, emitter) => {
  emitter.on('console:log', (...args) => {
    args.unshift('color: coral; font-weight: bold;');
    args.unshift('%c VisualizeJS @ %d >');
    console.log(...args);
  });
};

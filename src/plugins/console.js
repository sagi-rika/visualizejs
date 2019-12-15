/* eslint-disable */
const stringify = require('../utils/stringify');

export const consoleServer = stringify(() => {
  const _console = {};

  _console.log = (...args) => {
    boss.send('console:log', ...args);
  };
});

export const createConsoleClient = (codeModel, emitter) => {
  emitter.on('console:log', (...args) => {
    args = ['%c VisualizeJS @ %d >', 'color: coral; font-weight: bold;', ...args];
    console.log(...args);
  });
};

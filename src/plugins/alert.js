/* eslint-disable */
const stringify = require('../utils/stringify');

export const alertServer = stringify(() => {
  const alert = (...args) => {
    boss.send('alert', ...args);
  };
});

export const createAlertClient = (codeModel, emitter) => {
  emitter.on('alert', (...args) => {
    alert(...args);
  });
};

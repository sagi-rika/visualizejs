import * as actions from '../store/actions';
import boss from '../utils/boss';
import stringify from '../utils/stringify';
import { createConsoleClient, consoleServer } from './console';
import { timeoutServer, immediateServer } from './timeout';

function delay() {
  const start = new Date().getTime();
  const delay = 1000;
  while (new Date().getTime() < start + delay) {
    // no-op
  }
}

const prependCode = (prepend, code) => `
${prepend}
${code}`;

export default (instrumented, dispatch) => {
  instrumented = prependCode(timeoutServer, instrumented);
  instrumented = prependCode(immediateServer, instrumented);
  instrumented = prependCode(consoleServer, instrumented);
  instrumented = prependCode(`${stringify(delay)}}`, instrumented);
  window.worker = boss(instrumented);
  createConsoleClient(window, window.worker);

  window.worker.on('node:before', ({ id, type, source, loc }) => {
    dispatch(actions.callStackPush(id, type, source, loc));
  });

  window.worker.on('node:after', () => {
    dispatch(actions.callStackPop());
  });

  window.worker.on('timeout:created', data => {
    console.log('timeout created!');
  });

  window.worker.on('timeout:started', data => {
    console.log('timeout started!');
  });

  window.worker.on('timeout:finished', data => {
    console.log('timeout finished!');
  });
};

import * as actions from '../store/actions';
import boss from '../utils/boss';
import stringify from '../utils/stringify';
import consoleClient from './console';

function delay() {
  const start = new Date().getTime();
  const delay = 1000;
  while (new Date().getTime() < start + delay) {
    // no-op
  }
}

export default (instrumented, dispatch) => {
  instrumented = consoleClient.prependWorkerCode(instrumented);
  instrumented = `${stringify(delay)}}
  ${instrumented}`;
  window.worker = boss(instrumented);
  consoleClient.createClient(window, window.worker);

  window.worker.on('node:before', ({ id, type, source, loc }) => {
    console.log(`id: ${id}, type: ${type}, source: ${source}`);
    dispatch(actions.callStackPush(id, type, source, loc));
  });

  window.worker.on('node:after', () => {
    dispatch(actions.callStackPop());
  });
};

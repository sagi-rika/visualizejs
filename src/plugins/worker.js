import boss from '../utils/boss';
import consoleClient from './console';

export default (instrumented, dispatch) => {
  instrumented = consoleClient.prependWorkerCode(instrumented);
  window.worker = boss(instrumented);
  consoleClient.createClient(window, window.worker);

  window.worker.on('node:before', ({ id, type, source }) => {
    dispatch({
      type: 'NODE_BEFORE',
      payload: `id: ${id}, type: ${type}, source: ${source}`
    });
  });

  window.worker.on('node:after', () => {
    console.log('NODE:AFTER');
  });
};

/* eslint-disable no-console */
import astWalk from '../../utils/walk';
import * as actionTypes from './actionTypes';

export const instrument = code => {
  const instrumented = astWalk(code);
  return {
    type: actionTypes.INSTRUMENT,
    payload: { instrumented: instrumented.code }
  };
};

/* eslint-disable no-console */
import { astWalk } from '../../utils/walk';
import * as actionTypes from './actionTypes';

export const updateCode = newCode => ({
  type: actionTypes.UPDATE_CODE,
  payload: { code: newCode }
});

export const run = code => {
  astWalk(code);
  return {
    type: actionTypes.RUN,
    payload: { code }
  };
};

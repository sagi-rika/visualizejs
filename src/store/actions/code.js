import * as actionTypes from './actionTypes';

export const updateCode = newCode => ({
  type: actionTypes.UPDATE_CODE,
  payload: { code: newCode }
});

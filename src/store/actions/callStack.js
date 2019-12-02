import * as actionTypes from './actionTypes';

export const callStackPush = (id, type, source) => ({
  type: actionTypes.CALL_STACK_PUSH,
  payload: {
    id,
    source
  }
});

export const callStackPop = () => ({
  type: actionTypes.CALL_STACK_POP
});

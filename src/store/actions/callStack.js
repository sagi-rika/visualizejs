import * as actionTypes from './actionTypes';

export const callStackPush = (id, type, source, loc) => ({
  type: actionTypes.CALL_STACK_PUSH,
  payload: {
    id,
    source,
    loc
  }
});

export const callStackPop = () => ({
  type: actionTypes.CALL_STACK_POP
});

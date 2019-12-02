import * as actionTypes from '../actions/actionTypes';

const initialState = {
  stack: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CALL_STACK_PUSH:
      return {
        ...state,
        stack: [...state.stack, { ...action.payload }]
      };
    case actionTypes.CALL_STACK_POP:
      return {
        ...state,
        stack: state.stack.filter((_, i) => i !== state.stack.length - 1)
      };
    default:
      return state;
  }
};

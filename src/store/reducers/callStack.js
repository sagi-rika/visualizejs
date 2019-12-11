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
    case actionTypes.CALL_STACK_POP: {
      const stack = [...state.stack];
      stack.shift();
      return {
        ...state,
        stack
      };
    }
    default:
      return state;
  }
};

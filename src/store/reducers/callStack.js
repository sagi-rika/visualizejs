import * as actionTypes from '../actions/actionTypes';

const initialState = {
  stack: []
};

export default (state = initialState, action) => {
  const stack = [...state.stack];
  switch (action.type) {
    case actionTypes.CALL_STACK_PUSH:
      stack.push(action.payload);

      return {
        ...state,
        stack
      };
    case actionTypes.CALL_STACK_POP: {
      stack.pop();

      return {
        ...state,
        stack
      };
    }
    default:
      return state;
  }
};

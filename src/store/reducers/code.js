import * as actionTypes from '../actions/actionTypes';

const initialState = {
  instrumented: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INSTRUMENT:
      return {
        ...state,
        instrumented: action.payload.instrumented
      };
    default:
      return state;
  }
};

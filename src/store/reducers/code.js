import * as actionTypes from '../actions/actionTypes';

const initialState = {
  code: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CODE:
      return {
        ...state,
        code: action.payload.code
      };
    default:
      return state;
  }
};

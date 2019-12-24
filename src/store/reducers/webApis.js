import * as actionTypes from '../actions/actionTypes';

const initialState = {
  apis: {}
};

export default (state = initialState, action) => {
  const apis = { ...state.apis };
  switch (action.type) {
    case actionTypes.WEB_API_ADD: {
      const { id, ...rest } = action.payload;
      apis[id] = { ...rest };

      return {
        ...state,
        apis
      };
    }
    case actionTypes.WEB_API_REMOVE: {
      const { id } = action.payload;
      delete apis[id];

      return {
        ...state,
        apis
      };
    }
    default:
      return state;
  }
};

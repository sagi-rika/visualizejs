import * as actionTypes from '../actions/actionTypes';

const initialState = {
  running: false,
  instrumented: null,
  activeLine: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INSTRUMENT:
      return {
        ...state,
        running: true,
        instrumented: action.payload.instrumented
      };
    case actionTypes.CALL_STACK_PUSH: {
      const loc = { ...action.payload.loc };
      return {
        ...state,
        activeLine: {
          startRow: loc.start.line - 1,
          startCol: loc.start.column,
          endRow: loc.end.line - 1,
          endCol: loc.end.column,
          type: 'background',
          className: 'activeLine'
        }
      };
    }
    case actionTypes.CALL_STACK_POP:
      return {
        ...state,
        activeLine: {}
      };
    case actionTypes.FINISHED_RUNNING:
      return {
        ...state,
        running: false
      };
    default:
      return state;
  }
};

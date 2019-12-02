import { combineReducers } from 'redux';

import code from './code';
import callStack from './callStack';

export default combineReducers({
  code,
  callStack
});

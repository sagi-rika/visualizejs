import { combineReducers } from 'redux';

import code from './code';
import callStack from './callStack';
import webApis from './webApis';

export default combineReducers({
  code,
  callStack,
  webApis
});

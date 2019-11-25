import { Parser } from 'acorn';
import * as actionTypes from './actionTypes';

export const updateCode = newCode => ({
  type: actionTypes.UPDATE_CODE,
  payload: { code: newCode }
});

export const run = code => {
  const tree = Parser.parse(code, {
    locations: true
  });
  return {
    type: actionTypes.RUN,
    payload: { tree }
  };
};

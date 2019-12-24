import * as actionTypes from './actionTypes';

export const webApisAdd = data => ({
  type: actionTypes.WEB_API_ADD,
  payload: data
});

export const webApisRemove = id => ({
  type: actionTypes.WEB_API_REMOVE,
  payload: { id }
});

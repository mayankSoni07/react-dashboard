import * as action from "redux/actionTypes/authentication";

export function authenticate(userData) {
  return {
    type: action.AUTHENTICATE,
    payload: userData,
  };
}
export function authenticated(payload) {
  return {
    type: action.AUTHENTICATE_SUCCESS,
    payload,
  };
}
export function authenticationFailure(payload) {
  return {
    type: action.AUTHENTICATE_FAIL,
    payload,
  };
}

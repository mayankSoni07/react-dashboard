import * as action from "redux/actionTypes/loader";

export function showLoader() {
  return {
    type: action.SHOW_LOADER,
  };
}
export function hideLoader() {
  return {
    type: action.HIDE_LOADER,
  };
}

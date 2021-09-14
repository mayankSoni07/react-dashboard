import * as action from "redux/actionTypes/toastAlert";

// Payload :
// toastAlertData : { isSuccess: Boolean(true/false), message: String }
export function showToastAlert(payload) {
  return {
    type: action.SHOW_TOAST_ALERT,
    payload: payload,
  };
}
export function hideToastAlert() {
  return {
    type: action.HIDE_TOAST_ALERT,
  };
}

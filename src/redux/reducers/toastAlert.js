import * as action from "redux/actionTypes/toastAlert";

const initialState = {};

const toastAlert = (state = initialState, { type, payload }) => {
  switch (type) {
    case action.SHOW_TOAST_ALERT:
      return { ...state, showToastAlert: true, toastAlertData: payload };
    case action.HIDE_TOAST_ALERT:
      return { ...state, showToastAlert: false, toastAlertData: null };

    default:
      return state;
  }
};

export default toastAlert;

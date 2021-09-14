import { call, put, all, takeLatest } from "redux-saga/effects";

import { authenticateUser } from "apis/authentication";
import {
  authenticated,
  authenticationFailure,
} from "redux/actionCreators/authentication";
import { showLoader, hideLoader } from "redux/actionCreators/loader";
import { showToastAlert } from "redux/actionCreators/toastAlert";
import { AUTHENTICATE } from "redux/actionTypes/authentication";
import {
  msg_loginSuccess,
  msg_loginFailure,
} from "variables/authentication/messages";

function* authenticateLoggedInUser(action) {
  try {
    yield put(showLoader());
    const data = yield call(() => authenticateUser(action.payload));
    yield put(hideLoader());
    yield put(showToastAlert({ isSuccess: true, message: msg_loginSuccess }));
    yield put(authenticated({ data }));
  } catch (er) {
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: false,
        message: er && er.error ? er.error : msg_loginFailure,
      })
    );
    yield put(authenticationFailure(er));
  }
}

export function* runAuthenticationCalls() {
  yield all([takeLatest(AUTHENTICATE, authenticateLoggedInUser)]);
}

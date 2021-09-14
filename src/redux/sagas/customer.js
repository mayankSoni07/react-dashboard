import { call, put, all, takeLatest } from "redux-saga/effects";

import {
  getCustomerData,
  addCustomer,
  editCustomer,
  deleteCustomer,
} from "apis/customer";
import {
  getCustomerDataSuccess,
  getCustomerDataFailure,
  addEditCustomerSuccess,
  addEditCustomerFailure,
  deleteCustomerSuccess,
  deleteCustomerFailure,
} from "redux/actionCreators/customer";
import { showLoader, hideLoader } from "redux/actionCreators/loader";
import { showToastAlert } from "redux/actionCreators/toastAlert";
import {
  msg_getCustomerDataSuccess,
  msg_getCustomerDataFailure,
  msg_addCustomerSuccess,
  msg_addCustomerFailure,
  msg_editCustomerSuccess,
  msg_editCustomerFailure,
  msg_deleteCustomerSuccess,
  msg_deleteCustomerFailure,
} from "variables/customer/messages";
import {
  GET_CUSTOMER_DATA,
  ADD_EDIT_CUSTOMER,
  DELETE_CUSTOMER,
} from "redux/actionTypes/customer";

function* getCustomerDataSaga(action) {
  try {
    yield put(showLoader());
    const data = yield call(() => getCustomerData(action.payload));
    yield put(hideLoader());
    yield put(
      showToastAlert({ isSuccess: true, message: msg_getCustomerDataSuccess })
    );
    yield put(getCustomerDataSuccess({ data }));
  } catch (er) {
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: false,
        message: er && er.error ? er.error : msg_getCustomerDataFailure,
      })
    );
    yield put(getCustomerDataFailure(er));
  }
}

function* addEditCustomerSaga(action) {
  try {
    yield put(showLoader());
    let data;
    if (action.payload.isEdit)
      data = yield call(() =>
        editCustomer(action.payload.values, action.payload.id)
      );
    else data = yield call(() => addCustomer(action.payload.values));
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: true,
        message:
          data && data.message
            ? data.message
            : action.payload.isEdit
            ? msg_editCustomerSuccess
            : msg_addCustomerSuccess,
      })
    );
    yield put(addEditCustomerSuccess({ data }));
  } catch (er) {
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: false,
        message:
          er && er.error
            ? er.error
            : action.payload.isEdit
            ? msg_editCustomerFailure
            : msg_addCustomerFailure,
      })
    );
    yield put(addEditCustomerFailure(er));
  }
}

function* deleteCustomerSaga(action) {
  try {
    yield put(showLoader());
    const data = yield call(() => deleteCustomer(action.payload));
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: true,
        message:
          data && data.message ? data.message : msg_deleteCustomerSuccess,
      })
    );
    yield put(deleteCustomerSuccess({ data }));
  } catch (er) {
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: false,
        message: er && er.error ? er.error : msg_deleteCustomerFailure,
      })
    );
    yield put(deleteCustomerFailure(er));
  }
}

export function* runCustomerCalls() {
  yield all([takeLatest(GET_CUSTOMER_DATA, getCustomerDataSaga)]);
  yield all([takeLatest(ADD_EDIT_CUSTOMER, addEditCustomerSaga)]);
  yield all([takeLatest(DELETE_CUSTOMER, deleteCustomerSaga)]);
}

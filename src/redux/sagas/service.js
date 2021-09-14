import { call, put, all, takeLatest } from "redux-saga/effects";

import {
  getServiceData,
  addService,
  editService,
  deleteService,
} from "apis/service";
import {
  getServiceDataSuccess,
  getServiceDataFailure,
  addEditServiceSuccess,
  addEditServiceFailure,
  deleteServiceSuccess,
  deleteServiceFailure,
} from "redux/actionCreators/service";
import { showLoader, hideLoader } from "redux/actionCreators/loader";
import { showToastAlert } from "redux/actionCreators/toastAlert";
import {
  msg_getServiceDataSuccess,
  msg_getServiceDataFailure,
  msg_addServiceSuccess,
  msg_addServiceFailure,
  msg_editServiceSuccess,
  msg_editServiceFailure,
  msg_deleteServiceSuccess,
  msg_deleteServiceFailure,
} from "variables/service/messages";
import {
  GET_SERVICE_DATA,
  ADD_EDIT_SERVICE,
  DELETE_SERVICE,
} from "redux/actionTypes/service";

function* getServiceDataSaga(action) {
  try {
    yield put(showLoader());
    const data = yield call(() => getServiceData(action.payload));
    yield put(hideLoader());
    yield put(
      showToastAlert({ isSuccess: true, message: msg_getServiceDataSuccess })
    );
    yield put(getServiceDataSuccess({ data }));
  } catch (er) {
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: false,
        message: er && er.error ? er.error : msg_getServiceDataFailure,
      })
    );
    yield put(getServiceDataFailure(er));
  }
}

function* addEditServiceSaga(action) {
  try {
    yield put(showLoader());
    let data;
    if (action.payload.isEdit)
      data = yield call(() =>
        editService(
          action.payload.values,
          action.payload.customerId,
          action.payload.id
        )
      );
    else
      data = yield call(() =>
        addService(action.payload.values, action.payload.customerId)
      );
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: true,
        message:
          data && data.message
            ? data.message
            : action.payload.isEdit
            ? msg_editServiceSuccess
            : msg_addServiceSuccess,
      })
    );
    yield put(addEditServiceSuccess({ data }));
  } catch (er) {
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: false,
        message:
          er && er.error
            ? er.error
            : action.payload.isEdit
            ? msg_editServiceFailure
            : msg_addServiceFailure,
      })
    );
    yield put(addEditServiceFailure(er));
  }
}

function* deleteServiceSaga(action) {
  try {
    yield put(showLoader());
    const data = yield call(() =>
      deleteService(action.payload.customerId, action.payload.id)
    );
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: true,
        message: data && data.message ? data.message : msg_deleteServiceSuccess,
      })
    );
    yield put(deleteServiceSuccess({ data }));
  } catch (er) {
    yield put(hideLoader());
    yield put(
      showToastAlert({
        isSuccess: false,
        message: er && er.error ? er.error : msg_deleteServiceFailure,
      })
    );
    yield put(deleteServiceFailure(er));
  }
}

export function* runServiceCalls() {
  yield all([takeLatest(GET_SERVICE_DATA, getServiceDataSaga)]);
  yield all([takeLatest(ADD_EDIT_SERVICE, addEditServiceSaga)]);
  yield all([takeLatest(DELETE_SERVICE, deleteServiceSaga)]);
}

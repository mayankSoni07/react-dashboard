import * as action from "redux/actionTypes/service";

// Fetch service list data
export function getServiceData(userData) {
  return {
    type: action.GET_SERVICE_DATA,
    payload: userData,
  };
}
export function getServiceDataSuccess(payload) {
  return {
    type: action.GET_SERVICE_DATA_SUCCESS,
    payload,
  };
}
export function getServiceDataFailure(payload) {
  return {
    type: action.GET_SERVICE_DATA_FAIL,
    payload,
  };
}

// Add/Edit service data
export function addEditService(serviceData) {
  return {
    type: action.ADD_EDIT_SERVICE,
    payload: serviceData,
  };
}
export function addEditServiceSuccess(payload) {
  return {
    type: action.ADD_EDIT_SERVICE_SUCCESS,
    payload,
  };
}
export function addEditServiceFailure(payload) {
  return {
    type: action.ADD_EDIT_SERVICE_FAIL,
    payload,
  };
}

// Delete service data
export function deleteService(payload) {
  return {
    type: action.DELETE_SERVICE,
    payload: payload,
  };
}
export function deleteServiceSuccess(payload) {
  return {
    type: action.DELETE_SERVICE_SUCCESS,
    payload,
  };
}
export function deleteServiceFailure(payload) {
  return {
    type: action.DELETE_SERVICE_FAIL,
    payload,
  };
}

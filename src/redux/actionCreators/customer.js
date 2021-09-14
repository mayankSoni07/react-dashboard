import * as action from "redux/actionTypes/customer";

// Fetch customer list data
export function getCustomerData(userData) {
  return {
    type: action.GET_CUSTOMER_DATA,
    payload: userData,
  };
}
export function getCustomerDataSuccess(payload) {
  return {
    type: action.GET_CUSTOMER_DATA_SUCCESS,
    payload,
  };
}
export function getCustomerDataFailure(payload) {
  return {
    type: action.GET_CUSTOMER_DATA_FAIL,
    payload,
  };
}

// Add/Edit customer data
export function addEditCustomer(customerData) {
  return {
    type: action.ADD_EDIT_CUSTOMER,
    payload: customerData,
  };
}
export function addEditCustomerSuccess(payload) {
  return {
    type: action.ADD_EDIT_CUSTOMER_SUCCESS,
    payload,
  };
}
export function addEditCustomerFailure(payload) {
  return {
    type: action.ADD_EDIT_CUSTOMER_FAIL,
    payload,
  };
}

// Delete customer data
export function deleteCustomer(customerId) {
  return {
    type: action.DELETE_CUSTOMER,
    payload: customerId,
  };
}
export function deleteCustomerSuccess(payload) {
  return {
    type: action.DELETE_CUSTOMER_SUCCESS,
    payload,
  };
}
export function deleteCustomerFailure(payload) {
  return {
    type: action.DELETE_CUSTOMER_FAIL,
    payload,
  };
}

// Reset Add/Edit/Delete Customer
export function resetAddEditDeleteCustomer() {
  return {
    type: action.RESET_ADD_EDIT_DELETE_CUSTOMER,
  };
}

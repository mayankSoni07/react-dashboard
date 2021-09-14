import * as action from "redux/actionTypes/customer";

const initialState = {};

const customer = (state = initialState, { type, payload }) => {
  switch (type) {
    case action.GET_CUSTOMER_DATA_SUCCESS:
      return { ...state, customerData: payload.data };
    case action.ADD_EDIT_CUSTOMER:
      return {
        ...state,
        addEditCustomerData: null,
      };
    case action.ADD_EDIT_CUSTOMER_SUCCESS:
      return { ...state, addEditCustomerData: payload.data };
    case action.DELETE_CUSTOMER:
      return {
        ...state,
        deleteCustomerSuccess: null,
      };
    case action.DELETE_CUSTOMER_SUCCESS:
      return { ...state, deleteCustomerSuccess: payload };
    case action.RESET_ADD_EDIT_DELETE_CUSTOMER:
      return {
        ...state,
        addEditCustomerData: null,
        deleteCustomerSuccess: null,
      };

    default:
      return state;
  }
};

export default customer;

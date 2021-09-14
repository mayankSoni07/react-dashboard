import * as action from "redux/actionTypes/service";

const initialState = {};

const service = (state = initialState, { type, payload }) => {
  switch (type) {
    case action.GET_SERVICE_DATA_SUCCESS:
      return { ...state, serviceData: payload.data };
    case action.ADD_EDIT_SERVICE:
      return {
        ...state,
        addEditServiceData: null,
      };
    case action.ADD_EDIT_SERVICE_SUCCESS:
      return { ...state, addEditServiceData: payload.data };
    case action.DELETE_SERVICE:
      return {
        ...state,
        deleteServiceSuccess: null,
      };
    case action.DELETE_SERVICE_SUCCESS:
      return { ...state, deleteServiceSuccess: payload };

    default:
      return state;
  }
};

export default service;

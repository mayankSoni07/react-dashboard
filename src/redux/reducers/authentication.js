import * as action from "redux/actionTypes/authentication";

const initialState = {};

const authenticateUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case action.AUTHENTICATE_SUCCESS:
      return { ...state, userData: payload.data };
    case action.AUTHENTICATE_FAIL:
      return { ...state, userData: payload };

    default:
      return state;
  }
};

export default authenticateUser;

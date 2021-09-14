import * as action from "redux/actionTypes/loader";

const initialState = {};

const loader = (state = initialState, { type }) => {
  switch (type) {
    case action.SHOW_LOADER:
      return { ...state, isLoading: true };
    case action.HIDE_LOADER:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default loader;

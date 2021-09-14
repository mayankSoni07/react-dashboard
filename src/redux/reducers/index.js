import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import loader from "./loader";
import toastAlert from "./toastAlert";
import authentication from "./authentication";
import customer from "./customer";
import service from "./service";

const reducer = {
  loader,
  toastAlert,
  authentication,
  customer,
  service,
  form: formReducer,
};

export default combineReducers(reducer);

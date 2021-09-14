import { all } from "redux-saga/effects";
import { runAuthenticationCalls } from "./authentication";
import { runCustomerCalls } from "./customer";
import { runServiceCalls } from "./service";

function* index() {
  yield all([runAuthenticationCalls(), runCustomerCalls(), runServiceCalls()]);
}

export default index;

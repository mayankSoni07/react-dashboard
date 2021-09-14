/*eslint-disable*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { hideToastAlert } from "redux/actionCreators/toastAlert";

const toastDuration = 5000;

export default function ToastAlert() {
  const dispatch = useDispatch();
  // Extract data from reducers
  const { showToastAlert, toastAlertData } = useSelector(
    (state) => state.toastAlert
  );

  // Will run whenever showToastAlert value will change
  useEffect(() => {
    // To hide toaster after given time
    if (showToastAlert)
      setTimeout(() => {
        dispatch(hideToastAlert());
      }, toastDuration);
  }, [showToastAlert]);

  if (showToastAlert)
    return (
      <Snackbar open={true} autoHideDuration={toastDuration}>
        <Alert
          severity={toastAlertData.isSuccess ? "success" : "error"}
          elevation={6}
          variant="filled"
        >
          <AlertTitle>
            {toastAlertData.isSuccess ? "Success" : "Error"}
          </AlertTitle>
          {toastAlertData.message}
        </Alert>
      </Snackbar>
    );
  else return "";
}

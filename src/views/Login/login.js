/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";

import { encryption } from "utils/utilities";
import { authenticate } from "redux/actionCreators/authentication";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Loader from "components/Loader/Loader";
import ToastAlert from "components/ToastAlert/ToastAlert";

// Style
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/loginStyle.js";
const useStyles = makeStyles(styles);

export default function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // State
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [touched, setTouched] = useState({});
  const [error, setError] = useState();

  // Extract data from reducers
  const { userData } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (userData && userData.token) {
      localStorage.setItem("token", userData.token);
      location.reload();
    }
    if (userData && userData.error) {
      setError(userData.error.message);
    }
  }, [userData]);

  // To check text is valid or not
  const isNotValid = (text) => {
    if (text.trim().length <= 0) return true;
    else return false;
  };

  return (
    <div className={classes.flexCenter}>
      <Loader />
      <ToastAlert />
      <Card style={{ width: "max-content" }}>
        <CardHeader color="info" stats icon>
          <CardIcon color="info">
            <Lock />
          </CardIcon>
          <div>
            <h3 className={classes.cardTitle} style={{ color: "gray" }}>
              Login
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          <div style={{ width: "400px" }}>
            <CustomInput
              inputProps={{
                value: usernameInput,
                onChange: (e) => {
                  setError(undefined);
                  if (!touched["username"])
                    setTouched({ ...touched, username: true });
                  setUsernameInput(e.target.value);
                }
              }}
              labelText="Username"
              id="username"
              formControlProps={{ fullWidth: true }}
              error={touched["username"] && isNotValid(usernameInput)}
            />
            {touched["username"] && isNotValid(usernameInput) ? (
              <span className={classes.labelError}>Invalid Input</span>
            ) : (
              ""
            )}
          </div>
          <div style={{ width: "400px" }}>
            <CustomInput
              inputProps={{
                type: "password",
                value: passwordInput,
                onChange: (e) => {
                  setError(undefined);
                  if (!touched["password"])
                    setTouched({ ...touched, password: true });
                  setPasswordInput(e.target.value);
                }
              }}
              labelText="Password"
              id="password"
              formControlProps={{ fullWidth: true }}
              error={touched["password"] && isNotValid(passwordInput)}
            />
            {touched["password"] && isNotValid(passwordInput) ? (
              <span className={classes.labelError}>Invalid Input</span>
            ) : (
              ""
            )}
          </div>
          {error ? <span className={classes.labelError}>{error}</span> : ""}
        </CardBody>
        <div className={classes.flexCenter}>
          <CardFooter>
            <Button
              disabled={isNotValid(usernameInput) || isNotValid(passwordInput)}
              variant="contained"
              className={
                isNotValid(usernameInput) || isNotValid(passwordInput)
                  ? classes.loginButtonDisabled
                  : classes.loginButton
              }
              onClick={() => {
                dispatch(
                  authenticate({
                    // email: encryption(usernameInput),
                    // password: encryption(passwordInput)
                    email: usernameInput,
                    password: passwordInput
                  })
                );
              }}
            >
              Login
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}

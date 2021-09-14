import {
  infoCardHeader,
  dangerColor,
} from "assets/jss/material-dashboard-react.js";

const loginStyle = {
  flexCenter: {
    display: "flex",
    justifyContent: "center",
  },
  loginButton: {
    ...infoCardHeader,
    color: "#fff",
  },
  loginButtonDisabled: {
    color: "#fff !important",
    cursor: "no-drop !important",
  },
  labelError: {
    color: dangerColor[0],
  },
};

export default loginStyle;

import { infoColor } from "assets/jss/material-dashboard-react.js";

const customerStyle = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  headLabel: {
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  fullWidth: {
    width: "100%",
  },
  rightAlign: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  mb20: {
    marginBottom: "20px",
  },
  customerDetails: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  customerDetailsWrapper: {
    display: "flex",
    flexDirection: "column",
    border: `2px dashed ${infoColor[0]}`,
    color: infoColor[0],
    fontWeight: "500",
    padding: "20px",
    borderRadius: "8px",
    width: "fit-content",
  },
};

export default customerStyle;

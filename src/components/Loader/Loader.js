import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  background: {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "99999",
    background: "rgba(0,0,0,0.5)",
  },
  loader: {
    position: "fixed",
    left: "50%",
    top: "50%",
    zIndex: 99999999999,
  },
});

export default function Loader() {
  const classes = useStyles();
  // Extract data from reducers
  const { isLoading } = useSelector((state) => state.loader);
  if (isLoading)
    return (
      <div className={classes.background}>
        <CircularProgress className={classes.loader} />
      </div>
    );
  else return "";
}

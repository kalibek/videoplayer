import React from "react";
import {CircularProgress} from "@material-ui/core";

function LoadingSpinner(props) {
  return <div style={{
    width: "100%",
    height: "100vh",
    position: "absolute",
    zIndex: 9999999,
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    opacity: 0.6,
    textAlign: "center",
  }}
  >
    <h1 style={{lineHeight: '100vh'}}><CircularProgress/> Loading</h1>
  </div>;
}

export default LoadingSpinner;
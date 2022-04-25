import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@reach/dialog/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")!
);

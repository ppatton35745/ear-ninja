import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./styles/index.css";
import "./styles/nav.css";
import "./styles/header.css";
import "./styles/info.css";
import "./styles/submitControl.css";
import "./styles/piano.css";
import "./styles/deadPianos.css";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

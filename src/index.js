import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/build/styles.css";

import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";
import "./index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

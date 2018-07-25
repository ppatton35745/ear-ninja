import React from "react";
import ReactDOM from "react-dom";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/build/styles.css";

import ResponsivePiano from "./ResponsivePiano";

import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";
import "./index.css";

export default function App() {
  return (
    <div>
      <ResponsivePiano />
    </div>
  );
}

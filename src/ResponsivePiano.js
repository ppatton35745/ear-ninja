import React from "react";
// import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import Piano from "./piano/Piano";
import KeyboardShortcuts from "./piano/KeyboardShortcuts";
import MidiNumbers from "./piano/MidiNumbers";

import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";
import TestBox from "./TestBox";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("c5")
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW
});

export default function ResponsivePiano() {
  return (
    <div>
      <DimensionsProvider>
        {({ containerWidth, containerHeight }) => (
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
              <React.Fragment>
                <TestBox
                  onPlayNote={playNote}
                  onStopNote={stopNote}
                  disabled={isLoading}
                />
                <Piano
                  noteRange={noteRange}
                  width={containerWidth}
                  onPlayNote={playNote}
                  onStopNote={stopNote}
                  disabled={isLoading}
                />
              </React.Fragment>
            )}
          />
        )}
      </DimensionsProvider>
    </div>
  );
}

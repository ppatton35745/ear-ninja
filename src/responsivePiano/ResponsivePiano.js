import React from "react";
// import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import Piano from "../piano/Piano";
import KeyboardShortcuts from "../piano/KeyboardShortcuts";
import MidiNumbers from "../piano/MidiNumbers";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("c5")
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.PHILS_ROW
});

export default class ResponsivePiano extends React.Component {
  render() {
    return (
      <Piano
        width={this.props.width}
        onPlayNote={this.props.onPlayNote}
        onStopNote={this.props.onStopNote}
        disabled={this.props.disabled}
        noteRange={noteRange}
        keyboardShortcuts={keyboardShortcuts}
        currentAnswerNotes={this.props.currentAnswerNotes}
        hintNotes={this.props.hintNotes}
        shownAnswers={this.props.shownAnswers}
        timeRemaining={this.props.timeRemaining}
        inRound={this.props.inRound}
        submitAnswerDisabled={this.props.submitAnswerDisabled}
      />
    );
  }
}

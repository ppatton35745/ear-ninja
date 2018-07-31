import React from "react";
import PropTypes from "prop-types";
import range from "lodash.range";

import DeadKey from "./DeadKey";
import MidiNumbers from "../piano/MidiNumbers";

class DeadKeyboard extends React.Component {
  static propTypes = {
    noteRange: noteRangePropType,
    keyWidthToHeight: PropTypes.number.isRequired,
    width: PropTypes.number,
    completedQuestion: PropTypes.object
  };

  static defaultProps = {
    keyWidthToHeight: 0.25
  };

  // Range of midi numbers on keyboard
  getMidiNumbers() {
    return range(this.props.noteRange.first, this.props.noteRange.last + 1);
  }

  getNaturalKeyCount() {
    return this.getMidiNumbers().filter(number => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    }).length;
  }

  // Returns a ratio between 0 and 1
  getNaturalKeyWidth() {
    return 1 / this.getNaturalKeyCount();
  }

  getWidth() {
    return this.props.width ? this.props.width : "100%";
  }

  getHeight() {
    if (!this.props.width) {
      return "100%";
    }
    const keyWidth = this.props.width * this.getNaturalKeyWidth();
    return `${keyWidth / this.props.keyWidthToHeight}px`;
  }

  render() {
    const naturalKeyWidth = this.getNaturalKeyWidth();
    return (
      <div
        className="ReactPiano__Keyboard"
        style={{ width: this.getWidth(), height: this.getHeight() }}
      >
        {this.getMidiNumbers().map(midiNumber => {
          const { isAccidental } = MidiNumbers.getAttributes(midiNumber);
          const isGuessedAnswer = this.props.completedQuestion.answerNotes.includes(
            midiNumber
          );
          const isCorrectAnswer = this.props.completedQuestion.questionNotes.includes(
            midiNumber
          );
          return (
            <DeadKey
              naturalKeyWidth={naturalKeyWidth}
              midiNumber={midiNumber}
              noteRange={this.props.noteRange}
              accidental={isAccidental}
              key={midiNumber}
              isCorrectAnswer={isCorrectAnswer}
              isGuessedAnswer={isGuessedAnswer}
            />
          );
        })}
      </div>
    );
  }
}

function isNaturalMidiNumber(value) {
  if (typeof value !== "number") {
    return false;
  }
  return MidiNumbers.NATURAL_MIDI_NUMBERS.includes(value);
}

function noteRangePropType(props, propName, componentName) {
  const { first, last } = props[propName];
  if (!first || !last) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. ${propName} must be an object with .first and .last values.`
    );
  }
  if (!isNaturalMidiNumber(first) || !isNaturalMidiNumber(last)) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. ${propName} values must be valid MIDI numbers, and should not be accidentals (sharp or flat notes).`
    );
  }
  if (first >= last) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. ${propName}.first must be smaller than ${propName}.last.`
    );
  }
}

export default DeadKeyboard;

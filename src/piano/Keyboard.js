import React from "react";
import PropTypes from "prop-types";
import range from "lodash.range";

import Key from "./Key";
import MidiNumbers from "./MidiNumbers";

class Keyboard extends React.Component {
  static propTypes = {
    noteRange: noteRangePropType,
    activeNotes: PropTypes.arrayOf(PropTypes.number),
    hintNotes: PropTypes.arrayOf(PropTypes.number),
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    renderNoteLabel: PropTypes.func.isRequired,
    keyWidthToHeight: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    gliss: PropTypes.bool,
    useTouchEvents: PropTypes.bool,
    // If width is not provided, must have fixed width and height in parent container
    width: PropTypes.number
  };

  static defaultProps = {
    disabled: false,
    gliss: false,
    useTouchEvents: false,
    keyWidthToHeight: 0.25,
    renderNoteLabel: () => {}
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
          const isActive = this.props.activeNotes.includes(midiNumber);
          const isAnswer = this.props.currentAnswerNotes
            ? this.props.currentAnswerNotes.includes(midiNumber)
            : null;
          const isHint = this.props.hintNotes
            ? this.props.hintNotes.includes(midiNumber)
            : null;
          return (
            <Key
              naturalKeyWidth={naturalKeyWidth}
              midiNumber={midiNumber}
              noteRange={this.props.noteRange}
              active={isActive}
              isAnswer={isAnswer}
              isHint={isHint}
              accidental={isAccidental}
              disabled={this.props.disabled}
              onPlayNote={this.props.onPlayNote}
              onStopNote={this.props.onStopNote}
              gliss={this.props.gliss}
              useTouchEvents={this.props.useTouchEvents}
              key={midiNumber}
              currentAnswerNotes={this.props.currentAnswerNotes}
              timeRemaining={this.props.timeRemaining}
              inRound={this.props.inRound}
            >
              {this.props.disabled
                ? null
                : this.props.renderNoteLabel({
                    isActive,
                    isAccidental,
                    midiNumber
                  })}
            </Key>
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

export default Keyboard;

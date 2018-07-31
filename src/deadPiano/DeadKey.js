import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MidiNumbers from "../piano/MidiNumbers";

class DeadKey extends React.Component {
  static propTypes = {
    midiNumber: PropTypes.number.isRequired,
    naturalKeyWidth: PropTypes.number.isRequired, // Width as a ratio between 0 and 1
    accidental: PropTypes.bool.isRequired,
    accidentalWidthRatio: PropTypes.number.isRequired,
    pitchPositions: PropTypes.object.isRequired,
    isCorrectAnswer: PropTypes.bool,
    isGuessedAnswer: PropTypes.bool
  };

  static defaultProps = {
    accidentalWidthRatio: 0.65,
    pitchPositions: {
      C: 0,
      Db: 0.55,
      D: 1,
      Eb: 1.8,
      E: 2,
      F: 3,
      Gb: 3.5,
      G: 4,
      Ab: 4.7,
      A: 5,
      Bb: 5.85,
      B: 6
    }
  };
  // Key position is represented by the number of natural key widths from the left
  getAbsoluteKeyPosition(midiNumber) {
    const OCTAVE_WIDTH = 7;
    const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
    const pitchPosition = this.props.pitchPositions[pitchName];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  }

  getRelativeKeyPosition(midiNumber) {
    return (
      this.getAbsoluteKeyPosition(midiNumber) -
      this.getAbsoluteKeyPosition(this.props.noteRange.first)
    );
  }

  render() {
    const {
      naturalKeyWidth,
      accidentalWidthRatio,
      midiNumber,
      accidental,
      isCorrectAnswer,
      isGuessedAnswer
    } = this.props;

    // Need to conditionally include/exclude handlers based on useTouchEvents,
    // because otherwise mobile taps double fire events.
    return (
      <div
        className={classNames("ReactPiano__Key", {
          "ReactPiano__Key--accidental": accidental,
          "ReactPiano__Key--natural": !accidental,
          "ReactPiano__Key--correctAnswer": isCorrectAnswer,
          "ReactPiano__Key--guessedAnswer": isGuessedAnswer
          // "ReactPiano__Key--disabled": disabled,
          // "ReactPiano__Key--active": active,
          // "ReactPiano__Key--answer": isAnswer,
          // "ReactPiano__Key--hint": isHint
        })}
        style={{
          left: ratioToPercentage(
            this.getRelativeKeyPosition(midiNumber) * naturalKeyWidth
          ),
          width: ratioToPercentage(
            accidental
              ? accidentalWidthRatio * naturalKeyWidth
              : naturalKeyWidth
          )
        }}
      />
    );
  }
}

function ratioToPercentage(ratio) {
  return `${ratio * 100}%`;
}

export default DeadKey;

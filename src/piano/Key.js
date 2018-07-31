import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MidiNumbers from "./MidiNumbers";

class Key extends React.Component {
  static propTypes = {
    midiNumber: PropTypes.number.isRequired,
    naturalKeyWidth: PropTypes.number.isRequired, // Width as a ratio between 0 and 1
    gliss: PropTypes.bool.isRequired,
    useTouchEvents: PropTypes.bool.isRequired,
    accidental: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    isAnswer: PropTypes.bool.isRequired,
    isHint: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    accidentalWidthRatio: PropTypes.number.isRequired,
    pitchPositions: PropTypes.object.isRequired,
    children: PropTypes.node,
    currentAnswerNotes: PropTypes.array,
    timeRemaining: PropTypes.number
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

  playNote = () => {
    this.props.onPlayNote(this.props.midiNumber);
  };

  stopNote = () => {
    this.props.onStopNote(this.props.midiNumber);
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

  toggleCurrentAnswers() {
    if (!this.props.currentAnswerNotes) {
      return;
    }
    const answerIndex = this.props.currentAnswerNotes.indexOf(
      this.props.midiNumber
    );
    if (answerIndex === -1) {
      this.props.currentAnswerNotes.push(this.props.midiNumber);
      this.props.currentAnswerNotes.sort();
    }
  }

  render() {
    const {
      naturalKeyWidth,
      accidentalWidthRatio,
      midiNumber,
      gliss,
      useTouchEvents,
      accidental,
      active,
      isAnswer,
      isHint,
      disabled,
      children
    } = this.props;

    // Need to conditionally include/exclude handlers based on useTouchEvents,
    // because otherwise mobile taps double fire events.
    return (
      <div
        className={classNames("ReactPiano__Key", {
          "ReactPiano__Key--accidental": accidental,
          "ReactPiano__Key--natural": !accidental,
          "ReactPiano__Key--disabled": disabled,
          "ReactPiano__Key--active": active,
          "ReactPiano__Key--answer": isAnswer,
          "ReactPiano__Key--hint": isHint
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
        onMouseDown={useTouchEvents ? null : this.playNote}
        onMouseUp={() => {
          useTouchEvents ? null : this.stopNote();
          if (this.props.timeRemaining === 0) {
            return;
          }
          this.toggleCurrentAnswers();
        }}
        onMouseEnter={gliss ? this.playNote : null}
        onMouseLeave={this.stopNote}
        onTouchStart={useTouchEvents ? this.playNote : null}
        onTouchCancel={useTouchEvents ? this.stopNote : null}
        onTouchEnd={useTouchEvents ? this.stopNote : null}
      >
        <div className="ReactPiano__NoteLabelContainer">{children}</div>
      </div>
    );
  }
}

function ratioToPercentage(ratio) {
  return `${ratio * 100}%`;
}

export default Key;

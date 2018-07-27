import React from "react";
import PropTypes from "prop-types";
import getInterval from "./getInterval";
import hinter from "./hinter";

export default class Tester extends React.Component {
  static propTypes = {
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    timeRemaining: PropTypes.number.isRequired,
    currentKey: PropTypes.string,
    setCurrentKey: PropTypes.func.isRequired,
    currentQuestionNotes: PropTypes.array.isRequired,
    setCurrentQuestionNotes: PropTypes.func.isRequired,
    currentQuestionNumber: PropTypes.number.isRequired,
    clearCurrentAnswerNotes: PropTypes.func.isRequired,
    submitAnswer: PropTypes.func.isRequired,
    initialPlay: PropTypes.bool.isRequired,
    setInitialPlay: PropTypes.func.isRequired,
    onHintNote: PropTypes.func.isRequired,
    offHintNote: PropTypes.func.isRequired,
    hintNotes: PropTypes.arrayOf(PropTypes.number.isRequired),
    currentAnswerNotes: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.musicKeys = [
      "C",
      "Db",
      "D",
      "Eb",
      "E",
      "F",
      "Gb",
      "G",
      "Ab",
      "A",
      "Bb",
      "B"
    ];
    this.seedNotes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
    this.upPattern = [2, 2, 1, 2, 2, 2, 1];
    this.downPattern = [1, 2, 2, 2, 1, 2, 2];
    this.noteRange = { min: 48, max: 72 };
  }

  setCurrentKey() {
    const randomKeyNum = Math.floor(Math.random() * 12);
    this.props.setCurrentKey(this.musicKeys[randomKeyNum]);
  }

  setInterval(seedNote) {
    this.props.setCurrentQuestionNotes(
      getInterval(
        seedNote,
        this.downPattern,
        this.upPattern,
        this.noteRange.min,
        this.noteRange.max
      )
    );
  }

  playInterval() {
    hinter.playInterval(this.props.currentQuestionNotes, this.props.onPlayNote);
  }

  playTeasedInterval() {
    hinter.playTeasedInterval(
      this.props.currentQuestionNotes,
      this.props.onPlayNote
    );
  }

  playScale() {
    const note = this.seedNotes[this.musicKeys.indexOf(this.props.currentKey)];
    hinter.playScale(
      note,
      this.props.onPlayNote,
      this.props.onStopNote,
      this.upPattern,
      this.downPattern,
      this.props.onHintNote,
      this.props.offHintNote
    );
  }

  componentDidMount() {
    this.setCurrentKey();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentKey === "") {
      this.setCurrentKey();
    } else if (this.props.currentQuestionNotes.length === 0) {
      this.setInterval(
        this.seedNotes[this.musicKeys.indexOf(this.props.currentKey)]
      );
    } else if (!this.props.initialPlay && !this.props.disabled) {
      this.playScale();
      setTimeout(() => this.playInterval(), 4000);
      this.props.setInitialPlay();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Phils TestBox</h1>
        <button
          onClick={() => {
            this.playInterval();
          }}
        >
          Play Interval/s
        </button>
        <button
          onClick={() => {
            this.playTeasedInterval();
          }}
        >
          Tease Interval/s
        </button>
        <button
          onClick={() => {
            this.playScale();
          }}
        >
          Play Scale
        </button>
        <button
          onClick={() => {
            this.props.clearCurrentAnswerNotes();
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            this.props.submitAnswer();
          }}
        >
          Submit
        </button>
        <button>Time Remaining: {this.props.timeRemaining}</button>
        <button>Key: {this.props.currentKey}</button>
        <button>Question #: {this.props.currentQuestionNumber}</button>
        <button>
          Current Question:{" "}
          {this.props.currentQuestionNotes.map(note => (
            <span key={note}>{note + " "}</span>
          ))}
        </button>
        <button>
          Current Answers:{" "}
          {this.props.currentAnswerNotes.map(note => (
            <span key={note}> {note + " "}</span>
          ))}
        </button>
      </React.Fragment>
    );
  }
}

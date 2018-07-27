import React from "react";
import PropTypes from "prop-types";

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
    hintNotes: PropTypes.arrayOf(PropTypes.number.isRequired)
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

  setInterval(seedNote) {
    const scalarNotes = [];
    let i = seedNote;
    let j = 0;

    scalarNotes.push(i);

    while ((i -= this.downPattern[j % 7]) >= this.noteRange.min) {
      scalarNotes.push(i);
      j++;
    }

    i = seedNote;
    j = 0;

    while ((i += this.upPattern[j % 7]) <= this.noteRange.max) {
      scalarNotes.push(i);
      j++;
    }

    scalarNotes.sort();

    const notes = [];

    for (let i = 0; i < 2; i++) {
      notes.push(scalarNotes[Math.floor(Math.random() * scalarNotes.length)]);
    }
    notes.sort();
    this.props.setCurrentQuestionNotes(notes);
  }

  setCurrentKey() {
    const randomKeyNum = Math.floor(Math.random() * 12);
    this.props.setCurrentKey(this.musicKeys[randomKeyNum]);
  }

  playInterval() {
    this.props.currentQuestionNotes.forEach(note => {
      this.props.onPlayNote(note);
    });
  }

  playTeasedInterval() {
    const notes = this.props.currentQuestionNotes;
    const play = this.props.onPlayNote;
    const playDelayed = note => {
      setTimeout(() => play(note), 600);
    };

    play(notes[0]);
    let i = 1;
    while (i < notes.length) {
      playDelayed(notes[i]);
      i++;
    }
  }

  playScale() {
    const play = this.props.onPlayNote;
    const stop = this.props.onStopNote;
    let note = this.seedNotes[this.musicKeys.indexOf(this.props.currentKey)];
    const playDelayed = (note, j, from) => {
      setTimeout(() => {
        play(note);
      }, j * 200);
      setTimeout(() => {
        this.props.onHintNote(note);
      }, j * 215);

      setTimeout(() => {
        stop(note);
      }, j * 200 + 199);
      setTimeout(() => {
        this.props.offHintNote(note);
      }, j * 215 + 199);
    };

    let j = 0;

    while (j <= this.upPattern.length) {
      playDelayed(note, j, "up");
      if (j !== this.upPattern.length) {
        note += this.upPattern[j];
      }
      j++;
    }

    let k = 0;

    while (k <= this.downPattern.length) {
      playDelayed(note, j, "down");

      note -= this.downPattern[k];
      j++;
      k++;
    }
  }

  onHintNote = midiNumber => {
    if (this.props.disabled) {
      return;
    }
    // Prevent duplicate note firings
    const isHint = this.props.hintNotes.includes(midiNumber);
    if (isHint) {
      return;
    }

    this.props.hintNotes.push(midiNumber);
  };

  offHintNote = midiNumber => {
    if (this.props.disabled) {
      return;
    }
    // Prevent duplicate note firings
    const isHint = this.props.hintNotes.includes(midiNumber);
    if (!isHint) {
      return;
    }

    this.props.hintNotes.push(midiNumber);
  };

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

  componentDidMount() {
    this.setCurrentKey();
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
        <button>{this.props.timeRemaining}</button>
      </React.Fragment>
    );
  }
}

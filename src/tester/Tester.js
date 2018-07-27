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
    clearCurrentAnswerNotes: PropTypes.func.isRequired
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

  setInterval(scalarNotes) {
    console.log("tried to get interval");
    const notes = [];
    console.log("scalar notes", scalarNotes);
    for (let i = 0; i < 2; i++) {
      notes.push(scalarNotes[Math.floor(Math.random() * scalarNotes.length)]);
    }
    notes.sort();
    this.props.setCurrentQuestionNotes(notes);
  }

  getScalarNotes(seedNote) {
    const scalarNotes = [];
    let i = seedNote;
    console.log("seedNote", seedNote);
    console.log("i", i);
    let j = 0;

    scalarNotes.push(i);

    while ((i -= this.downPattern[j % 7]) >= this.noteRange.min) {
      scalarNotes.push(i);
      j++;
    }

    i = seedNote;
    console.log(i);
    j = 0;

    while ((i += this.upPattern[j % 7]) <= this.noteRange.max) {
      scalarNotes.push(i);
      j++;
    }

    scalarNotes.sort();

    this.setInterval(scalarNotes);
  }

  setCurrentKey() {
    const randomKeyNum = Math.floor(Math.random() * 12);
    this.props.setCurrentKey(this.musicKeys[randomKeyNum]);
    this.getScalarNotes(this.seedNotes[randomKeyNum]);
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
      console.log(from, note, j);
      setTimeout(() => play(note), j * 250);
      setTimeout(() => stop(note), j * 250 + 249);
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
    console.log("test1", note);
    console.log("test2", this.downPattern[k]);

    while (k <= this.downPattern.length) {
      playDelayed(note, j, "down");

      note -= this.downPattern[k];
      j++;
      k++;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentQuestionNumber !== this.props.currentQuestionNumber) {
      this.setCurrentKey();
    }
    if (prevProps.currentQuestionNotes !== this.props.currentQuestionNotes) {
      console.log("questionNotes set", this.props.currentQuestionNotes);
    }
  }

  componentDidMount() {
    this.setCurrentKey();
    setTimeout(() => {
      console.log("tried to play interval");
      console.log("current test question", this.props.currentQuestionNotes);
      this.playInterval();
    }, 1000);
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
            alert("answer submitted!");
          }}
        >
          Submit
        </button>
        <button>{this.props.timeRemaining}</button>
      </React.Fragment>
    );
  }
}

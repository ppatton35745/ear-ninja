import React from "react";
import ResponsivePiano from "./ResponsivePiano";
import getInterval from "./tester/getInterval";
import hinter from "./tester/hinter";
import DimensionsProvider from "./misc/DimensionsProvider";
import PropTypes from "prop-types";
import Nav from "./Nav";
import Header from "./Header";
import Info from "./Info";

export default class Round extends React.Component {
  static propTypes = {
    toggleInRound: PropTypes.func.isRequired,
    setRoundResults: PropTypes.func.isRequired,
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    inRound: PropTypes.bool.isRequired,
    viewingStats: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: 60,
      currentKey: "",
      currentQuestionNumber: 0,
      currentQuestionNotes: [],
      currentAnswerNotes: [],
      completedQuestions: [],
      hintNotes: [],
      timerRunning: false
    };
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
    this.setState({ currentKey: this.musicKeys[randomKeyNum] });
  }

  setCurrentQuestionNotes = seedNote => {
    const notes = getInterval(
      seedNote,
      this.downPattern,
      this.upPattern,
      this.noteRange.min,
      this.noteRange.max
    );
    notes.sort();
    this.setState({
      currentQuestionNumber: (this.state.currentQuestionNumber += 1),
      currentQuestionNotes: notes
    });
  };

  startTimer() {
    const timerInterval = setInterval(() => {
      const timeRemaining = this.state.timeRemaining;
      if (!this.state.timerRunning) {
        this.setState({
          timeRemaining: timeRemaining,
          timerRunning: true
        });
      } else if (timeRemaining === 0) {
        clearImmediate(timerInterval);
      } else {
        this.setState({
          timeRemaining: timeRemaining - 1
        });
      }
    }, 1000);
  }

  onHintNote = midiNumber => {
    const isHint = this.state.hintNotes.includes(midiNumber);
    if (isHint) {
      return;
    }

    this.setState(prevState => ({
      hintNotes: prevState.hintNotes.concat(midiNumber).sort()
    }));
  };

  offHintNote = midiNumber => {
    const isNotHint = !this.state.hintNotes.includes(midiNumber);
    if (isNotHint) {
      return;
    }

    this.setState(prevState => ({
      hintNotes: prevState.hintNotes.filter(note => midiNumber !== note)
    }));
  };

  playInterval() {
    if (this.props.disabled) {
      return;
    }
    hinter.playInterval(this.state.currentQuestionNotes, this.props.onPlayNote);
  }

  playTeasedInterval() {
    if (this.props.disabled) {
      return;
    }

    hinter.playTeasedInterval(
      this.state.currentQuestionNotes,
      this.props.onPlayNote
    );
  }

  playScale() {
    if (this.props.disabled) {
      return;
    }
    const note = this.seedNotes[this.musicKeys.indexOf(this.state.currentKey)];
    hinter.playScale(
      note,
      this.props.onPlayNote,
      this.props.onStopNote,
      this.upPattern,
      this.downPattern,
      this.onHintNote,
      this.offHintNote
    );
  }

  clearCurrentAnswerNotes = () => {
    this.setState({
      currentAnswerNotes: []
    });
  };

  submitAnswer = () => {
    this.state.completedQuestions.push({
      key: this.state.currentKey,
      questionNumber: this.state.currentQuestionNumber,
      questionNotes: this.state.currentQuestionNotes,
      answerNotes: this.state.currentAnswerNotes
    });

    this.setState({
      currentKey: "",
      currentQuestionNumber: this.state.currentQuestionNumber + 1,
      currentQuestionNotes: [],
      currentAnswerNotes: [],
      initialPlay: false
    });
  };

  getScore = () => {
    let questions = 0;
    let correctAnswers = 0;
    this.state.completedQuestions.forEach(question => {
      let correct = true;

      if (question.questionNotes.length === question.answerNotes.length) {
        question.questionNotes.forEach((questionNote, index) => {
          if (questionNote !== question.answerNotes[index]) {
            correct = false;
          }
        });
      } else {
        correct = false;
      }

      questions += 1;
      if (correct) {
        correctAnswers += 1;
      }
    });

    return { possible: questions, correct: correctAnswers };
  };

  componentDidMount() {
    this.setCurrentKey();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentKey === "") {
      console.log("setting current key");
      this.setCurrentKey();
    } else if (this.state.currentQuestionNotes.length === 0) {
      console.log("setting current test notes");
      this.setCurrentQuestionNotes(
        this.seedNotes[this.musicKeys.indexOf(this.props.currentKey)]
      );
    } else if (
      this.state.currentQuestionNumber !== prevState.currentQuestionNumber
    ) {
      console.log("playing initial test");
      this.playScale();
      setTimeout(() => this.playInterval(), 4000);
    } else if (!this.state.timerRunning) {
      console.log("starting timer");
      this.startTimer();
      this.setState({
        timerRunning: true
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Nav
          playScale={this.playScale}
          playInterval={this.playInterval}
          playTeasedInterval={this.playTeasedInterval}
        />
        <Header
          timeRemaining={this.state.timeRemaining}
          currentKey={this.state.currentKey}
          currentScore={this.getScore()}
          inRound={this.props.inRound}
          // viewingStats={this.props.viewingStats}
        />
        <Info
          completedQuestions={this.state.completedQuestions}
          inRound={this.props.inRound}
        />
        <DimensionsProvider>
          {({ containerWidth, containerHeight }) => (
            <ResponsivePiano
              width={containerWidth}
              onPlayNote={this.props.onPlayNote}
              onStopNote={this.props.onStopNote}
              disabled={this.props.disabled}
              currentAnswerNotes={this.state.currentAnswerNotes}
              hintNotes={this.state.hintNotes}
              // clear={this.clearCurrentAnswerNotes}
              // submit={this.submitAnswer}
            />
          )}
        </DimensionsProvider>
      </React.Fragment>
    );
  }
}

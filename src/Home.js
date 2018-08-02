import React from "react";
import PropTypes from "prop-types";
import ResponsivePiano from "./ResponsivePiano";
import Nav from "./Nav";
import Header from "./Header";
import Info from "./Info";
import getInterval from "./tester/getInterval";
import hinter from "./tester/hinter";
import Api from "./api/apiManager";

export default class Home extends React.Component {
  static propTypes = {
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    toggleInRound: PropTypes.func.isRequired,
    toggleViewingStats: PropTypes.func.isRequired,
    roundResults: PropTypes.array.isRequired,
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
      inRound: false,
      timerRunning: false,
      submitAnswerDisabled: false
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

  startRound = () => {
    if (!this.state.inRound) {
      this.setState({
        inRound: true,
        completedQuestions: []
      });
    }
  };

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
      currentQuestionNumber: this.state.currentQuestionNumber + 1,
      currentQuestionNotes: notes
    });
  };

  startTimer() {
    const timerInterval = setInterval(() => {
      const timeRemaining = this.state.timeRemaining;
      if (this.state.inRound && !this.state.timerRunning) {
        this.setState({
          timeRemaining: 60,
          timerRunning: true
        });
      } else if (!this.state.inRound) {
        clearInterval(timerInterval);
      } else {
        this.setState({
          timeRemaining: timeRemaining - 1
        });
      }
    }, 1000);
  }

  getScore = results => {
    let questions = 0;
    let correctAnswers = 0;
    results.forEach(question => {
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

  playInterval = () => {
    if (this.props.disabled || this.props.timeRemaining <= 0) {
      return;
    }
    hinter.playInterval(this.state.currentQuestionNotes, this.props.onPlayNote);
  };

  playTeasedInterval = () => {
    if (this.props.disabled || this.props.timeRemaining <= 0) {
      return;
    }

    hinter.playTeasedInterval(
      this.state.currentQuestionNotes,
      this.props.onPlayNote
    );
  };

  playScale = () => {
    if (this.props.disabled || this.props.timeRemaining <= 0) {
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
  };

  clearCurrentAnswerNotes = () => {
    if (this.props.timeRemaining <= 0) {
      return;
    }
    this.setState({
      currentAnswerNotes: []
    });
  };

  submitAnswer = () => {
    if (this.state.submitAnswerDisabled || this.props.timeRemaining <= 0) {
      return;
    }

    const newArr = this.state.completedQuestions.slice();
    newArr.push({
      questionNumber: this.state.currentQuestionNumber,
      questionNotes: this.state.currentQuestionNotes.slice(),
      answerNotes: this.state.currentAnswerNotes.slice()
    });

    this.setState({
      submitAnswerDisabled: true,
      completedQuestions: newArr
    });

    if (
      !this.isCorrect(
        this.state.currentQuestionNotes,
        this.state.currentAnswerNotes
      )
    ) {
      hinter.playInterval(
        this.state.currentQuestionNotes,
        this.props.onPlayNote,
        true,
        this.props.onStopNote,
        this.onHintNote,
        this.offHintNote
      );

      setTimeout(() => {
        hinter.playInterval(
          this.state.currentAnswerNotes,
          this.props.onPlayNote,
          true,
          this.props.onStopNote,
          this.onHintNote,
          this.offHintNote
        );
      }, 700);

      setTimeout(() => {
        hinter.playInterval(
          this.state.currentQuestionNotes,
          this.props.onPlayNote,
          true,
          this.props.onStopNote,
          this.onHintNote,
          this.offHintNote
        );
      }, 1400);

      setTimeout(() => {
        this.setState({
          currentQuestionNumber: this.state.currentQuestionNumber + 1,
          currentQuestionNotes: [],
          currentAnswerNotes: [],
          initialPlay: false,
          submitAnswerDisabled: false
        });
      }, 2100);
    } else {
      this.setState({
        // currentQuestionNumber: this.state.currentQuestionNumber + 1,
        currentQuestionNotes: [],
        currentAnswerNotes: [],
        initialPlay: false,
        submitAnswerDisabled: false
      });
    }
  };

  isCorrect = (questionNotes, answerNotes) => {
    let correct = true;

    if (questionNotes.length === answerNotes.length) {
      questionNotes.forEach((questionNote, index) => {
        if (questionNote !== answerNotes[index]) {
          correct = false;
        }
      });
    } else {
      correct = false;
    }
    return correct;
  };

  getScore = () => {
    let questions = 0;
    let correctAnswers = 0;
    this.state.completedQuestions.forEach(question => {
      questions += 1;

      if (this.isCorrect(question.questionNotes, question.answerNotes)) {
        correctAnswers += 1;
      }
    });

    return { possible: questions, correct: correctAnswers };
  };

  endRound = isRoundComplete => {
    const resetComplete = () =>
      this.setState({
        timeRemaining: 60,
        currentKey: "",
        currentQuestionNumber: 0,
        currentQuestionNotes: [],
        currentAnswerNotes: [],
        hintNotes: [],
        inRound: false,
        timerRunning: false
      });

    const resetEarly = () =>
      this.setState({
        timeRemaining: 60,
        currentKey: "",
        currentQuestionNumber: 0,
        currentQuestionNotes: [],
        currentAnswerNotes: [],
        hintNotes: [],
        inRound: false,
        timerRunning: false,
        completedQuestions: []
      });

    if (isRoundComplete) {
      if (
        !sessionStorage.getItem("activeUser") ||
        this.state.completedQuestions.length === 0
      ) {
        resetComplete();
      } else {
        const roundTimeStamp = new Date();
        const roundData = {
          userId: sessionStorage.getItem("activeUser"),
          timeStamp: roundTimeStamp,
          musicKey: this.state.currentKey,
          questions: this.state.completedQuestions
        };
        Api.postRound(roundData).then(resetComplete());
      }
    } else {
      resetEarly();
    }
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.state.inRound) {
      if (this.state.currentKey === "") {
        this.setCurrentKey();
      } else if (this.state.currentQuestionNotes.length === 0) {
        const indexOfCurrentKey = this.musicKeys.indexOf(this.state.currentKey);
        const seedNote = this.seedNotes[indexOfCurrentKey];
        this.setCurrentQuestionNotes(seedNote);
      } else if (
        !this.state.timerRunning &&
        this.state.currentQuestionNumber !== prevState.currentQuestionNumber &&
        this.state.currentQuestionNumber === 1
      ) {
        this.playScale();
        setTimeout(() => {
          this.playInterval();
          this.startTimer();
        }, 4000);
      } else if (this.state.timerRunning) {
        if (this.state.timeRemaining <= 0) {
          const isRoundComplete = true;
          this.endRound(isRoundComplete);
        } else if (
          this.state.currentQuestionNumber !== prevState.currentQuestionNumber
        ) {
          setTimeout(() => this.playInterval(), 100);
        }
      }
    }

    // console.log(
    //   "old completed questions",
    //   prevState.completedQuestions,
    //   "new completed questions",
    //   this.state.completedQuestions
    // );

    // if (
    //   this.state.completedQuestions.length !==
    //   prevState.completedQuestions.length
    // ) {
    //   console.log("completedAnswersChanged");
    //   console.log(this.refs.infoScrollBottom);
    //   this.refs.infoScrollBottom.scrollIntoView({ behavior: "smooth" });
    // }
  }

  scrollInfoToBottom = () => {
    console.log("scrolling to bottom");
    setTimeout(() => {
      this.refs.infoScrollBottom.scrollIntoView({ behavior: "smooth" });
    });
    // this.refs.infoScrollBottom.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    let submitControlButtons = null;
    if (this.state.inRound) {
      submitControlButtons = (
        // { key: 1, name: "Play Scale", func: this.props.playScale },
        // { key: 2, name: "Play Interval", func: this.props.playInterval },
        // {
        //   key: 3,
        //   name: "Play Teased Interval",
        //   func: this.props.playTeasedInterval
        // }
        <React.Fragment>
          <button
            onClick={this.clearCurrentAnswerNotes}
            className="btn btn-outline-light"
          >
            Clear
          </button>
          <button onClick={this.playScale} className="btn btn-outline-light">
            Play Scale
          </button>
          <button onClick={this.playInterval} className="btn btn-outline-light">
            Play Interval
          </button>
          <button
            onClick={this.playTeasedInterval}
            className="btn btn-outline-light"
          >
            Play Teased Interval
          </button>
          <button onClick={this.submitAnswer} className="btn btn-outline-light">
            Submit
          </button>
        </React.Fragment>
      );
    }
    return (
      <div className="homeContainer">
        <div
          className="nav"
          style={{
            // width: this.props.containerWidth,
            height:
              (this.props.containerHeight - this.props.containerWidth * 0.27) *
              0.15
          }}
        >
          <Nav
            startRound={this.startRound}
            toggleViewingStats={this.props.toggleViewingStats}
            inRound={this.state.inRound}
            viewingStats={this.props.viewingStats}
            // playScale={this.playScale}
            // playInterval={this.playInterval}
            // playTeasedInterval={this.playTeasedInterval}
            logUserOut={this.props.logUserOut}
            endRound={this.endRound}
          />
        </div>

        <div
          className="header"
          style={{
            // width: this.props.containerWidth,
            height:
              (this.props.containerHeight - this.props.containerWidth * 0.27) *
              0.1
          }}
        >
          <Header
            inRound={this.state.inRound}
            viewingStats={this.props.viewingStats}
            completedQuestions={this.state.completedQuestions}
            currentScore={this.getScore(this.state.completedQuestions)}
            timeRemaining={this.state.timeRemaining}
            currentKey={this.state.currentKey}
          />
        </div>

        {/* messengerBodyDiv.scrollTop(messengerBodyDiv.prop("scrollHeight")); */}
        <div
          className="info"
          style={{
            // width: this.props.containerWidth,
            height:
              (this.props.containerHeight - this.props.containerWidth * 0.27) *
              0.6
          }}
        >
          <Info
            completedQuestions={this.state.completedQuestions}
            inRound={this.state.inRound}
            scrollInfoToBottom={this.scrollInfoToBottom}
          />
          <div
            ref="infoScrollBottom"
            style={{
              width: 100 + "%",
              height: 1 + "px"
            }}
          />
        </div>

        <div
          className="submitControl"
          style={{
            // width: this.props.containerWidth,
            height:
              (this.props.containerHeight - this.props.containerWidth * 0.27) *
              0.15
          }}
        >
          {submitControlButtons}
        </div>

        <div
          className="responsivePianoContainer"
          style={{
            // width: this.props.containerWidth,
            height: this.props.containerWidth * 0.27
          }}
        >
          <div
            className="responsivePiano"
            style={{ width: this.props.containerWidth * 0.9 }}
          >
            <ResponsivePiano
              width={this.props.containerWidth * 0.9}
              onPlayNote={this.props.onPlayNote}
              onStopNote={this.props.onStopNote}
              disabled={this.props.disabled}
              currentAnswerNotes={this.state.currentAnswerNotes}
              hintNotes={this.state.hintNotes}
              timeRemaining={this.state.timeRemaining}
              inRound={this.state.inRound}
              submitAnswerDisabled={this.state.submitAnswerDisabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

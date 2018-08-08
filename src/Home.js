import React from "react";
import PropTypes from "prop-types";
import ResponsivePiano from "./responsivePiano/ResponsivePiano";
import TestController from "./tester/TestController";
import Nav from "./nav/Nav";
import Header from "./header/Header";
import CompletedQuestions from "./info/CompletedQuestions";
import getInterval from "./tester/getInterval";
import hinter from "./tester/hinter";
import Api from "./api/apiManager";
import Instruction from "./Instructions";

export default class Home extends React.Component {
  static propTypes = {
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    logUserOut: PropTypes.func.isRequired
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
      shownAnswers: [],
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

  changeNoteStatus = (collection, note, action) => {
    const inCollection = this.state[collection].includes(note);
    if (
      (inCollection && action === "on") ||
      (!inCollection && action === "off")
    ) {
      return;
    } else {
      switch (action) {
        case "on": {
          this.setState(prevState => ({
            [collection]: prevState[collection].concat(note).sort()
          }));
          break;
        }

        case "off": {
          this.setState(prevState => ({
            [collection]: prevState[collection].filter(
              keepNote => keepNote !== note
            )
          }));
          break;
        }

        default:
          break;
      }
    }
  };

  play = what => {
    if (this.props.disabled || this.props.timeRemaining <= 0) {
      return;
    }
    switch (what) {
      case "interval": {
        hinter.playInterval(
          this.state.currentQuestionNotes,
          this.props.onPlayNote
        );
        break;
      }

      case "teasedInterval": {
        hinter.playTeasedInterval(
          this.state.currentQuestionNotes,
          this.props.onPlayNote
        );
        break;
      }

      case "scale": {
        const note = this.seedNotes[
          this.musicKeys.indexOf(this.state.currentKey)
        ];
        hinter.playScale(
          note,
          this.props.onPlayNote,
          this.props.onStopNote,
          this.upPattern,
          this.downPattern,
          "hintNotes",
          this.changeNoteStatus
        );
        break;
      }

      default:
        break;
    }
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
        "shownAnswers",
        this.changeNoteStatus
      );

      setTimeout(() => {
        hinter.playInterval(
          this.state.currentAnswerNotes,
          this.props.onPlayNote,
          true,
          this.props.onStopNote,
          "hintNotes",
          this.changeNoteStatus
        );
      }, 700);

      setTimeout(() => {
        hinter.playInterval(
          this.state.currentQuestionNotes,
          this.props.onPlayNote,
          true,
          this.props.onStopNote,
          "shownAnswers",
          this.changeNoteStatus
        );
      }, 1400);

      console.log("current question number");
      setTimeout(() => {
        this.setState({
          // currentQuestionNumber: this.state.currentQuestionNumber + 1,
          currentQuestionNotes: [],
          currentAnswerNotes: [],
          initialPlay: false,
          submitAnswerDisabled: false
        });
      }, 2100);
    } else {
      this.setState({
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
    const complete = () =>
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

    const early = () =>
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
        complete();
      } else {
        const roundTimeStamp = new Date();
        const roundId =
          sessionStorage.getItem("activeUser") +
          this.state.currentKey +
          roundTimeStamp;

        const roundData = Api.postRound({
          id: roundId,
          userId: sessionStorage.getItem("activeUser"),
          timeStamp: roundTimeStamp,
          musicKey: this.state.currentKey
        });

        const questionData = this.state.completedQuestions.map(question => {
          question.questionNotes.map((note, index) => {
            return Api.postQuestion({
              id: roundId + question.questionNumber + (index + 1),
              roundId: roundId,
              questionNumber: question.questionNumber,
              questionPartNumber: index + 1,
              noteValue: note
            });
          });
        });

        const answerData = this.state.completedQuestions.map(question => {
          question.answerNotes.map((note, index) => {
            return Api.postAnswer({
              id: roundId + question.questionNumber + (index + 1),
              roundId: roundId,
              questionNumber: question.questionNumber,
              answerPartNumber: index + 1,
              noteValue: note
            });
          });
        });

        Promise.all([roundData, questionData, answerData]).then(complete());
      }
    } else {
      early();
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
        this.play("scale");
        setTimeout(() => {
          this.play("interval");
          this.startTimer();
        }, 4000);
      } else if (this.state.timerRunning) {
        if (this.state.timeRemaining <= 0) {
          const isRoundComplete = true;
          this.endRound(isRoundComplete);
        } else if (
          this.state.currentQuestionNumber !== prevState.currentQuestionNumber
        ) {
          setTimeout(() => this.play("interval"), 100);
        }
      }
    }
  }

  scrollInfoToBottom = () => {
    setTimeout(() => {
      this.refs.infoScrollBottom.scrollIntoView({ behavior: "smooth" });
    });
  };

  render() {
    const responsivePianoHeight = this.props.containerWidth * 0.27;
    const heightRemaining = this.props.containerHeight - responsivePianoHeight;

    let submitControlButtons = null;
    let heightProportions = null;
    let Nav = null;
    let Info = null;
    let Header = null;

    if (this.state.inRound) {
      heightProportions = {
        nav: 0.15,
        header: 0.1,
        info: 0.6,
        submitControl: 0.15
      };

      Nav = (
        <Nav endRound={{ key: 1, label: "End Round", func: this.endRound }} />
      );

      Header = (
        <Header className="roundHeader">
          {[
            { className: "label timeLabel", value: "Time:" },
            { className: "timeRemaining", value: this.state.timeRemaining },
            { className: "label keyLabel", value: "Key:" },
            { className: "musicKey", value: this.state.currentKey },
            {
              className: "label scoreLabel",
              value: "Score:"
            },
            {
              className: "score",
              value: () => {
                const currentScore = this.getScore(
                  this.state.completedQuestions
                );
                `${currentScore.correct}/${currentScore.possible}`;
              }
            }
          ]}
        </Header>
      );

      Info = (
        <React.Fragment>
          <CompletedQuestions
            width={this.props.containerWidth}
            height={heightRemaining * heightProportions.info}
            completedQuestions={this.state.completedQuestions}
            scrollInfoToBottom={this.scrollInfoToBottom}
            isCorrect={this.isCorrect}
          />
          <div
            ref="infoScrollBottom"
            style={{
              width: 100 + "%"
              // height: 1 + "px"
            }}
          />
        </React.Fragment>
      );

      submitControlButtons = (
        <div
          className="submitControl"
          style={{
            // width: this.props.containerWidth,
            height: heightRemaining * heightProportions.submitControl
          }}
        >
          <TestController
            clearCurrentAnswerNotes={this.clearCurrentAnswerNotes}
            play={this.play}
            submitAnswer={this.submitAnswer}
          />
        </div>
      );
    } else {
      heightProportions = {
        nav: 0.15,
        header: 0.1,
        info: 0.75
      };

      Nav = (
        <Nav
          startRound={{ key: 1, label: "Play Round", func: this.startRound }}
          setViewingStats={{
            key: 2,
            label: "Stats",
            func: () => this.props.setViewingStats(true)
          }}
          logUserOut={{ key: 3, label: "Log Out", func: this.props.logUserOut }}
        />
      );

      if (this.state.completedQuestions.length > 0) {
        Header = (
          <Header className="roundHeader">
            {[
              { className: "roundCompleteMessage", value: "Round Complete!" },
              {
                className: "label scoreLabel",
                value: "Score:"
              },
              {
                className: "score",
                value: () => {
                  const currentScore = this.getScore(
                    this.state.completedQuestions
                  );
                  `${currentScore.correct}/${currentScore.possible}`;
                }
              }
            ]}
          </Header>
        );
        Info = (
          <React.Fragment>
            <CompletedQuestions
              width={this.props.containerWidth}
              height={heightRemaining * heightProportions.info}
              completedQuestions={this.state.completedQuestions}
              scrollInfoToBottom={this.scrollInfoToBottom}
              isCorrect={this.isCorrect}
            />
            <div
              ref="infoScrollBottom"
              style={{
                width: 100 + "%"
                // height: 1 + "px"
              }}
            />
          </React.Fragment>
        );
      } else {
        Header = (
          <Header className="infoHeader">
            {[{ className: "welcome", value: "Welcome to ear-ninja" }]}
          </Header>
        );
        Info = <Instructions />;
      }
    }

    return (
      <div
        className="homeContainer"
        style={{
          width: this.props.containerWidth,
          height: this.props.containerHeight
        }}
      >
        <div
          className="nav"
          style={{
            height: heightRemaining * heightProportions.nav
          }}
        >
          {Nav}
        </div>

        <div
          className="header"
          style={{
            height: heightRemaining * heightProportions.header
          }}
        >
          {Header}
        </div>

        <div
          className="info"
          style={{
            height: heightRemaining * heightProportions.info
          }}
        >
          {Info}
        </div>

        {submitControlButtons}

        <div
          className="responsivePianoContainer"
          style={{
            height: responsivePianoHeight
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
              shownAnswers={this.state.shownAnswers}
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

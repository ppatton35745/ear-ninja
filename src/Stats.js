import React from "react";
import PropTypes from "prop-types";
import ResponsivePiano from "./responsivePiano/ResponsivePiano";
import TestController from "./tester/TestController";
import Nav from "./nav/Nav";
import Header from "./header/Header";
import Info from "./info/Info";
import getInterval from "./tester/getInterval";
import hinter from "./tester/hinter";
import Api from "./api/apiManager";

export default class Home extends React.Component {
  static propTypes = {
    logUserOut: PropTypes.func.isRequired,
    setViewingStats: PropTypes.func.isRequired
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

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className="homeContainer">
        <div className="nav">
          <Nav
            startRound={this.startRound}
            inRound={this.state.inRound}
            logUserOut={this.props.logUserOut}
            endRound={this.endRound}
          />
        </div>

        <div className="header">
          <Header
            inRound={this.state.inRound}
            completedQuestions={this.state.completedQuestions}
            currentScore={this.getScore(this.state.completedQuestions)}
            timeRemaining={this.state.timeRemaining}
            currentKey={this.state.currentKey}
          />
        </div>

        <div className="info">
          <Info
            width={this.props.containerWidth}
            height={heightRemaining * heightProportions.info}
            completedQuestions={this.state.completedQuestions}
            inRound={this.state.inRound}
            scrollInfoToBottom={this.scrollInfoToBottom}
            isCorrect={this.isCorrect}
          />
        </div>
      </div>
    );
  }
}

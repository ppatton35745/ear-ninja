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
import getNavInfo from "./nav/navInfo";

export default class Home extends React.Component {
  static propTypes = {
    logUserOut: PropTypes.func.isRequired,
    setViewingStats: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
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

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const Nav = getNav(
      "home",
      this.props.logUserOut,
      this.props.setViewingStats
    );
    const Header = getHeader("stats");
    return (
      <div className="homeContainer">
        {Nav}
        {Header}
        <div className="charts">These charts are ass</div>
      </div>
    );
  }
}

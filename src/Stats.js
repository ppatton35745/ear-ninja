import React from "react";
import PropTypes from "prop-types";
import getNav from "./nav/getNav";
import getHeader from "./header/getHeader";

export default class Stats extends React.Component {
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

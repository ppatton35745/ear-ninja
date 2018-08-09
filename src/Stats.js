import React from "react";
import PropTypes from "prop-types";
import getNav from "./nav/getNav";
import getHeader from "./header/getHeader";
import Api from "./api/apiManager";

export default class Stats extends React.Component {
  static propTypes = {
    logUserOut: PropTypes.func.isRequired,
    setViewingStats: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      results: []
    };
  }

  getScoreData = () => {
    console.log("running get score data");
    Api.getRounds().then(rounds => {
      Api.getQuestions().then(questions => {
        Api.getAnswers().then(answers => {
          rounds.forEach(round => {
            const sortedQuestions = [];
            const sortedAnswers = [];
            let numPossible = 0;
            let numCorrect = 0;

            const matchQuestions = questions.filter(question => {
              return String(question.roundId) === String(round.id);
            });
            const matchAnswers = answers.filter(answer => {
              return String(answer.roundId) === round.id;
            });

            matchQuestions.forEach((question, index) => {
              const ind = question.questionNumber - 1;

              if (sortedQuestions[ind] === undefined) {
                sortedQuestions[ind] = [];
              }
              sortedQuestions[ind].push(question.noteValue);
              sortedQuestions[ind].sort();
            });

            matchAnswers.forEach(answer => {
              const ind = answer.questionNumber - 1;
              if (sortedAnswers[ind] === undefined) {
                sortedAnswers[ind] = [];
              }
              sortedAnswers[ind].push(answer.noteValue);
              sortedAnswers[ind].sort();
            });

            sortedQuestions.forEach((question, questionIndex) => {
              numPossible += 1;
              let isCorrect = true;

              question.forEach((questionPart, questionPartIndex) => {
                if (
                  questionPart !==
                  sortedAnswers[questionIndex][questionPartIndex]
                ) {
                  isCorrect = false;
                }
              });

              if (isCorrect) {
                numCorrect += 1;
              }
            });

            round.questions = sortedQuestions;
            round.answers = sortedAnswers;
            round.correct = numCorrect;
            round.possible = numPossible;
          });
          this.setState({
            rounds: rounds
          });
        });
      });
    });
  };

  componentDidMount() {
    this.getScoreData();
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const Nav = getNav(
      "stats",
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

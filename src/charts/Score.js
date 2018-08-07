import React from "react";
import Api from "../api/apiManager";

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      results: []
    };
  }

  getScoreData = () => {
    Api.getRounds().then(rounds => {
      Api.getQuestions().then(questions => {
        Api.getAnswers().then(answers => {
          rounds.forEach(round => {
            const sortedQuestions = [];
            const sortedAnswers = [];

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

            round.questions = sortedQuestions;
            round.answers = sortedAnswers;
          });
          this.setState({
            rounds: rounds
          });
        });
      });
    });
  };

  getTotalCorrect = () => {
    console.log("tallying correct");
    const roundResultsArr = [];

    this.state.rounds.forEach(round => {
      let roundResultObj = {};
      roundResultObj.id = round.id;
      let possible = 0;
      let correct = 0;
      round.questions.forEach((question, index) => {
        const sendOff = [
          {
            questionNumber: index + 1,
            questionNotes: question,
            answerNotes: round.answers[index]
          }
        ];
        const returnedScore = this.props.getScore(sendOff);
        possible += returnedScore.possible;
        correct += returnedScore.correct;
      });
      roundResultObj.possible = possible;
      roundResultObj.correct = correct;
      roundResultsArr.push(roundResultObj);
    });
    console.log(roundResultsArr);
  };

  getAccuracyPercentage = () => {};

  componentDidMount() {
    this.getScoreData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componenet updated");
    if (prevState.rounds !== this.state.rounds) {
      this.getTotalCorrect();
    }
  }

  render() {
    return (
      <div>
        {this.state.results.map(result => {
          return (
            <div>
              <h2>correct: {result.correct}</h2>
              <h2>possible: {result.possible}</h2>
            </div>
          );
        })}
      </div>
    );
  }
}

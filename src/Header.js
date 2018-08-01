import React from "react";
import PropTypes from "prop-types";

export default class Header extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    viewingStats: PropTypes.bool,
    completedQuestions: PropTypes.array,
    currentKey: PropTypes.string,
    timeRemaining: PropTypes.number,
    currentScore: PropTypes.object
  };

  render() {
    if (this.props.inRound) {
      return (
        <React.Fragment>
          <h2>
            <span>{`Time: ${this.props.timeRemaining}`}</span>
            <span>{`Key: ${this.props.currentKey}`}</span>
            <span>{`Score: ${this.props.currentScore.correct}/${
              this.props.currentScore.possible
            }`}</span>
          </h2>
        </React.Fragment>
      );
    } else {
      if (this.props.completedQuestions.length === 0) {
        return (
          <React.Fragment>
            <h2>Welcome to Ear-Ninja</h2>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <h2>
              <span>Round Complete!</span>
              <span>{`Score: ${this.props.currentScore.correct}/${
                this.props.currentScore.possible
              }`}</span>
            </h2>
          </React.Fragment>
        );
      }
    }
  }
}

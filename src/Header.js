import React from "react";
import PropTypes from "prop-types";

export default class Header extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    viewingStats: PropTypes.bool,
    roundResults: PropTypes.array,
    currentKey: PropTypes.string,
    timeRemaining: PropTypes.number,
    currentScore: PropTypes.object
  };

  render() {
    if (this.props.inRound) {
      return (
        <div>
          <h2>
            <span>{`Time Remaining: ${this.props.timeRemaining}`}</span>
            <span>{`Current Key: ${this.props.currentKey}`}</span>
            <span>{`Current Score: ${this.props.currentScore.correct}/${
              this.props.currentScore.possible
            }`}</span>
          </h2>
        </div>
      );
    } else if (this.props.viewingStats) {
      return (
        <div>
          <h2>Stats: </h2>
        </div>
      );
    } else {
      if (this.props.roundResults.length === 0) {
        return (
          <div>
            <h2>Welcome to Ear-Ninja</h2>
          </div>
        );
      } else {
        return (
          <div>
            <h2>Round Results: </h2>
          </div>
        );
      }
    }
  }
}

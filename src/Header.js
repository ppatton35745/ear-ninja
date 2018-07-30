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

  constructor(props) {
    super(props);
  }

  render() {
    let headerContent = null;

    if (!this.props.inRound && !this.props.viewingStats) {
      if (this.props.roundResults.length === 0) {
        headerContent = <span>Welcome to Ear-Ninja</span>;
      } else {
        headerContent = <span>Round Results: </span>;
      }
    } else if (this.props.inRound) {
      headerContent = (
        <React.Fragment>
          <span>{`Time Remaining: ${this.props.timeRemaining}`}</span>
          <span>{`Current Key: ${this.props.currentKey}`}</span>
          <span>{`Current Score: ${this.props.currentScore.correct}/${
            this.props.currentScore.possible
          }`}</span>
        </React.Fragment>
      );
    } else if (this.props.viewingStats) {
      headerContent = <span>Stats: </span>;
    }

    return (
      <div>
        <h2>{headerContent}</h2>
      </div>
    );
  }
}

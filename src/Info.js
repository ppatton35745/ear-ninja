import React from "react";
import PropTypes from "prop-types";

export default class Into extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    viewingStats: PropTypes.bool,
    roundResults: PropTypes.array,
    completedQuestions: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.inRound) {
      return (
        <div>
          <p>This is a placeholder for the current round score</p>
        </div>
      );
    } else if (this.props.viewingStats) {
      return (
        <div>
          <p>This is a placeholder for stats info</p>
        </div>
      );
    } else {
      if (this.props.roundResults.length === 0) {
        return (
          <div>
            <p>This is a placeholder giving instructions for the game</p>
          </div>
        );
      } else {
        return (
          <div>
            <p>
              This is a placeholder for the results form the previously
              completed round
            </p>
          </div>
        );
      }
    }
  }
}

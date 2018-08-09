import React from "react";
import PropTypes from "prop-types";
import TestController from "./TestController";

export default class RoundControl extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    clearCurrentAnswerNotes: PropTypes.func,
    play: PropTypes.func,
    submitAnswer: PropTypes.func
  };

  render() {
    if (this.props.inRound) {
      return (
        <div className="submitControl">
          <TestController
            clearCurrentAnswerNotes={this.props.clearCurrentAnswerNotes}
            play={this.props.play}
            submitAnswer={this.props.submitAnswer}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
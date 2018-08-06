import React from "react";
import PropTypes from "prop-types";
import DeadPiano from "../deadPiano/DeadPiano";
import DimensionsProvider from "../misc/DimensionsProvider";

export default class Info extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    completedQuestions: PropTypes.array,
    scrollInfoToBottom: PropTypes.func,
    isCorrect: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.completedQuestions.length !==
      prevProps.completedQuestions.length
    ) {
      this.props.scrollInfoToBottom();
    }
  }

  render() {
    if (this.props.completedQuestions.length > 0) {
      return (
        <React.Fragment>
          {this.props.completedQuestions.map(completedQuestion => {
            let correctness = "deadPianoContainer";
            if (
              this.props.isCorrect(
                completedQuestion.questionNotes,
                completedQuestion.answerNotes
              )
            ) {
              correctness = correctness + " " + "correct";
            } else {
              correctness = correctness + " " + "incorrect";
            }
            return (
              <div
                className={correctness}
                style={{
                  width: this.props.width * 0.29,
                  height: this.props.width * 0.29 * 0.27
                }}
              >
                <div
                  className="deadPiano"
                  style={{
                    width: this.props.width * 0.29 * 0.94
                  }}
                >
                  <DeadPiano
                    width={this.props.width * 0.29 * 0.94}
                    completedQuestion={completedQuestion}
                    inRound={this.props.inRound}
                  />
                </div>
              </div>
            );
          })}
        </React.Fragment>
      );
    } else if (this.props.inRound) {
      return null;
    } else {
      return (
        <React.Fragment>
          <p>This is a placeholder for instructions for the game</p>
        </React.Fragment>
      );
    }
  }
}

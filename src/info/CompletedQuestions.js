import React from "react";
import PropTypes from "prop-types";
import DeadPiano from "../deadPiano/DeadPiano";

export default class CompletedQuestions extends React.Component {
  static propTypes = {
    completedQuestions: PropTypes.array,
    scrollInfoToBottom: PropTypes.func,
    isCorrect: PropTypes.func.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
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
            let className = "deadPianoContainer";
            if (
              this.props.isCorrect(
                completedQuestion.questionNotes,
                completedQuestion.answerNotes
              )
            ) {
              className = className + " " + "correct";
            } else {
              className = className + " " + "incorrect";
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
                  />
                </div>
              </div>
            );
          })}
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

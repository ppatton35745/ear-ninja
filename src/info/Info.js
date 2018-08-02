import React from "react";
import PropTypes from "prop-types";
import DeadPiano from "../deadPiano/DeadPiano";
import DimensionsProvider from "../misc/DimensionsProvider";

export default class Info extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    completedQuestions: PropTypes.array,
    scrollInfoToBottom: PropTypes.func
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
            return (
              <div className="deadPiano">
                <DimensionsProvider>
                  {({ containerWidth, containerHeight }) => (
                    <DeadPiano
                      width={containerWidth}
                      completedQuestion={completedQuestion}
                      inRound={this.props.inRound}
                    />
                  )}
                </DimensionsProvider>
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

import React from "react";
import PropTypes from "prop-types";
import DeadPiano from "./deadPiano/DeadPiano";
import DimensionsProvider from "./misc/DimensionsProvider";

export default class Into extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    viewingStats: PropTypes.bool,
    roundResults: PropTypes.array,
    completedQuestions: PropTypes.array
  };

  // constructor(props) {
  //   super(props);
  // }

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
          <div className="deadPianos">
            {this.props.roundResults.map(completedQuestion => {
              return (
                <div className="deadPiano" style={{ width: 30 + "%" }}>
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
          </div>
        );
      }
    }
  }
}

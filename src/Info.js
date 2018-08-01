import React from "react";
import PropTypes from "prop-types";
import DeadPiano from "./deadPiano/DeadPiano";
import DimensionsProvider from "./misc/DimensionsProvider";

export default class Info extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    viewingStats: PropTypes.bool,
    completedQuestions: PropTypes.array
  };

  // constructor(props) {
  //   super(props);
  // }

  render() {
    if (this.props.viewingStats) {
      return (
        <React.Fragment>
          <p>This is a placeholder for stats info</p>
        </React.Fragment>
      );
    } else if (this.props.completedQuestions.length > 0) {
      return (
        <React.Fragment>
          {this.props.completedQuestions.map(completedQuestion => {
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

    // else if (this.props.viewingStats) {
    //   return (
    // <React.Fragment>
    //   <p>This is a placeholder for stats info</p>
    // </React.Fragment>;
    //   );
    // } else {
    //   if (this.props.completedQuestions.length === 0) {
    //     return (
    //       <React.Fragment>
    //         <p>This is a placeholder giving instructions for the game</p>
    //       </React.Fragment>
    //     );
    //   } else {
    //     return (
    //       <React.Fragment>
    //         {this.props.roundResults.map(completedQuestion => {
    //           return (
    //             <div className="deadPiano" style={{ width: 30 + "%" }}>
    //               <DimensionsProvider>
    //                 {({ containerWidth, containerHeight }) => (
    //                   <DeadPiano
    //                     width={containerWidth}
    //                     completedQuestion={completedQuestion}
    //                     inRound={this.props.inRound}
    //                   />
    //                 )}
    //               </DimensionsProvider>
    //             </div>
    //           );
    //         })}
    //       </React.Fragment>
    //     );
    //   }
    // }
  }
}

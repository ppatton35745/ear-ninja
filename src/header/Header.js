import React from "react";
import PropTypes from "prop-types";

export default class Header extends React.Component {
  render() {
    return (
      <h2 className={this.props.className}>
        {this.props.children.map(span => (
          <span className={span.className}>{span.value}</span>
        ))}
      </h2>
    );

    // if (this.props.inRound) {
    //   return (
    //     <React.Fragment>
    //       <h2 className="roundHeader">
    //         <span>{`Time: ${this.props.timeRemaining}`}</span>
    //         <span>{`Key: ${this.props.currentKey}`}</span>
    //         <span>{`Score: ${this.props.currentScore.correct}/${
    //           this.props.currentScore.possible
    //         }`}</span>
    //       </h2>
    //     </React.Fragment>
    //   );
    // } else {
    //   if (this.props.completedQuestions.length === 0) {
    //     return (
    //       <React.Fragment>
    //         <h2 className="infoHeader">Welcome to ear-ninja</h2>
    //       </React.Fragment>
    //     );
    //   } else {
    //     return (
    //       <React.Fragment>
    //         <h2 className="roundHeader">
    //           <span>Round Complete!</span>
    //           <span>{`Score: ${this.props.currentScore.correct}/${
    //             this.props.currentScore.possible
    //           }`}</span>
    //         </h2>
    //       </React.Fragment>
    //     );
    //   }
    // }
  }
}

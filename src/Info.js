import React from "react";
import PropTypes from "prop-types";


export default class Into extends React.Component {
  static propTypes = {
      inRound = PropTypes.bool,
      viewingStats = PropTypes.bool,
      roundResults = PropTypes.array,
      completedQuestions = PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
      let infoParagraph = ""

      if (this.props.inRound) {
          infoParagraph = "This is a placeholder for the current round score"
      } else {
          if (this.roundResults.length === 0) {
              infoParagraph = "This is a placeholder giving instructions for the game"
          } else {
              infoParagraph = "This is a placeholder for the results form the previously completed round"
          }
      }

    return (
      <div>
      <p>{infoParagraph}</p>
      </div>
    )
  }
}

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
      
    
    if (!this.props.inRound && !this.props.viewingStats) {
        
    }

    return (
      <div>
      <h2>{colA}</h2>
      </div>
    )
  }
}

import React from "react";
import PropTypes from "prop-types";


export default class Header extends React.Component {
  static propTypes = {
      inRound = PropTypes.bool,
      viewingStats = PropTypes.bool,
      roundResults = PropTypes.array,
      timeRemaining = PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  render() {
      let colA = ""
    
    if (!this.props.inRound && !this.props.viewingStats) {
        
        if (this.props.roundResults.length === 0) {
            colA = "Welcome to Ear-Ninja"
        } else {
            colA = "Round Results:"
        }
    }

    return (
      <div>
      <h2>{colA}</h2>
      </div>
    )
  }
}

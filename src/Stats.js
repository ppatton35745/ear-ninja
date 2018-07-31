import React from "react";
import PropTypes from "prop-types";
import Nav from "./Nav";
import Header from "./Header";
import Info from "./Info";

export default class Stats extends React.Component {
  static propTypes = {
    toggleInRound: PropTypes.func.isRequired,
    toggleViewingStats: PropTypes.func.isRequired,
    inRound: PropTypes.bool.isRequired,
    viewingStats: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div>
        <Nav
          toggleInRound={this.props.toggleInRound}
          toggleViewingStats={this.props.toggleViewingStats}
          inRound={this.props.inRound}
          viewingStats={this.props.viewingStats}
        />
        <Header
          inRound={this.props.inRound}
          viewingStats={this.props.viewingStats}
        />
        <Info
          inRound={this.props.inRound}
          viewingStats={this.props.viewingStats}
        />
      </div>
    );
  }
}

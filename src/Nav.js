import React from "react";
import PropTypes from "prop-types";

export default class Nav extends React.Component {
  static propTypes = {
    toggleInRound: PropTypes.func,
    toggleViewingStats: PropTypes.func,
    playScale: PropTypes.func,
    playInterval: PropTypes.func,
    playTeasedInterval: PropTypes.func,
    inRound: PropTypes.bool,
    viewingStats: PropTypes.bool
  };

  render() {
    let buttons = [];

    if (!this.props.inRound && !this.props.viewingStats) {
      buttons = [
        { key: 1, name: "Play Round", func: this.props.startRound },
        { key: 2, name: "Logout", func: this.props.logUserOut }
        // { name: "Logout", func: this.props.logout }
      ];
    } else if (this.props.inRound) {
      buttons = [
        // { key: 1, name: "Play Scale", func: this.props.playScale },
        // { key: 2, name: "Play Interval", func: this.props.playInterval },
        // {
        //   key: 3,
        //   name: "Play Teased Interval",
        //   func: this.props.playTeasedInterval
        // }
        {
          key: 1,
          name: "End Round",
          func: () => {
            this.props.endRound(false);
          }
        }
      ];
      // } else if (this.props.viewingStats) {
      //   buttons = [
      //     { key: 1, name: "Play Round", func: this.props.startRound },
      //     { key: 2, name: "Home", func: this.props.startRound }
      //     // { name: "Logout", func: this.props.logout }
      //   ];
      // }
    }

    return (
      <React.Fragment>
        {buttons.map(button => {
          return (
            <button
              key={button.key}
              onClick={button.func}
              className="btn btn-outline-light"
            >
              {button.name}
            </button>
          );
        })}
      </React.Fragment>
    );
  }
}

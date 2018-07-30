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

  constructor(props) {
    super(props);
  }

  render() {
    let buttons = [];

    if (!this.props.inRound && !this.props.viewingStats) {
      buttons = [
        { name: "Play Round", func: this.props.toggleInRound },
        { name: "View Stats", func: this.props.toggleViewingStats },
        { name: "Logout", func: this.props.logout }
      ];
    } else if (this.props.inRound) {
      buttons = [
        { name: "Play Scale", func: this.props.playScale },
        { name: "Play Interval", func: this.props.playInterval },
        { name: "Play Teased Interval", func: this.props.playTeasedInterval }
      ];
    } else if (this.props.viewingStats) {
      buttons = [
        { name: "Play Round", func: this.props.toggleInRound },
        { name: "Home", func: this.props.toggleViewingStats },
        { name: "Logout", func: this.props.logout }
      ];
    }

    return (
      <div>
        {buttons.map(button => {
          return <button onClick={button.func}>{button.name}</button>;
        })}
      </div>
    );
  }
}

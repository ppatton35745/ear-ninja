import React from "react";
import PropTypes from "prop-types";

export default class Nav extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    startRound: PropTypes.func,
    endRound: PropTypes.func,
    logUserOut: PropTypes.func
  };

  render() {
    let buttons = [];

    if (!this.props.inRound) {
      buttons = [
        { key: 1, name: "Play Round", func: this.props.startRound },
        { key: 2, name: "Logout", func: this.props.logUserOut }
      ];
    } else {
      buttons = [
        {
          key: 1,
          name: "End Round",
          func: () => {
            this.props.endRound(false);
          }
        }
      ];
    }

    return (
      <React.Fragment>
        <div className="navTitleDiv">
          <h1 className="navTitle">ear-ninja</h1>
        </div>
        <div className="navButtonsDiv">
          {buttons.map(button => {
            return (
              <button
                key={button.key}
                onClick={button.func}
                className="btn btn-outline-light navButtons"
              >
                {button.name}
              </button>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

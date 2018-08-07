import React from "react";
import PropTypes from "prop-types";

export default class Nav extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    startRound: PropTypes.func,
    viewStats: PropTypes.func,
    endRound: PropTypes.func,
    logUserOut: PropTypes.func,
    viewingStats: PropTypes.bool,
    goHome: PropTypes.func
  };

  render() {
    let buttons = [];

    if (!this.props.inRound && !this.props.viewingStats) {
      buttons = [
        { key: 1, name: "Play Round", func: this.props.startRound },
        { key: 2, name: "Stats", func: this.props.viewStats },
        { key: 3, name: "Logout", func: this.props.logUserOut }
      ];
    } else if (this.props.viewingStats) {
      buttons = [
        { key: 1, name: "Play Round", func: this.props.startRound },
        { key: 2, name: "Home", func: this.props.goHome },
        { key: 3, name: "Logout", func: this.props.logUserOut }
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
          <img src="/img/Ninja256.png" alt="ninja" />
          {/* http://www.rw-designer.com/icon-detail/5315 */}
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

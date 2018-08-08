import React from "react";
import PropTypes from "prop-types";

export default class Nav extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    startRound: PropTypes.func,
    endRound: PropTypes.func,
    logUserOut: PropTypes.func,
    viewingStats: PropTypes
  };

  render() {
    return (
      <React.Fragment>
        <div className="navTitleDiv">
          <img src="/img/Ninja256.png" alt="ninja" />
          {/* http://www.rw-designer.com/icon-detail/5315 */}
          <h1 className="navTitle">ear-ninja</h1>
        </div>
        <div className="navButtonsDiv">
          {this.props.children.map(button => {
            return (
              <button
                key={button.key}
                onClick={button.func}
                className="btn btn-outline-light navButtons"
              >
                {button.label}
              </button>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

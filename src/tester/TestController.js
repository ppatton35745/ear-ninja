import React from "react";
import PropTypes from "prop-types";

export default class TestController extends React.Component {
  static propTypes = {
    clearCurrentAnswerNotes: PropTypes.func,
    playScale: PropTypes.func,
    playInterval: PropTypes.func,
    playTeasedInterval: PropTypes.func,
    submitAnswer: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.buttons = [
      { key: 1, name: "Clear", func: this.props.clearCurrentAnswerNotes },
      { key: 2, name: "Play Scale", func: () => this.props.play("scale") },
      {
        key: 3,
        name: "Play Interval",
        func: () => this.props.play("interval")
      },
      {
        key: 4,
        name: "Play Teased Interval",
        func: () => this.props.play("teasedInterval")
      },
      { key: 5, name: "Submit", func: this.props.submitAnswer }
    ];
  }

  render() {
    return (
      <React.Fragment>
        {this.buttons.map(button => {
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

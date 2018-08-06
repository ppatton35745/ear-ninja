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
      {
        key: 1,
        hotKey: "Y",
        name: "Clear",
        func: this.props.clearCurrentAnswerNotes
      },
      {
        key: 2,
        hotKey: "U",
        name: "Play Scale",
        func: () => this.props.play("scale")
      },
      {
        key: 3,
        hotKey: "I",
        name: "Play Interval",
        func: () => this.props.play("interval")
      },
      {
        key: 4,
        hotKey: "O",
        name: "Play Teased Interval",
        func: () => this.props.play("teasedInterval")
      },
      { key: 5, hotKey: "P", name: "Submit", func: this.props.submitAnswer }
    ];
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = event => {
    // Don't conflict with existing combinations like ctrl + t
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    switch (event.key) {
      case "y":
        this.props.clearCurrentAnswerNotes();
        break;

      case "u":
        this.props.play("scale");
        break;

      case "i":
        this.props.play("interval");
        break;

      case "o":
        this.props.play("teasedInterval");
        break;

      case "p":
        this.props.submitAnswer();
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.buttons.map(button => {
          return (
            <button
              key={button.key}
              onClick={button.func}
              className="btn btn-outline-light submitControlButton"
            >
              <span className="buttonHotKey">{`${button.hotKey}: `}</span>
              {button.name}
            </button>
          );
        })}
      </React.Fragment>
    );
  }
}

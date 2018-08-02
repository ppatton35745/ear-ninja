import React from "react";
import PropTypes from "prop-types";
import MidiNumbers from "../piano/MidiNumbers";
import DeadKeyboard from "./DeadKeyboard";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("c5")
};

class DeadPiano extends React.Component {
  static propTypes = {
    noteRange: PropTypes.object,
    width: PropTypes.number,
    completedQuestion: PropTypes.object
  };

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <DeadKeyboard
        noteRange={noteRange}
        width={this.props.width}
        completedQuestion={this.props.completedQuestion}
      />
    );
  }
}

export default DeadPiano;

import React from "react";
import PropTypes from "prop-types";

export default class TestBox extends React.Component {
  static propTypes = {
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };

  //   static defaultProps = {
  //     format: "mp3",
  //     soundfont: "MusyngKite",
  //     instrumentName: "acoustic_grand_piano"
  //   };

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       activeAudioNodes: {},
  //       instrument: null
  //     };
  //   }

  //   componentDidMount() {
  //     this.loadInstrument(this.props.instrumentName);
  //   }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevProps.instrumentName !== this.props.instrumentName) {
  //       this.loadInstrument(this.props.instrumentName);
  //     }
  //   }

  render() {
    return (
      <React.Fragment>
        <h1>Phils TestBox</h1>
        <button>Do a Barrel Roll!</button>
      </React.Fragment>
    );
  }
}

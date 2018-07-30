import React from "react";
import SoundfontProvider from "./SoundfontProvider";
import Round from "./Round";
import Home from "./Home";
import Stats from "./Stats";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inRound: false,
      roundResults: [],
      viewingStats: false
    };
  }

  toggleInRound = () => {
    if (this.state.inRound) {
      this.setState({
        inRound: false
      });
    } else {
      this.setState({
        inRound: true
      });
    }
  };

  toggleViewingStats = () => {
    if (this.state.viewingStats) {
      this.setState({
        viewingStats: false
      });
    } else {
      this.setState({
        viewingStats: true
      });
    }
  };

  setRoundResults = results => {
    this.setState({
      roundResults: results
    });
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    if (this.state.inRound) {
      return (
        <SoundfontProvider
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({ isLoading, playNote, stopNote }) => (
            <Round
              onPlayNote={playNote}
              onStopNote={stopNote}
              disabled={isLoading}
              toggleInRound={this.toggleInRound}
              setRoundResults={this.setRoundResults}
              inRound={this.state.inRound}
              viewingStats={this.viewingStats}
            />
          )}
        />
      );
    } else if (this.state.viewingStats) {
      return (
        <Stats
          toggleViewingStats={this.toggleViewingStats}
          inRound={this.state.inRound}
          viewingStats={this.viewingStats}
        />
      );
    } else {
      return (
        <SoundfontProvider
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({ isLoading, playNote, stopNote }) => (
            <Home
              onPlayNote={playNote}
              onStopNote={stopNote}
              disabled={isLoading}
              toggleInRound={this.toggleInRound}
              toggleViewingStats={this.toggleViewingStats}
              roundResults={this.state.roundResults}
              inRound={this.state.inRound}
              viewingStats={this.viewingStats}
            />
          )}
        />
      );
    }
  }
}

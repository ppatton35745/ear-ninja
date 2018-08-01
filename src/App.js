import React from "react";
import SoundfontProvider from "./SoundfontProvider";
import Home from "./Home";
import Stats from "./Stats";
import DimensionsProvider from "./misc/DimensionsProvider";

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

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <SoundfontProvider
        instrumentName="acoustic_grand_piano"
        audioContext={audioContext}
        hostname={soundfontHostname}
        render={({ isLoading, playNote, stopNote }) => (
          <DimensionsProvider className="dimensionProvider">
            {({ containerWidth, containerHeight }) => (
              <Home
                onPlayNote={playNote}
                onStopNote={stopNote}
                disabled={isLoading}
                toggleViewingStats={this.toggleViewingStats}
                containerWidth={containerWidth}
                containerHeight={containerHeight}
              />
            )}
          </DimensionsProvider>
        )}
      />
    );

    // else if (this.state.viewingStats) {
    //   return (
    //     <Stats
    //       toggleViewingStats={this.toggleViewingStats}
    //       inRound={this.state.inRound}
    //       viewingStats={this.state.viewingStats}
    //       toggleInRound={this.toggleInRound}
    //     />
    //   );
    // } else {
    //   return (
    //     <SoundfontProvider
    //       instrumentName="acoustic_grand_piano"
    //       audioContext={audioContext}
    //       hostname={soundfontHostname}
    //       render={({ isLoading, playNote, stopNote }) => (
    //         <Home
    //           onPlayNote={playNote}
    //           onStopNote={stopNote}
    //           disabled={isLoading}
    //           toggleInRound={this.toggleInRound}
    //           toggleViewingStats={this.toggleViewingStats}
    //           roundResults={this.state.roundResults}
    //           inRound={this.state.inRound}
    //           viewingStats={this.state.viewingStats}
    //           getScore={this.getScore}
    //         />
    //       )}
    //     />
    //   );
    // }
  }
}

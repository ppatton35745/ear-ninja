import React from "react";
import SoundfontProvider from "./misc/SoundfontProvider/SoundfontProvider";
import Home from "./Home";
import DimensionsProvider from "./misc/DimensionsProvider";
import Login from "./Login";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser");
  };

  logUserIn = () => {
    this.setState({ loggedIn: true });
  };

  logUserOut = () => {
    sessionStorage.removeItem("activeUser");
    this.setState({ loggedIn: false });
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    if (this.state.loggedIn || this.isAuthenticated()) {
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
                  containerWidth={containerWidth}
                  containerHeight={containerHeight}
                  logUserOut={this.logUserOut}
                />
              )}
            </DimensionsProvider>
          )}
        />
      );
    } else {
      return <Login key={Date.now()} logUserIn={this.logUserIn} />;
    }
  }
}

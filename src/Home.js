import React from "react";
import PropTypes from "prop-types";
import ResponsivePiano from "./piano/ResponsivePiano";

export default class Home extends React.Component {
  static propTypes = {
    toggleInRound: PropTypes.func.isRequired,
    toggleViewingStats: PropTypes.func.isRequired,
    roundResults: PropTypes.array.isRequired,
    inRound: PropTypes.bool.isRequired,
    viewingStats: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Nav
          toggleInRound={this.props.toggleInRound}
          toggleViewingStats={this.props.toggleViewingStats}
          inRound={this.props.inRound}
          viewingStats={this.props.viewingStats}
        />
        <Header
          roundResults={this.props.roundResults}
          inRound={this.props.inRound}
          viewingStats={this.props.viewingStats}
        />
        <Info
          roundResults={this.props.roundResults}
          inRound={this.props.inRound}
          viewingStats={this.props.viewingStats}
        />
        <SoundfontProvider
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({ isLoading, playNote, stopNote }) => (
            <DimensionsProvider>
              {({ containerWidth, containerHeight }) => (
                <ResponsivePiano
                  width={containerWidth}
                  onPlayNote={playNote}
                  onStopNote={stopNote}
                  disabled={isLoading}
                />
              )}
            </DimensionsProvider>
          )}
        />
      </React.Fragment>
    );
  }
}

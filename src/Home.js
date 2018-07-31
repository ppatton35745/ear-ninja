import React from "react";
import PropTypes from "prop-types";
import ResponsivePiano from "./ResponsivePiano";
import Nav from "./Nav";
import Header from "./Header";
import Info from "./Info";
import DimensionsProvider from "./misc/DimensionsProvider";

export default class Home extends React.Component {
  static propTypes = {
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    toggleInRound: PropTypes.func.isRequired,
    toggleViewingStats: PropTypes.func.isRequired,
    roundResults: PropTypes.array.isRequired,
    inRound: PropTypes.bool.isRequired,
    viewingStats: PropTypes.bool.isRequired
  };

  render() {
    return (
      <DimensionsProvider className="dimensionProvider">
        {({ containerWidth, containerHeight }) => (
          <div className="container">
            <div
              className="nav"
              style={{
                width: containerWidth,
                height: (containerHeight - containerWidth * 0.27) * 0.15
              }}
            >
              <Nav
                toggleInRound={this.props.toggleInRound}
                toggleViewingStats={this.props.toggleViewingStats}
                inRound={this.props.inRound}
                viewingStats={this.props.viewingStats}
              />
            </div>

            <div
              className="header"
              style={{
                width: containerWidth,
                height: (containerHeight - containerWidth * 0.27) * 0.1
              }}
            >
              <Header
                inRound={this.props.inRound}
                viewingStats={this.props.viewingStats}
                roundResults={this.props.roundResults}
                currentScore={this.props.getScore(this.props.roundResults)}
              />
            </div>

            <div
              className="info"
              style={{
                width: containerWidth,
                height: (containerHeight - containerWidth * 0.27) * 0.6
              }}
            >
              <Info
                roundResults={this.props.roundResults}
                inRound={this.props.inRound}
                viewingStats={this.props.viewingStats}
              />
            </div>

            <div
              className="submitControl"
              style={{
                width: containerWidth,
                height: (containerHeight - containerWidth * 0.27) * 0.15
              }}
            />

            <div
              className="responsivePianoContainer"
              style={{ width: containerWidth, height: containerWidth * 0.27 }}
            >
              <div
                className="responsivePiano"
                style={{ width: containerWidth * 0.9 }}
              >
                <ResponsivePiano
                  width={containerWidth * 0.9}
                  onPlayNote={this.props.onPlayNote}
                  onStopNote={this.props.onStopNote}
                  disabled={this.props.disabled}
                />
              </div>
            </div>
          </div>
        )}
      </DimensionsProvider>
    );
  }
}

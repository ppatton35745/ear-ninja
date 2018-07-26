import React from "react";
import ResponsivePiano from "./ResponsivePiano";
import Tester from "./tester/Tester";

import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: 60,
      currentKey: "",
      currentQuestionNumber: 1,
      currentQuestionNotes: [],
      currentAnswerNotes: [],
      completedQuestions: []
    };
  }

  setCurrentKey = key => {
    this.setState({
      currentKey: key
    });
  };

  setCurrentQuestionNotes = notes => {
    this.setState({
      currentQuestionNotes: notes
    });
  };

  startTimer() {}

  componentDidMount() {}

  render() {
    return (
      <SoundfontProvider
        instrumentName="acoustic_grand_piano"
        audioContext={audioContext}
        hostname={soundfontHostname}
        render={({ isLoading, playNote, stopNote }) => (
          <React.Fragment>
            <Tester
              onPlayNote={playNote}
              onStopNote={stopNote}
              disabled={isLoading}
              timeRemaining={this.state.timeRemaining}
              currentKey={this.state.currentKey}
              setCurrentKey={this.setCurrentKey}
              currentQuestionNotes={this.state.currentQuestionNotes}
              setCurrentQuestionNotes={this.setCurrentQuestionNotes}
              currentQuestionNumber={this.state.currentQuestionNumber}
            />
            <DimensionsProvider>
              {({ containerWidth, containerHeight }) => (
                <ResponsivePiano
                  width={containerWidth}
                  onPlayNote={playNote}
                  onStopNote={stopNote}
                  disabled={isLoading}
                  currentAnswerNotes={this.state.currentAnswerNotes}
                />
              )}
            </DimensionsProvider>
          </React.Fragment>
        )}
      />
    );
  }
}

/* <div>
  <DimensionsProvider>
    {({ containerWidth, containerHeight }) => (
      <SoundfontProvider
        instrumentName="acoustic_grand_piano"
        audioContext={audioContext}
        hostname={soundfontHostname}
        render={({ isLoading, playNote, stopNote }) => (
          <React.Fragment>
            <TestBox
              onPlayNote={playNote}
              onStopNote={stopNote}
              disabled={isLoading}
            />
            <ResponsivePiano
              width={containerWidth}
              onPlayNote={playNote}
              onStopNote={stopNote}
              disabled={isLoading}
            />
          </React.Fragment>
        )}
      />
    )}
  </DimensionsProvider>
</div>; */

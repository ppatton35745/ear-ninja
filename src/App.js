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

  getScore = results => {
    let questions = 0;
    let correctAnswers = 0;
    results.forEach(question => {
      let correct = true;

      if (question.questionNotes.length === question.answerNotes.length) {
        question.questionNotes.forEach((questionNote, index) => {
          if (questionNote !== question.answerNotes[index]) {
            correct = false;
          }
        });
      } else {
        correct = false;
      }

      questions += 1;
      if (correct) {
        correctAnswers += 1;
      }
    });

    return { possible: questions, correct: correctAnswers };
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
              roundResults={this.state.roundResults}
              inRound={this.state.inRound}
              viewingStats={this.state.viewingStats}
              getScore={this.getScore}
            />
          )}
        />
      );
    } else if (this.state.viewingStats) {
      return (
        <Stats
          toggleViewingStats={this.toggleViewingStats}
          inRound={this.state.inRound}
          viewingStats={this.state.viewingStats}
          toggleInRound={this.toggleInRound}
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
              viewingStats={this.state.viewingStats}
              getScore={this.getScore}
            />
          )}
        />
      );
    }
  }
}

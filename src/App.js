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
      completedQuestions: [],
      initialPlay: false,
      hintNotes: []
    };
  }

  setInitialPlay = () => {
    this.setState({
      initialPlay: true
    });
  };

  setCurrentKey = key => {
    this.setState({
      currentKey: key
    });
  };

  setCurrentQuestionNotes = notes => {
    notes.sort();
    this.setState({
      currentQuestionNotes: notes
    });
  };

  clearCurrentQuestionNotes = () => {
    this.setState({
      currentQuestionNotes: []
    });
  };

  setCurrentAnswerNotes = notes => {
    notes.sort();
    this.setState({
      currentAnswerNotes: notes
    });
  };

  clearCurrentAnswerNotes = () => {
    this.setState({
      currentAnswerNotes: []
    });
  };

  submitAnswer = () => {
    this.state.completedQuestions.push({
      key: this.state.currentKey,
      questionNumber: this.state.currentQuestionNumber,
      questionNotes: this.state.currentQuestionNotes,
      answerNotes: this.state.currentAnswerNotes
    });

    this.setState({
      currentKey: "",
      currentQuestionNumber: this.state.currentQuestionNumber + 1,
      currentQuestionNotes: [],
      currentAnswerNotes: [],
      initialPlay: false
    });
  };

  startTimer() {
    const timerInterval = setInterval(() => {
      const timeRemaining = this.state.timeRemaining;
      if (timeRemaining === 0) {
        clearImmediate(timerInterval);
      } else {
        this.setState({
          timeRemaining: timeRemaining - 1
        });
      }
    }, 1000);
  }

  onHintNote = midiNumber => {
    const isHint = this.state.hintNotes.includes(midiNumber);
    if (isHint) {
      return;
    }

    this.setState(prevState => ({
      hintNotes: prevState.hintNotes.concat(midiNumber).sort()
    }));
  };

  offHintNote = midiNumber => {
    const isNotHint = !this.state.hintNotes.includes(midiNumber);
    if (isNotHint) {
      return;
    }

    this.setState(prevState => ({
      hintNotes: prevState.hintNotes.filter(note => midiNumber !== note)
    }));
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {}

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
              clearCurrentAnswerNotes={this.clearCurrentAnswerNotes}
              submitAnswer={this.submitAnswer}
              initialPlay={this.state.initialPlay}
              setInitialPlay={this.setInitialPlay}
              onHintNote={this.onHintNote}
              offHintNote={this.offHintNote}
              hintNotes={this.state.hintNotes}
              currentAnswerNotes={this.state.currentAnswerNotes}
            />
            <DimensionsProvider>
              {({ containerWidth, containerHeight }) => (
                <ResponsivePiano
                  width={containerWidth}
                  onPlayNote={playNote}
                  onStopNote={stopNote}
                  disabled={isLoading}
                  currentAnswerNotes={this.state.currentAnswerNotes}
                  setCurrentAnswerNotes={this.setCurrentAnswerNotes}
                  hintNotes={this.state.hintNotes}
                />
              )}
            </DimensionsProvider>
          </React.Fragment>
        )}
      />
    );
  }
}

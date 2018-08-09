import React from "react";
import PropTypes from "prop-types";
import DeadPiano from "../deadPiano/DeadPiano";

export default class Info extends React.Component {
  static propTypes = {
    inRound: PropTypes.bool,
    completedQuestions: PropTypes.array,
    scrollInfoToBottom: PropTypes.func,
    isCorrect: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.completedQuestions.length !==
      prevProps.completedQuestions.length
    ) {
      this.props.scrollInfoToBottom();
    }
  }

  render() {
    if (this.props.completedQuestions.length > 0) {
      return (
        <React.Fragment>
          {this.props.completedQuestions.map(completedQuestion => {
            let correctness = "deadPianoContainer";
            if (
              this.props.isCorrect(
                completedQuestion.questionNotes,
                completedQuestion.answerNotes
              )
            ) {
              correctness = correctness + " correct";
            } else {
              correctness = correctness + " incorrect";
            }
            return (
              <div
                className={correctness}
                key={completedQuestion.questionNumber}
                style={{
                  width: this.props.width * 0.24,
                  height: this.props.width * 0.24 * 0.27
                }}
              >
                <div
                  className="deadPiano"
                  style={{
                    width: this.props.width * 0.24 * 0.94
                  }}
                >
                  <DeadPiano
                    width={this.props.width * 0.24 * 0.94}
                    completedQuestion={completedQuestion}
                    inRound={this.props.inRound}
                  />
                </div>
              </div>
            );
          })}
        </React.Fragment>
      );
    } else if (this.props.inRound) {
      return null;
    } else {
      return (
        <div className="instructions">
          <h3>Instructions</h3>
          <p>
            Ear-ninja is a game designed to challenge the player to master their
            musical auditory perception. You will be presented with a scale from
            a randomly select Major key to get a musical frame of reference,
            then random tones from that scale which you must decipher and mark
            on the controller keyboard. The objective is to correctly answer as
            many intervals as possible in one minute. Your score will be a
            combination of of total correct answers and your overall accuracy
            percentage.
          </p>
          <h3>Marking Answers</h3>
          <img
            src="/img/MarkedAnswerKey.jpg"
            alt="Marked keys"
            className="markedAnswers"
          />

          <p>
            Answers can be marked by either clicking on one of the piano keys or
            pressing the hotkey corresponding to the label on the piano key.
            Selected answers will appear highlighted in orange.
          </p>
          <h3>Clearing Answers</h3>
          <img src="/img/ClearButton.jpg" alt="Clear answer button" />
          <p>
            In the event you mark an answer then realize you have marked the
            incorrect key, you may either click on the clear key or press the
            corresponding hotkey to reset your currently marked answers
          </p>
          <h3>Submitting Answers</h3>
          <img src="/img/SubmitButton.jpg" alt="Submit answer button" />
          <p>
            Once you have selected the notes you believe to have been played you
            submit your answer by either pressing the submit pbutton or the
            corresponding hotkey.
          </p>
          <h3>Need a Hint?</h3>
          <img src="/img/HintButtons.jpg" alt="Hint buttons" />
          <p>
            If you are struggling to decipher the tones that were played, you
            have a couple options for getting assistance. First you may click
            around on the piano to find the key you are looking for then clear
            all the marked answers and submit the correct answer. Careful!
            Taking this route will lead to a lower score as the goal is to click
            as few keys as possible (only the correct ones). A better option is
            to use the hint buttons (either by click or hotkey) to replay the
            musical scale, the tones, or the tones one at a time. Using these
            hints will still bare a score penalty but less severe than having to
            reset your answers.
          </p>
          <h3>Ending a Round</h3>
          <p>
            A round will automatically end at the end of one minute, scores will
            be recorded and displayed in the round feedback area. You may also
            end a round early by pressing the "End Round" button on the navbar,
            however scores for early exits will not be recorded.
          </p>
          <h5>Note:</h5>
          <p>Using a touchscreen will disable mouse clicks on the keyboard</p>
        </div>
      );
    }
  }
}

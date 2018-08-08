import React from "react";
import Header from "./Header";

const getHeaderInfo = (page, inRound, completedQuestionLength) => {
  switch (page) {
    case "home": {
      if (inRound || completedQuestionLength > 0) {
        return (
          <Header className="roundHeader">
            {[
              { className: "label timeLabel", value: "Time:" },
              { className: "timeRemaining", value: this.state.timeRemaining },
              { className: "label keyLabel", value: "Key:" },
              { className: "musicKey", value: this.state.currentKey },
              {
                className: "label scoreLabel",
                value: "Score:"
              },
              {
                className: "score",
                value: () => {
                  const currentScore = this.getScore(
                    this.state.completedQuestions
                  );
                  `${currentScore.correct}/${currentScore.possible}`;
                }
              }
            ]}
          </Header>
        );
      } else if (completedQuestionLength > 0) {
        return (
          <Header className="roundHeader">
            {[
              { className: "roundCompleteMessage", value: "Round Complete!" },
              {
                className: "label scoreLabel",
                value: "Score:"
              },
              {
                className: "score",
                value: () => {
                  const currentScore = this.getScore(
                    this.state.completedQuestions
                  );
                  `${currentScore.correct}/${currentScore.possible}`;
                }
              }
            ]}
          </Header>
        );
      } else {
        return (
          <Header className="infoHeader">
            {[{ className: "welcome", value: "Welcome to ear-ninja" }]}
          </Header>
        );
      }
    }

    case "stats": {
      return <Header>{[{ className: "statsHeader", value: "Stats" }]}</Header>;
    }

    default:
      return null;
  }
};

export default getHeaderInfo;

import React from "react";
import Header from "./Header";

const getHeader = (
  page,
  inRound,
  completedQuestions,
  timeRemaining,
  currentKey,
  getScore
) => {
  switch (page) {
    case "home": {
      if (inRound || completedQuestions.length > 0) {
        return (
          <div className="header">
            <Header className="roundHeader">
              {[
                { className: "label timeLabel", value: "Time:" },
                { className: "timeRemaining", value: timeRemaining },
                { className: "label keyLabel", value: "Key:" },
                { className: "musicKey", value: currentKey },
                {
                  className: "label scoreLabel",
                  value: "Score:"
                },
                {
                  className: "score",
                  value: () => {
                    const currentScore = getScore(completedQuestions);
                    `${currentScore.correct}/${currentScore.possible}`;
                  }
                }
              ]}
            </Header>
          </div>
        );
      } else if (completedQuestions.length > 0) {
        return (
          <div className="header">
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
                    const currentScore = getScore(completedQuestions);
                    `${currentScore.correct}/${currentScore.possible}`;
                  }
                }
              ]}
            </Header>
          </div>
        );
      } else {
        return (
          <div className="header">
            <Header className="infoHeader">
              {[{ className: "welcome", value: "Welcome to ear-ninja" }]}
            </Header>
          </div>
        );
      }
    }

    case "stats": {
      return (
        <div className="header">
          <Header>{[{ className: "statsHeader", value: "Stats" }]}</Header>
        </div>
      );
    }

    default:
      return null;
  }
};

export default getHeader;

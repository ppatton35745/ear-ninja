import React from "react";
import CompletedQuestions from "./CompletedQuestions";
import Instructions from "./Instructions";

const getInfo = (
  inRound,
  completedQuestionLength,
  width,
  completedQuestions,
  scrollInfoToBottom,
  isCorrect
) => {
  if (inRound || completedQuestionLength > 0) {
    return (
      <div className="info">
        <CompletedQuestions
          width={width}
          completedQuestions={completedQuestions}
          scrollInfoToBottom={scrollInfoToBottom}
          isCorrect={isCorrect}
        />
        <div
          ref="infoScrollBottom"
          style={{
            width: 100 + "%"
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="info">
        <Instructions />
      </div>
    );
  }
};

export default getInfo;

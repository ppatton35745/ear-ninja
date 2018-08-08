import React from "react";
import CompletedQuestions from "./CompletedQuestions";
import Instructions from "./Instructions";

const getInfo = (
  inRound,
  completedQuestionLength,
  width,
  completedQuestions,
  scrollInfoToBottom,
  isCorrect,
  containerHeight,
  PianoHeight
) => {
  if (inRound || completedQuestionLength > 0) {
    return (
      <div
        className="info"
        style={{
          height: containerHeight - 120 - PianoHeight + "px"
        }}
      >
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
      <div
        className="info"
        style={{
          height: containerHeight - 120 - PianoHeight + "px"
        }}
      >
        <Instructions />
        <div
          ref="infoScrollBottom"
          style={{
            width: 100 + "%"
          }}
        />
      </div>
    );
  }
};

export default getInfo;

import React from "react";
import CompletedQuestions from "./CompletedQuestions";
import Instructions from "./Instructions";

const getInfo = (
  inRound,
  width,
  completedQuestions,
  scrollInfoToBottom,
  isCorrect,
  containerHeight,
  PianoHeight
) => {
  if (inRound || completedQuestions.length > 0) {
    return (
      <div
        className="info"
        style={{
          height:
            containerHeight - 120 - PianoHeight + (inRound ? -50 : 0) + "px"
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

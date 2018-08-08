import React from "react";
import CompletedQuestions from "./CompletedQuestions";
import Instructions from "./Instructions";

const getInfoInfo = (
  inRound,
  completedQuestionLength,
  width,
  height,
  completedQuestions,
  scrollInfoToBottom,
  isCorrect
) => {
  if (inRound || completedQuestionLength > 0) {
    return (
      <React.Fragment>
        <CompletedQuestions
          width={this.props.containerWidth}
          height={heightRemaining * heightProportions.info}
          completedQuestions={this.state.completedQuestions}
          scrollInfoToBottom={this.scrollInfoToBottom}
          isCorrect={this.isCorrect}
        />
        <div
          ref="infoScrollBottom"
          style={{
            width: 100 + "%"
            // height: 1 + "px"
          }}
        />
      </React.Fragment>
    );
  } else {
    return <Instructions />;
  }
};

export default getHeaderInfo;

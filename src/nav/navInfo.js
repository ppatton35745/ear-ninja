import React from "react";
import Nav from "./Nav";

const getNavInfo = (page, inRound) => {
  switch (page) {
    case "home": {
      if (inRound) {
        return (
          <Nav> {[{ key: 1, label: "End Round", func: this.endRound }]} </Nav>
        );
        break;
      } else {
        return (
          <Nav>
            {[
              { key: 1, label: "Play Round", func: this.startRound },
              {
                key: 2,
                label: "Stats",
                func: () => this.props.setViewingStats(true)
              },
              { key: 3, label: "Log Out", func: this.props.logUserOut }
            ]}
          </Nav>
        );
        break;
      }
    }

    case "stats": {
      return (
        <Nav>
          {[
            {
              key: 1,
              label: "Home",
              func: () => this.props.setViewingStats(true)
            },
            {
              key: 2,
              label: "Log Out",
              func: this.props.logUserOut
            }
          ]}
        </Nav>
      );
      break;
    }

    default:
      return null;
      break;
  }
};

export default getNavInfo;

import React from "react";
import Nav from "./Nav";

const getNav = (
  page,
  logUserOut,
  setViewingStats,
  inRound,
  endRound,
  startRound
) => {
  switch (page) {
    case "home": {
      if (inRound) {
        return (
          <div className="nav">
            <Nav>{[{ key: 1, label: "End Round", func: endRound }]}</Nav>
          </div>
        );
      } else {
        return (
          <div className="nav">
            <Nav>
              {[
                { key: 1, label: "Play Round", func: startRound },
                {
                  key: 2,
                  label: "Stats",
                  func: () => setViewingStats(true)
                },
                { key: 3, label: "Log Out", func: logUserOut }
              ]}
            </Nav>
          </div>
        );
      }
    }

    case "stats": {
      return (
        <div className="nav">
          <Nav>
            {[
              {
                key: 1,
                label: "Home",
                func: () => setViewingStats(true)
              },
              {
                key: 2,
                label: "Log Out",
                func: logUserOut
              }
            ]}
          </Nav>
        </div>
      );
    }

    default:
      return null;
  }
};

export default getNav;

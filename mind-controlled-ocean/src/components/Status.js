
import React, { useState, useEffect } from "react";
import "../global.css";

const statesLabels = {
  booting: "Starting OS...",
  shuttingOff: "Shutting off...",
  updating: "Updating OS...",
  online: "Online",
  offline: "Offline"
};

const stateColors = {
  booting: "darkslategrey",
  shuttingOff: "darkslategrey",
  updating: "orange",
  online: "limegreen",
  offline: "crimson"
};

function getStatusColor(state) {
  if (state in stateColors) {
    return stateColors[state];
  }

  return stateColors.offline;
}

export function Status({ status }) {
  const { state, charging, battery, sleepMode } = status || {};

  if (!status) {
    return <div>Connecting to device...</div>;
  }

  return (
    <div className="status-container">
      {/* {info ? <h3 className="card-heading">{info.deviceNickname}</h3> : null} */}
      <div className="status-item ">
        <span
          className="status-indicator"
          style={{ background: getStatusColor(state) }}
        ></span>
        {state in statesLabels ? statesLabels[state] : state}
      </div>
      {state !== "offline" ? (
      <div className="status-item">
          {charging ? " Charging " : " Charged "}
          {battery}%
      </div>
      ) : null}
      {sleepMode && state !== "offline" ? (
        <div className="status-item">
          <span role="img" aria-label="Moon Emoji">
            &#127769;
          </span>
          {" Sleep mode "}
        </div>
      ) : null}
      </div>
  );
}
import React from "react";
import "./LogHistory.css";

const LogHistory = ({ logs = [] }) => {
  return (
    <div className="log-history">
      <h2>Log History</h2>
      {logs && logs.length > 0 ? (
        <div>
          {logs.map((log, index) => (
            <div key={index} className="log-item">
              <h3>{log.date} at {log.time}</h3>
              <p>{log.notes}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-logs">No symptom logs yet. Add your first log above!</p>
      )}
    </div>
  );
};

export default LogHistory;
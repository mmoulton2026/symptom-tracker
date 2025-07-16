import React from "react";
import "./ExportButton.css";

const ExportButton = ({ logs = [] }) => {
  const exportToCSV = () => {
    if (!logs || logs.length === 0) {
      alert("No logs to export!");
      return;
    }

    const headers = ["Date", "Time", "Notes"];
    const rows = logs.map(log => [
      log.date, 
      log.time, 
      `"${log.notes ? log.notes.replace(/"/g, '""') : ''}"`
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "symptom_logs.csv";
    a.click();
    URL.revokeObjectURL(url); // Clean up memory
  };

  return (
    <button className="export-button" onClick={exportToCSV}>
      Export to CSV ({logs ? logs.length : 0} logs)
    </button>
  );
};

export default ExportButton;
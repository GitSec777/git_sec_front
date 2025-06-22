import React from "react";
import "../../css/pages/Report.css";

const Report = () => {
  return (
    <div className="report-container">
      <div className="report-header">
        <h1 className="report-title">Report Title</h1>
        <button className="info-button">Info</button>
      </div>
      <div className="report-grid">
        {/* Your grid items go here */}
        <div className="grid-item">Item 1</div>
        <div className="grid-item">Item 2</div>
        {/* ... more items ... */}
      </div>
    </div>
  );
};

export default Report;

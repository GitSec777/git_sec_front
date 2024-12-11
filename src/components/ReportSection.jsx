import React from "react";
import InfoButton from "./InfoButton";

const ReportSection = ({ title, children, infoText }) => {
  return (
    <section className="report-section">
      <h2>{title}</h2>
      <div className="org-report-details">{children}</div>
      {infoText && <InfoButton infoText={infoText} />}
    </section>
  );
};

export default ReportSection;

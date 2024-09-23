import React, { useState } from "react";

const InfoButton = ({ infoText }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <div
      className="info-button-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      ℹ️
      {showInfo && <div className="info-tooltip">{infoText}</div>}
    </div>
  );
};

export default InfoButton;

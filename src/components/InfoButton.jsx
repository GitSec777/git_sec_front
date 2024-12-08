import React, { useState } from "react";
import "../../css/components/buttons.css";

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
      <div className="info-button">
        i
        {showInfo && (
          <div className="info-tooltip">
            <div className="tooltip-content">{infoText}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoButton;

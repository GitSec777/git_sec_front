import React from "react";
import "../../css/pages/Recommendations.css";

const Recommendations = () => {
  return (
    <div className="recommendations-page">
      <div className="recommendations-header">
        <h1 className="glitch" data-text="Security Recommendations">
          Security Recommendations
        </h1>
        <p>
          Here are some recommendations to improve your repository's security:
        </p>
      </div>
      <div className="recommendation-section-container">
        <div className="recommendation-section dos-section">
          <h2>DOs</h2>
          <ul>
            <li>Enable Two-Factor Authentication (2FA) for all members.</li>
            <li>Regularly review and update repository permissions.</li>
            <li>
              Use branch protection rules to prevent unauthorized changes.
            </li>
            <li>
              Monitor and audit repository activities for suspicious behavior.
            </li>
            <li>Keep dependencies up to date to avoid vulnerabilities.</li>
            <li>
              Use secret scanning to detect and prevent leaks of sensitive
              information.
            </li>
          </ul>
        </div>
        <div className="recommendation-section donts-section">
          <h2>DON'Ts</h2>
          <ul>
            <li>
              Don't share your GitHub token or other sensitive credentials.
            </li>
            <li>
              Don't allow direct pushes to the main branch without review.
            </li>
            <li>
              Don't ignore security alerts and vulnerability notifications.
            </li>
            <li>Don't use weak or easily guessable passwords.</li>
            <li>
              Don't grant unnecessary permissions to users or applications.
            </li>
            <li>Don't overlook the importance of regular backups.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;

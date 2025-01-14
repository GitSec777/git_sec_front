import React from "react";
import InfoButton from "./InfoButton";

const AlertCard = ({ alert, type }) => {
  const renderAlertContent = () => {
    switch (type) {
      case "secret":
        return (
          <>
            <div className="alert-header">
              <span className="alert-title">{alert.secret_type}</span>
              <span className="state-badge">{alert.state}</span>
            </div>
            <div className="alert-info">
              <div>
                <span className="label">Created:</span>{" "}
                {new Date(alert.created_at).toLocaleDateString()}
              </div>
              {alert.resolution && (
                <div>
                  <span className="label">Resolution:</span> {alert.resolution}
                </div>
              )}
            </div>
          </>
        );

      case "code":
        return (
          <>
            <div className="alert-header">
              <span className="alert-title">
                {alert.rule?.description || "Unknown Issue"}
              </span>
              <span
                className={`severity-badge ${alert.rule?.severity || "medium"}`}
              >
                {alert.rule?.severity || "medium"}
              </span>
            </div>
            <div className="alert-info">
              <div>
                <span className="label">State:</span> {alert.state}
              </div>
              <div>
                <span className="label">Created:</span>{" "}
                {new Date(alert.created_at).toLocaleDateString()}
              </div>
              {alert.most_recent_instance && (
                <div className="alert-location">
                  <span className="label">Location:</span>
                  <div>File: {alert.most_recent_instance.location?.path}</div>
                  <div>
                    Line: {alert.most_recent_instance.location?.start_line}
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case "vulnerability":
        return (
          <>
            <div className="alert-header">
              <span className="alert-title">
                {alert.security_advisory?.summary || "Unknown Vulnerability"}
              </span>
              <span
                className={`severity-badge ${
                  alert.security_advisory?.severity || "medium"
                }`}
              >
                {alert.security_advisory?.severity || "medium"}
              </span>
            </div>
            <div className="alert-info">
              <div>
                <span className="label">Package:</span>{" "}
                {alert.security_vulnerability?.package?.name}
              </div>
              <div>
                <span className="label">Vulnerable Versions:</span>{" "}
                {alert.security_vulnerability?.vulnerable_version_range}
              </div>
              <div>
                <span className="label">First Patched Version:</span>{" "}
                {
                  alert.security_vulnerability?.first_patched_version
                    ?.identifier
                }
              </div>
            </div>
          </>
        );

      case "not configured":
        return (
          <>
            <div className="alert-header">
              <span className="alert-title">
                Secret Scanning Not Configured
              </span>
              <span className="severity-badge high">Security Risk</span>
            </div>
            <div className="alert-info">
              <p>
                This repository does not have secret scanning enabled. Secret
                scanning helps detect and prevent accidental commits of secrets.
              </p>
            </div>
          </>
        );

      case "Vul report status":
        console.log("inside Vul report status", alert);
        return (
          <>
            <div className="alert-header">
              <span className="alert-title">
                {alert.status === "enabled"
                  ? "Vulnerability Alerts Enabled"
                  : "Vulnerability Alerts Not Configured"}
              </span>
              <span
                className={`severity-badge ${
                  alert.status === "enabled" ? "low" : "high"
                }`}
              >
                {alert.status === "enabled"
                  ? "not_configured"
                  : "Security Risk"}
              </span>
            </div>
            <div className="alert-info">
              <p>
                {alert.status === "enabled"
                  ? "Repository has vulnerability alerts enabled. You will be notified of any vulnerabilities found."
                  : "This repository does not have vulnerability alerts enabled. Enable them to get notified of security vulnerabilities."}
              </p>
            </div>
          </>
        );

      case "dependabot":
        return (
          <>
            <div className="alert-header">
              <span className="alert-title">
                {alert.summary || "Unknown Issue"}
              </span>
              <span
                className={`severity-badge ${alert.severity.toLowerCase()}`}
              >
                {alert.severity}
              </span>
            </div>
            <div className="alert-info">
              <div>
                <span className="label">Package:</span> {alert.package_name}
              </div>
              <div>
                <span className="label">Ecosystem:</span> {alert.ecosystem}
              </div>
              <div>
                <span className="label">Vulnerable Versions:</span>{" "}
                {alert.vulnerable_version}
              </div>
              <div>
                <span className="label">Patched Version:</span>{" "}
                {alert.patched_version}
              </div>
              <div>
                <span className="label">Repository:</span> {alert.repository}
              </div>
              <div>
                <span className="label">State:</span> {alert.state}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={` ${type === "not configured" ? "insecure" : ""} alert-card`}
    >
      <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong>
      <div className="alert-details">{renderAlertContent()}</div>
      {type === "not configured" && (
        <InfoButton infoText="Enable secret scanning in repository settings to detect and prevent exposure of secrets." />
      )}
    </div>
  );
};

export default AlertCard;

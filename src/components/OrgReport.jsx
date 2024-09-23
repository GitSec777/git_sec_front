import React from "react";
import InfoButton from "./InfoButton";
import "../../css/components/OrgReport.css";

const OrgReport = ({ data }) => {
  return (
    <div classNa me="org-report">
      <h1 className="glitch" data-text="Organization Report">
        Organization Report
      </h1>
      <div className="report-container">
        <div className="org-report-details">
          <div className="report-section">
            <strong>Organization Login:</strong> {data.login}
          </div>
          <div className="report-section">
            <strong>URL:</strong> <a href={data.url}>{data.url}</a>
          </div>
          <div className="report-section">
            <strong>HTML URL:</strong>{" "}
            <a href={data.html_url}>{data.html_url}</a>
          </div>
          <div className="report-section">
            <strong>Created At:</strong>{" "}
            {new Date(data.created_at).toLocaleString()}
          </div>
          <div className="report-section">
            <strong>Updated At:</strong>{" "}
            {new Date(data.updated_at).toLocaleString()}
          </div>
          <div className="report-section">
            <strong>Public Repositories:</strong> {data.public_repos}
          </div>
          <div className="report-section">
            <strong>Owned Private Repositories:</strong>{" "}
            {data.owned_private_repos}
          </div>
          <div className="report-section">
            <strong>Total Private Repositories:</strong>{" "}
            {data.total_private_repos}
          </div>
          <div className="report-section">
            <InfoButton infoText="Two-factor authentication adds an extra layer of security to your account." />
            <strong>Two-Factor Requirement Enabled:</strong>{" "}
            {data.two_factor_requirement_enabled ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Controls the type of repositories members can create. Restricting this can prevent unauthorized repository creation." />
            <strong>Members Allowed Repository Creation Type:</strong>{" "}
            {data.members_allowed_repository_creation_type}
          </div>
          <div className="report-section">
            <InfoButton infoText="Allows members to fork private repositories, which can expose sensitive information. Consider disabling for private repos." />
            <strong>Members Can Fork Private Repositories:</strong>{" "}
            {data.members_can_fork_private_repositories ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Requiring signoff adds accountability and can help track changes for security audits." />
            <strong>Web Commit Signoff Required:</strong>{" "}
            {data.web_commit_signoff_required ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Verification indicates that the organization is legitimate and trusted." />
            <strong>Is Verified:</strong> {data.is_verified ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="The plan name indicates the subscription level of the organization." />
            <strong>Plan Name:</strong> {data.plan_name}
          </div>
          <div className="report-section">
            <InfoButton infoText="The number of filled seats indicates how many members are using the organization's plan." />
            <strong>Filled Seats:</strong> {data.filled_seats}
          </div>
          <div className="report-section">
            <InfoButton infoText="The number of private repositories allowed by the organization's plan." />
            <strong>Plan Private Repositories:</strong>{" "}
            {data.plan_private_repos}
          </div>
          <div className="report-section">
            <strong>Members URL:</strong>{" "}
            <a href={data.members_url}>{data.members_url}</a>
          </div>
          <div className="report-section">
            <strong>Repositories URL:</strong>{" "}
            <a href={data.repos_url}>{data.repos_url}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgReport;

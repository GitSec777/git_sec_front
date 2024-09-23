import React from "react";
import InfoButton from "./InfoButton";

const OrgReport = ({ data }) => {
  // Helper function to assign compliant or non-compliant class

  const getComplianceClass = (condition) =>
    condition ? "compliant" : "non-compliant";

  return (
    <div className="org-report">
      <h2>Organization Report: {data.login}</h2>
      <div className="org-report-details">
        {/* Two-Factor Authentication */}
        <div
          className={`report-section ${getComplianceClass(
            data.two_factor_requirement_enabled
          )}`}
        >
          <InfoButton infoText="Two-factor authentication is a security feature that helps protect your account from unauthorized access." />
          <strong>Two-Factor Requirement Enabled:</strong>{" "}
          {data.two_factor_requirement_enabled ? "Yes" : "No"}
        </div>

        {/* Members Can Fork Private Repositories */}
        <div
          className={`report-section ${getComplianceClass(
            !data.members_can_fork_private_repositories
          )}`}
        >
          <InfoButton infoText="Allowing members to fork private repositories can increase the risk of data exposure." />
          <strong>Members Can Fork Private Repositories:</strong>{" "}
          {data.members_can_fork_private_repositories ? "Yes" : "No"}
        </div>

        {/* Web Commit Signoff Required */}
        <div
          className={`report-section ${getComplianceClass(
            data.web_commit_signoff_required
          )}`}
        >
          <InfoButton infoText="Requiring web commit signoff can help ensure that all commits are authorized." />
          <strong>Web Commit Signoff Required:</strong>{" "}
          {data.web_commit_signoff_required ? "Yes" : "No"}
        </div>

        {/* Members Allowed Repository Creation Type */}
        <div className={`report-section`}>
          <InfoButton infoText="Restricting repository creation types can help maintain organization standards." />
          <strong>Members Allowed Repository Creation Type:</strong>{" "}
          {data.members_allowed_repository_creation_type}
        </div>

        {/* Organization Verification */}
        <div
          className={`report-section ${getComplianceClass(data.is_verified)}`}
        >
          <InfoButton infoText="Verified organizations have confirmed their identity with GitHub." />
          <strong>Organization Verified:</strong>{" "}
          {data.is_verified ? "Yes" : "No"}
        </div>

        {/* Owned Private Repositories */}
        <div className="report-section">
          <InfoButton infoText="Owned private repositories are repositories owned by the organization." />
          <strong>Owned Private Repositories:</strong>{" "}
          {data.owned_private_repos}
        </div>

        {/* Total Private Repositories */}
        <div className="report-section">
          <InfoButton infoText="Total private repositories are the sum of owned and private repositories." />
          <strong>Total Private Repositories:</strong>{" "}
          {data.total_private_repos}
        </div>

        {/* Plan Name */}
        <div className="report-section">
          <InfoButton infoText="The plan name indicates the organization's GitHub subscription level." />
          <strong>Plan Name:</strong> {data.plan_name}
        </div>

        {/* Filled Seats */}
        <div className="report-section">
          <infoButton infoText="Filled seats are the number of users in the organization." />
          <strong>Filled Seats:</strong> {data.filled_seats}
        </div>

        {/* Plan Private Repositories */}
        <div className="report-section">
          <InfoButton infoText="Plan private repositories are the number of private repositories allowed by the organization's GitHub subscription level." />
          <strong>Plan Private Repositories:</strong> {data.plan_private_repos}
        </div>

        {/* Organization Created At */}
        <div className="report-section">
          <strong>Created At:</strong>{" "}
          {new Date(data.created_at).toLocaleDateString()}
        </div>

        {/* Organization Updated At */}
        <div className="report-section">
          <strong>Updated At:</strong>{" "}
          {new Date(data.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default OrgReport;

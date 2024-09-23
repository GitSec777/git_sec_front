import React from "react";
import InfoButton from "./InfoButton";

const RepoReport = ({ data }) => {
  return (
    <div className="repo-report">
      <h2>Repository Report: {data.repository_name}</h2>
      <div className="report-container">
        <div className="repo-report-details">
          <div className="report-section">
            <strong>Repository Name:</strong> {data.repository_name}
          </div>
          <div className="report-section">
            <strong>Visibility:</strong> {data.visibility}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Has Issues Enabled:</strong>{" "}
            {data.has_issues_enabled ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Has Projects Enabled:</strong>{" "}
            {data.has_projects_enabled ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Open Issues Count:</strong> {data.open_issues_count}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Default Branch:</strong> {data.default_branch}
          </div>

          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Allow Forking:</strong> {data.allow_forking ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <strong>Has Wiki Enabled:</strong>{" "}
            {data.has_wiki_enabled ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Allow Squash Merge:</strong>{" "}
            {data.allow_squash_merge ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Allow Merge Commit:</strong>{" "}
            {data.allow_merge_commit ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Web Commit Signoff Required:</strong>{" "}
            {data.web_commit_signoff_required ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Delete Branch on Merge:</strong>{" "}
            {data.delete_branch_on_merge ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="The repository description provides information about the repository's purpose." />
            <strong>Forks Count:</strong> {data.forks_count}
          </div>
          <div className="report-section">
            <strong>Subscribers Count:</strong> {data.subscribers_count}
          </div>
        </div>
        <div className="permission-section">
          <InfoButton infoText="Permissions determine the actions that can be performed on the repository." />
          <h3>Permissions:</h3>

          <div className="report-section">
            <strong>Admin:</strong> {data.permissions.admin ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <strong>Push:</strong> {data.permissions.push ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <strong>Pull:</strong> {data.permissions.pull ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoReport;

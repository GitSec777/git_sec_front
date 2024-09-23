import React from "react";
import InfoButton from "./InfoButton";
import "../../css/components/RepoReport.css";

const RepoReport = ({ data }) => {
  return (
    <div className="repo-report">
      <h1 className="glitch" data-text="Repository Report">
        Repository Report
      </h1>
      <div className="report-container">
        <div className="repo-report-details">
          <div className="report-section">
            <strong>Repository Name:</strong> {data.name}
          </div>
          <div className="report-section">
            <strong>Visibility:</strong> {data.visibility}
          </div>
          <div className="report-section">
            <InfoButton infoText="Issues can expose sensitive information if not properly managed. Consider disabling if not needed." />
            <strong>Has Issues Enabled:</strong>{" "}
            {data.has_issues_enabled ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Projects can expose sensitive information if not properly secured. Disable if not in use." />
            <strong>Has Projects Enabled:</strong>{" "}
            {data.has_projects_enabled ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="A high number of open issues may indicate unresolved security vulnerabilities." />
            <strong>Open Issues Count:</strong> {data.open_issues_count}
          </div>
          <div className="report-section">
            <InfoButton infoText="The default branch is the main target for pull requests. Ensure it's protected." />
            <strong>Default Branch:</strong> {data.default_branch}
          </div>
          <div className="report-section">
            <InfoButton infoText="Allowing forking can lead to code exposure. Consider disabling for private repos." />
            <strong>Allow Forking:</strong> {data.allow_forking ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Wikis can potentially expose sensitive information. Disable if not needed." />
            <strong>Has Wiki Enabled:</strong>{" "}
            {data.has_wiki_enabled ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Squash merging can help maintain a cleaner, more secure commit history." />
            <strong>Allow Squash Merge:</strong>{" "}
            {data.allow_squash_merge ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Merge commits preserve full history but may include sensitive information in commit messages." />
            <strong>Allow Merge Commit:</strong>{" "}
            {data.allow_merge_commit ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Requiring signoff adds accountability and can help track changes for security audits." />
            <strong>Web Commit Signoff Required:</strong>{" "}
            {data.web_commit_signoff_required ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="Deleting branches after merging helps maintain a clean repository and reduces potential attack surface." />
            <strong>Delete Branch on Merge:</strong>{" "}
            {data.delete_branch_on_merge ? "Yes" : "No"}
          </div>
          <div className="report-section">
            <InfoButton infoText="A high number of forks increases the risk of code exposure and potential misuse." />
            <strong>Forks Count:</strong> {data.forks_count}
          </div>
        </div>
        <div className="permission-section">
          <InfoButton infoText="Permissions control access levels. Restrict admin and push access to minimize security risks." />
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

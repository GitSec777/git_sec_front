import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import InfoButton from "./InfoButton";
import "../../css/components/RepoReport.css";
import { githubService } from "../services/githubService";

const RepoReport = () => {
  const { repoId } = useParams();
  const { selectedOrg, selectedRepo } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // Add navigate
  const [repoData, setRepoData] = useState(null);
  const [dependabotAlerts, setDependabotAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("in reop selectedRepo:", selectedRepo);
  // console.log("in repo orgId:", orgId);
  console.log("in repo repoId:", repoId);

  useEffect(() => {
    if (!selectedRepo) {
      navigate("/selection"); // Redirect if no repo is selected
      return;
    }

    const fetchRepoData = async () => {
      setIsLoading(true);
      try {
        console.log("in repo fetchRepoData");

        // Keep existing data
        setData(selectedRepo);
        console.log("selectedRepo:", data);
        // const reportData = await githubService.getRepoReport(
        //   `${orgId}/${repoId}`,
        //   selectedOrg.token
        // );
        // setRepoData(reportData);

        // Add new data
        // const alertsData = await githubService.getDependabotAlerts(
        //   orgId,
        //   repoId,
        //   selectedOrg.token
        // );
        // setDependabotAlerts(alertsData);
      } catch (error) {
        console.error("Error fetching repo data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedRepo && repoId) {
      fetchRepoData();
    }
  }, [repoId, selectedOrg, selectedRepo, navigate]);

  if (!data) return <div className="loading">Loading repository data...</div>;

  return (
    <div className="repo-report">
      <h1 className="glitch" data-text="Repository Report">
        Repository Report
      </h1>
      <div className="report-container">
        <div className="repo-report-details">
          <div className="report-section">
            <div className="report-content">
              <strong>Repository Name:</strong> {data.name}
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Visibility:</strong> {data.visibility}
            </div>
          </div>
          <div
            className={`report-section ${
              data.has_issues_enabled ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Has Issues Enabled:</strong>{" "}
              {data.has_issues_enabled ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Issues can expose sensitive information if not properly managed. Consider disabling if not needed." />
          </div>
          <div
            className={`report-section ${
              data.has_projects_enabled ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Has Projects Enabled:</strong>{" "}
              {data.has_projects_enabled ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Projects can expose sensitive information if not properly secured. Disable if not in use." />
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Open Issues Count:</strong> {data.open_issues_count}
            </div>
            <InfoButton infoText="A high number of open issues may indicate unresolved security vulnerabilities." />
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Default Branch:</strong> {data.default_branch}
            </div>
            <InfoButton infoText="The default branch is the main target for pull requests. Ensure it's protected." />
          </div>
          <div
            className={`report-section ${data.allow_forking ? "insecure" : ""}`}
          >
            <div className="report-content">
              <strong>Allow Forking:</strong>{" "}
              {data.allow_forking ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Allowing forking can lead to code exposure. Consider disabling for private repos." />
          </div>
          <div
            className={`report-section ${
              data.has_wiki_enabled ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Has Wiki Enabled:</strong>{" "}
              {data.has_wiki_enabled ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Wikis can potentially expose sensitive information. Disable if not needed." />
          </div>
          <div
            className={`report-section ${
              !data.allow_squash_merge ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Allow Squash Merge:</strong>{" "}
              {data.allow_squash_merge ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Squash merging can help maintain a cleaner, more secure commit history." />
          </div>
          <div
            className={`report-section ${
              data.allow_merge_commit ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Allow Merge Commit:</strong>{" "}
              {data.allow_merge_commit ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Merge commits preserve full history but may include sensitive information in commit messages." />
          </div>
          <div
            className={`report-section ${
              !data.web_commit_signoff_required ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Web Commit Signoff Required:</strong>{" "}
              {data.web_commit_signoff_required ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Requiring signoff adds accountability and can help track changes for security audits." />
          </div>
          <div
            className={`report-section ${
              !data.delete_branch_on_merge ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Delete Branch on Merge:</strong>{" "}
              {data.delete_branch_on_merge ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Deleting branches after merging helps maintain a clean repository and reduces potential attack surface." />
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Forks Count:</strong> {data.forks_count}
            </div>
            <InfoButton infoText="A high number of forks increases the risk of code exposure and potential misuse." />
          </div>
        </div>
        <div className="permission-section">
          <h3>Permissions:</h3>
          <InfoButton infoText="Permissions control access levels. Restrict admin and push access to minimize security risks." />

          <div className="report-section">
            <div className="report-content">
              <strong>Admin:</strong> {data.permissions.admin ? "Yes" : "No"}
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Push:</strong> {data.permissions.push ? "Yes" : "No"}
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Pull:</strong> {data.permissions.pull ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoReport;

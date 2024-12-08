import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import InfoButton from "./InfoButton";
import "../../css/components/RepoReport.css";
import { githubService } from "../services/githubService";

const RepoReport = () => {
  const { selectedRepo, isAuthenticated, selectedOrg } =
    useContext(AuthContext);
  const { repoId } = useParams();
  const repoIdWithoutOrg = repoId.replace(selectedOrg + "-", "");
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // Add navigate
  const [repoData, setRepoData] = useState(null);
  const [dependabotAlerts, setDependabotAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [codeScanningAlerts, setCodeScanningAlerts] = useState([]);
  const [secretScanningAlerts, setSecretScanningAlerts] = useState([]);
  const [vulnerabilityAlerts, setVulnerabilityAlerts] = useState([]);

  useEffect(() => {
    if (!selectedRepo || !isAuthenticated) {
      navigate("/selection"); // Redirect if no repo is selected
      return;
    }

    const fetchRepoData = async () => {
      setIsLoading(true);
      try {
        // Keep existing data
        setData(selectedRepo);

        // Handle each API call separately
        try {
          const codeScanData = await githubService.getRepoCodeScanningAlerts(
            selectedOrg,
            repoIdWithoutOrg
          );
          setCodeScanningAlerts(codeScanData || []);
        } catch (error) {
          console.error("Error fetching code scanning alerts:", error);
          setCodeScanningAlerts([]);
        }

        try {
          const secretScanData =
            await githubService.getRepoSecretScanningAlerts(
              selectedOrg,
              repoIdWithoutOrg
            );
          setSecretScanningAlerts(secretScanData || []);
        } catch (error) {
          console.error("Error fetching secret scanning alerts:", error);
          setSecretScanningAlerts([]);
        }

        try {
          const vulData = await githubService.getRepoVulnerabilityAlerts(
            selectedOrg,
            repoIdWithoutOrg
          );
          setVulnerabilityAlerts(vulData || []);
        } catch (error) {
          console.error("Error fetching vulnerability alerts:", error);
          setVulnerabilityAlerts([]);
        }
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
  }, [repoId, selectedRepo, navigate]);

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
              <strong>Repository Name:</strong>
              {data.name}
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
              <p>{data.has_issues_enabled ? "Yes" : "No"}</p>
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

        {/* Security Scanning Alerts */}
        <section className="report-section">
          <h2>Security Scanning</h2>
          <div className="org-report-details">
            {/* Code Scanning Alerts */}
            <div className="alerts-container">
              <h3>Code Scanning Alerts</h3>
              {codeScanningAlerts.length > 0 ? (
                codeScanningAlerts.map((alert, index) => (
                  <div key={index} className="report-content">
                    <strong>Alert:</strong>
                    <div className="alert-details">
                      <div className="alert-header">
                        <span className="alert-title">
                          {alert.rule?.description || "Unknown Issue"}
                        </span>
                        <span
                          className={`severity-badge ${
                            alert.rule?.severity || "medium"
                          }`}
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
                            <div>
                              File: {alert.most_recent_instance.location?.path}
                            </div>
                            <div>
                              Line:{" "}
                              {alert.most_recent_instance.location?.start_line}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="success-message">
                  No code scanning alerts found
                </div>
              )}
            </div>

            {/* Secret Scanning Alerts */}
            <div className="alerts-container">
              <h3>Secret Scanning Alerts</h3>
              {secretScanningAlerts?.error === "not_configured" ? (
                <div className="report-content insecure">
                  <strong>Status:</strong>
                  <div className="alert-details">
                    <div className="alert-header">
                      <span className="alert-title">
                        Secret Scanning Not Configured
                      </span>
                      <span className="severity-badge high">Security Risk</span>
                    </div>
                    <div className="alert-info">
                      <p>
                        This repository does not have secret scanning enabled.
                        Secret scanning helps detect and prevent accidental
                        commits of secrets.
                      </p>
                    </div>
                  </div>
                  <InfoButton infoText="Enable secret scanning in repository settings to detect and prevent exposure of secrets." />
                </div>
              ) : secretScanningAlerts && secretScanningAlerts.length > 0 ? (
                secretScanningAlerts.map((alert, index) => (
                  <div key={index} className="report-content">
                    <strong>Secret:</strong>
                    <div className="alert-details">
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
                            <span className="label">Resolution:</span>{" "}
                            {alert.resolution}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="success-message">
                  No secret scanning alerts found
                </div>
              )}
            </div>

            {/* Vulnerability Alerts */}
            <div className="alerts-container">
              <h3>Vulnerability Alerts</h3>
              {vulnerabilityAlerts.length > 0 ? (
                vulnerabilityAlerts.map((alert, index) => (
                  <div key={index} className="report-content">
                    <strong>Vulnerability:</strong>
                    <div className="alert-details">
                      <div className="alert-header">
                        <span className="alert-title">
                          {alert.security_advisory?.summary ||
                            "Unknown Vulnerability"}
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
                          {
                            alert.security_vulnerability
                              ?.vulnerable_version_range
                          }
                        </div>
                        <div>
                          <span className="label">First Patched Version:</span>{" "}
                          {
                            alert.security_vulnerability?.first_patched_version
                              ?.identifier
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="success-message">
                  No vulnerability alerts found
                </div>
              )}
            </div>
          </div>
          <InfoButton infoText="Review security scanning results to identify and address potential security issues." />
        </section>
      </div>
    </div>
  );
};

export default RepoReport;

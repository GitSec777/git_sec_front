import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import InfoButton from "./InfoButton";
import ReportSection from "./ReportSection";
import "../../css/components/RepoReport.css";
import { githubService } from "../services/githubService";
import AlertCard from "./AlertCard";

const RepoReport = () => {
  const { selectedRepo, isAuthenticated, selectedOrg } =
    useContext(AuthContext);
  console.log("selectedOrg", selectedOrg);
  const { repoId } = useParams();
  console.log("repoId", repoId);
  const repoIdWithoutOrg = repoId.replace(selectedOrg.login + "-", "");
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
            selectedOrg.login,
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
              selectedOrg.login,
              repoIdWithoutOrg
            );
          setSecretScanningAlerts(secretScanData || []);
        } catch (error) {
          console.error("Error fetching secret scanning alerts:", error);
          setSecretScanningAlerts([]);
        }

        try {
          const vulData = await githubService.getRepoVulnerabilityAlerts(
            selectedOrg.login,
            repoIdWithoutOrg
          );
          setVulnerabilityAlerts(vulData || []);
          console.log("vul alerts", vulData);
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
        {/* Basic Repository Info */}
        <ReportSection title="Basic Information">
          <div className="report-content">
            <strong>Repository Name:</strong>
            {data.name}
          </div>
          <div className="report-content">
            <strong>Visibility:</strong>
            {data.visibility}
          </div>
          <div className="report-content">
            <strong>Default Branch:</strong>
            {data.default_branch}
          </div>
          <div className="report-content">
            <strong>Open Issues Count:</strong>
            {data.open_issues_count}
          </div>
          <div className="report-content">
            <strong>Forks Count:</strong>
            {data.forks_count}
          </div>
        </ReportSection>

        {/* Repository Settings */}
        <ReportSection
          title="Repository Settings"
          infoText="These settings affect the repository's security posture."
        >
          <div
            className={`report-content ${data.has_issues_enabled ? "insecure" : ""
              }`}
          >
            <strong>Has Issues Enabled:</strong>
            {data.has_issues_enabled ? "Yes" : "No"}
            <InfoButton infoText="Issues can expose sensitive information if not properly managed." />
          </div>

          <div
            className={`report-content ${data.has_projects_enabled ? "insecure" : ""
              }`}
          >
            <strong>Has Projects Enabled:</strong>
            {data.has_projects_enabled ? "Yes" : "No"}
            <InfoButton infoText="Projects can expose sensitive information if not properly secured." />
          </div>

          <div
            className={`report-content ${data.allow_forking ? "insecure" : ""}`}
          >
            <strong>Allow Forking:</strong>
            {data.allow_forking ? "Yes" : "No"}
            <InfoButton infoText="Allowing forking can lead to code exposure." />
          </div>

          <div
            className={`report-content ${data.has_wiki_enabled ? "insecure" : ""
              }`}
          >
            <strong>Has Wiki Enabled:</strong>
            {data.has_wiki_enabled ? "Yes" : "No"}
            <InfoButton infoText="Wikis can potentially expose sensitive information." />
          </div>
        </ReportSection>

        {/* Permissions Section */}
        <ReportSection
          title="Permissions"
          infoText="Permissions control access levels. Restrict admin and push access to minimize security risks."
        >
          <div className="report-content">
            <strong>Admin:</strong>
            {data.permissions.admin ? "Yes" : "No"}
          </div>
          <div className="report-content">
            <strong>Push:</strong>
            {data.permissions.push ? "Yes" : "No"}
          </div>
          <div className="report-content">
            <strong>Pull:</strong>
            {data.permissions.pull ? "Yes" : "No"}
          </div>
        </ReportSection>

        {/* Security Scanning Section */}
        <ReportSection
          title="Security Scanning"
          infoText="Review security scanning results to identify and address potential security issues."
        >
          {/* Code Scanning Alerts */}
          <div className="alerts-container">
            <h3>Code Scanning Alerts</h3>
            {codeScanningAlerts.length > 0 ? (
              codeScanningAlerts.map((alert, index) => (
                <AlertCard key={index} type="code" alert={alert} />
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
              <AlertCard type="not configured" alert={{}} />
            ) : secretScanningAlerts && secretScanningAlerts.length > 0 ? (
              secretScanningAlerts.map((alert, index) => (
                <AlertCard key={index} type="secret" alert={alert} />
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
            {vulnerabilityAlerts?.error === "not_configured" ? (
              <AlertCard
                type="Vul report status"
                alert={{ status: "not configured" }}
              />
            ) : vulnerabilityAlerts?.status === "enabled" ? (
              <AlertCard
                type="Vul report status"
                alert={{ status: "enabled" }}
              />
            ) : (
              <div className="success-message">
                Error checking vulnerability alerts status
              </div>
            )}
          </div>
        </ReportSection>
      </div>
    </div>
  );
};

export default RepoReport;

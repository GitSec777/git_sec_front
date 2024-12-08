import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import InfoButton from "./InfoButton";
import "../../css/components/OrgReport.css";
import { githubService } from "../services/githubService";

const OrgReport = () => {
  const { orgId } = useParams();
  const { selectedOrg, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [noMFAMembers, setNoMFAMembers] = useState([]);
  const [adminMembers, setAdminMembers] = useState([]);
  const [dependencyAlerts, setDependencyAlerts] = useState(null);
  const [securityAdvisories, setSecurityAdvisories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repoSettings, setRepoSettings] = useState(null);

  useEffect(() => {
    if (!selectedOrg || !isAuthenticated) {
      navigate("/selection");
      return;
    }

    const fetchOrgData = async () => {
      setIsLoading(true);
      try {
        setData(selectedOrg);

        // Fetch all data in parallel
        const [
          noMFAData,
          adminData,
          dependencyAlerts,
          advisoriesData,
          repoSettingsData,
        ] = await Promise.all([
          githubService.getOrgNoMFAMembers(orgId),
          githubService.getOrgAdminMembers(orgId),
          githubService.getOrgDependebotAlerts(orgId),
          githubService.getOrgSecurityAdvisories(orgId),
          githubService.getOrgRepoSettings(orgId),
        ]);

        if (noMFAData) {
          setNoMFAMembers(noMFAData);
        }
        if (adminData) {
          setAdminMembers(adminData);
        }
        if (dependencyAlerts) {
          setDependencyAlerts(dependencyAlerts);
        }
        if (advisoriesData) {
          setSecurityAdvisories(advisoriesData);
        }
        if (repoSettingsData) {
          setRepoSettings(repoSettingsData);
        }
        console.log("noMFAMembers:", noMFAMembers);
        console.log("adminMembers:", adminMembers);
        console.log("dependencyAlerts:", dependencyAlerts);
        console.log("securityAdvisories:", securityAdvisories);
        console.log("repoSettings:", repoSettings);
      } catch (error) {
        console.error("Error fetching org data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrgData();
  }, [orgId, selectedOrg, navigate, isAuthenticated]);

  if (isLoading)
    return <div className="loading">Loading organization data...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return <div className="error">No organization data available</div>;

  return (
    <div className="org-report">
      <h1 className="glitch" data-text="Organization Report">
        Organization Report
      </h1>
      <div className="report-container">
        {/* Basic Organization Info */}
        <section className="report-section">
          <h2>Basic Information</h2>
          <div className="org-report-details">
            <div className="report-content">
              <strong>Organization Name:</strong>
              {orgId}
            </div>

            <div className="report-content">
              <strong>Organization ID:</strong>
              {data.id}
            </div>
          </div>
        </section>

        {/* Members Section */}
        <section className="report-section">
          <h2>Members</h2>
          <div className="org-report-details">
            <div className="report-content">
              {noMFAMembers && noMFAMembers.length > 0 ? (
                <>
                  <strong>Members Without 2FA:</strong>
                  <ul className="member-list">
                    {noMFAMembers.map((member) => (
                      <li key={member.id}>{member.login}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <strong>Members Without 2FA:</strong>
                  <div className="success-message">
                    All members have 2FA enabled
                  </div>
                </>
              )}
              <InfoButton infoText="Members who haven't enabled two-factor authentication pose a security risk." />
            </div>
            <div className="report-content">
              {adminMembers && adminMembers.length > 0 ? (
                <>
                  <strong>Admin Members:</strong>
                  <ul className="member-list">
                    {adminMembers.map((member) => (
                      <li key={member.id}>{member.login}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <div>No admin members found</div>
              )}
              <InfoButton infoText="Organization administrators have full access to all repositories and settings." />
            </div>
          </div>
        </section>

        {/* Security Advisories */}
        {securityAdvisories && (
          <section className="report-section">
            <h2>Security Advisories</h2>
            <div className="org-report-details">
              {securityAdvisories.length > 0 ? (
                securityAdvisories.map((advisory, index) => (
                  <div key={index} className="report-content">
                    <strong>{advisory.summary}</strong>
                    <div className="advisory-details">
                      <p>Severity: {advisory.severity}</p>
                      <p>
                        Published:{" "}
                        {new Date(advisory.published_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="success-message">
                  No security advisories found
                </div>
              )}
            </div>
            <InfoButton infoText="Security advisories indicate known vulnerabilities." />
          </section>
        )}

        {/* Dependency Alerts */}
        {dependencyAlerts && dependencyAlerts.length > 0 ? (
          <section className="report-section">
            <h2>Dependency Alerts</h2>
            <div className="org-report-details">
              <div
                className={`alerts-container ${
                  dependencyAlerts.length > 3 ? "scrollable" : "non-scrollable"
                }`}
              >
                {dependencyAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`report-content alert-${alert.severity.toLowerCase()}`}
                  >
                    <strong>Package:</strong>
                    <div className="alert-details">
                      <div className="alert-header">
                        <span className="package-name">
                          {alert.package_name}
                        </span>
                        <span
                          className={`severity-badge ${alert.severity.toLowerCase()}`}
                        >
                          {alert.severity}
                        </span>
                      </div>

                      <div className="alert-info">
                        <div>
                          <span className="label">Ecosystem:</span>{" "}
                          {alert.ecosystem}
                        </div>
                        <div>
                          <span className="label">Vulnerable Version:</span>{" "}
                          {alert.vulnerable_version}
                        </div>
                        <div>
                          <span className="label">Patched Version:</span>{" "}
                          {alert.patched_version}
                        </div>
                        <div>
                          <span className="label">Repository:</span>{" "}
                          {alert.repository}
                        </div>
                        <div>
                          <span className="label">Created:</span>{" "}
                          {new Date(alert.created_at).toLocaleDateString()}
                        </div>
                        <div className="alert-summary">
                          <span className="label">Summary:</span>
                          <p>{alert.summary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {dependencyAlerts.length > 3 && (
                <div className="alerts-count">
                  Showing {dependencyAlerts.length} alerts
                </div>
              )}
            </div>
            <InfoButton infoText="Review and address dependency vulnerabilities to maintain security." />
          </section>
        ) : (
          <section className="report-section">
            <h2>Dependency Alerts</h2>
            <div className="org-report-details">
              <div className="success-message">No dependency alerts found</div>
            </div>
          </section>
        )}

        {/* Repository Settings Section */}
        <section className="report-section">
          <h2>Repository Settings</h2>
          <div className="org-report-details">
            {repoSettings && (
              <>
                <div
                  className={`report-content ${
                    !repoSettings.members_can_create_repos
                      ? "secure"
                      : "insecure"
                  }`}
                >
                  <strong>Members Can Create Repositories:</strong>{" "}
                  {repoSettings.members_can_create_repos ? "Yes" : "No"}
                  <InfoButton infoText="Restricting repository creation can help maintain organization security." />
                </div>

                <div
                  className={`report-content ${
                    !repoSettings.members_can_create_public_repos
                      ? "secure"
                      : "insecure"
                  }`}
                >
                  <strong>Members Can Create Public Repositories:</strong>{" "}
                  {repoSettings.members_can_create_public_repos ? "Yes" : "No"}
                  <InfoButton infoText="Public repositories can expose sensitive information if not properly managed." />
                </div>

                <div
                  className={`report-content ${
                    !repoSettings.members_can_create_private_repos
                      ? "secure"
                      : "insecure"
                  }`}
                >
                  <strong>Members Can Create Private Repositories:</strong>{" "}
                  {repoSettings.members_can_create_private_repos ? "Yes" : "No"}
                  <InfoButton infoText="Private repository creation should be restricted to maintain control over sensitive code." />
                </div>

                <div
                  className={`report-content ${
                    !repoSettings.members_can_fork_private_repos
                      ? "secure"
                      : "insecure"
                  }`}
                >
                  <strong>Members Can Fork Private Repositories:</strong>{" "}
                  {repoSettings.members_can_fork_private_repos ? "Yes" : "No"}
                  <InfoButton infoText="Allowing private repository forking can increase the risk of code exposure." />
                </div>

                <div className="report-content">
                  <strong>Default Repository Permission:</strong>{" "}
                  {repoSettings.default_repo_permission}
                  <InfoButton infoText="The default permission level granted to organization members for new repositories." />
                </div>

                <div className="report-content">
                  <strong>Repository Creation Type:</strong>{" "}
                  {repoSettings.members_allowed_repository_creation_type}
                  <InfoButton infoText="The types of repositories that members are allowed to create." />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrgReport;

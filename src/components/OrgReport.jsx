import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import InfoButton from "./InfoButton";
import ReportSection from "./ReportSection";
import "../../css/components/OrgReport.css";
import { githubService } from "../services/githubService";
import AlertCard from "./AlertCard";

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
        <ReportSection title="Basic Information">
          <div className="basic-content">
            <strong>Organization Name:</strong>
            {orgId}
          </div>
          <div className="basic-content">
            <strong>Organization ID:</strong>
            {data.id}
          </div>
        </ReportSection>

        {/* Members Section */}
        <ReportSection title="Members">
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
        </ReportSection>

        {/* Security Advisories */}
        {securityAdvisories && (
          <ReportSection title="Security Advisories">
            {securityAdvisories.length > 0 ? (
              securityAdvisories.map((advisory, index) => (
                <AlertCard key={index} type="vulnerability" alert={advisory} />
              ))
            ) : (
              <div className="success-message">
                No security advisories found
              </div>
            )}
          </ReportSection>
        )}

        {/* Dependency Alerts */}
        {dependencyAlerts && dependencyAlerts.length > 0 ? (
          <ReportSection
            title="Dependency Alerts"
            infoText="Review and address dependency vulnerabilities to maintain security."
          >
            <div
              className={`alerts-container ${
                dependencyAlerts.length > 3 ? "scrollable" : "non-scrollable"
              }`}
            >
              {dependencyAlerts.map((alert, index) => (
                <AlertCard key={index} type="dependabot" alert={alert} />
              ))}
            </div>
            {dependencyAlerts.length > 3 && (
              <div className="alerts-count">
                Showing {dependencyAlerts.length} alerts
              </div>
            )}
          </ReportSection>
        ) : (
          <ReportSection title="Dependency Alerts">
            <div className="success-message">No dependency alerts found</div>
          </ReportSection>
        )}

        {/* Repository Settings Section */}
        <ReportSection title="Repository Settings">
          {repoSettings && (
            <>
              <div
                className={`report-content ${
                  !repoSettings.members_can_create_repos ? "secure" : "insecure"
                }`}
              >
                <strong>Members Can Create Repositories: </strong>
                <span className="report-value">
                  {repoSettings.members_can_create_repos ? "Yes" : "No"}
                </span>

                <InfoButton infoText="Restricting repository creation can help maintain organization security." />
              </div>

              <div
                className={`report-content ${
                  !repoSettings.members_can_create_public_repos
                    ? "secure"
                    : "insecure"
                }`}
              >
                <strong>Members Can Create Public Repositories:</strong>
                <span className="report-value">
                  {repoSettings.members_can_create_public_repos ? "Yes" : "No"}
                </span>
                <InfoButton infoText="Public repositories can expose sensitive information if not properly managed." />
              </div>

              <div
                className={`report-content ${
                  !repoSettings.members_can_create_private_repos
                    ? "secure"
                    : "insecure"
                }`}
              >
                <strong>Members Can Create Private Repositories:</strong>
                <span className="report-value">
                  {repoSettings.members_can_create_private_repos ? "Yes" : "No"}
                </span>
                <InfoButton infoText="Private repository creation should be restricted to maintain control over sensitive code." />
              </div>

              <div
                className={`report-content ${
                  !repoSettings.members_can_fork_private_repos
                    ? "secure"
                    : "insecure"
                }`}
              >
                <strong>Members Can Fork Private Repositories:</strong>
                <span className="report-value">
                  {repoSettings.members_can_fork_private_repos ? "Yes" : "No"}
                </span>
                <InfoButton infoText="Allowing private repository forking can increase the risk of code exposure." />
              </div>

              <div className="report-content">
                <strong>Default Repository Permission:</strong>
                <span className="report-value">
                  {repoSettings.default_repo_permission ? "Admin" : "Member"}
                </span>
                <InfoButton infoText="The default permission level granted to organization members for new repositories." />
              </div>

              <div className="report-content">
                <strong>Repository Creation Type:</strong>
                <span className="report-value">
                  {repoSettings.members_allowed_repository_creation_type}
                </span>
                <InfoButton infoText="The types of repositories that members are allowed to create." />
              </div>
            </>
          )}
        </ReportSection>
      </div>
    </div>
  );
};

export default OrgReport;

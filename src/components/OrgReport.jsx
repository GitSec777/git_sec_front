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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedOrg || !isAuthenticated) {
      navigate("/selection");
      return;
    }

    // Updated API calls
    const fetchOrgData = async () => {
      setIsLoading(true);
      try {
        // Keep existing data fetch
        setData(selectedOrg);

        // Corrected API calls by removing the extra token parameter
        const [noMFAData] = await Promise.all([
          console.log("fetching no mfa data", orgId),
          githubService.getOrgNoMFAMembers(orgId),
          // githubService.getOrgAdminMembers(orgId),
        ]);
        if (noMFAData) {
          setNoMFAMembers(noMFAData);
          console.log("no mfa data is:", noMFAData);
        }
        // setAdminMembers(adminData);
      } catch (error) {
        console.error("Error fetching org data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrgData();
  }, [orgId, selectedOrg, navigate, isAuthenticated]);

  if (!data) return <div className="loading">Loading organization data...</div>;

  return (
    <div className="org-report">
      <h1 className="glitch" data-text="Organization Report">
        Organization Report
      </h1>
      <div className="report-container">
        <div className="org-report-details">
          <div className="report-section">
            <div className="report-content">
              <strong>Organization Login:</strong> {orgId}
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>URL:</strong> <a href={data.url}>{data.url}</a>
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>HTML URL:</strong>{" "}
              <a href={data.html_url}>{data.html_url}</a>
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Created At:</strong>{" "}
              {new Date(data.created_at).toLocaleString()}
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Updated At:</strong>{" "}
              {new Date(data.updated_at).toLocaleString()}
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Public Repositories:</strong> {data.public_repos}
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Owned Private Repositories:</strong>{" "}
              {data.owned_private_repos}
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Total Private Repositories:</strong>{" "}
              {data.total_private_repos}
            </div>
          </div>
          <div
            className={`report-section ${
              !data.two_factor_requirement_enabled ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Two-Factor Requirement Enabled:</strong>{" "}
              {data.two_factor_requirement_enabled ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Two-factor authentication adds an extra layer of security to your account." />
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Members Allowed Repository Creation Type:</strong>{" "}
              {data.members_allowed_repository_creation_type}
            </div>
            <InfoButton infoText="Controls the type of repositories members can create. Restricting this can prevent unauthorized repository creation." />
          </div>
          <div
            className={`report-section ${
              data.members_can_fork_private_repositories ? "insecure" : ""
            }`}
          >
            <div className="report-content">
              <strong>Members Can Fork Private Repositories:</strong>{" "}
              {data.members_can_fork_private_repositories ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Allows members to fork private repositories, which can expose sensitive information. Consider disabling for private repos." />
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
            className={`report-section ${!data.is_verified ? "insecure" : ""}`}
          >
            <div className="report-content">
              <strong>Is Verified:</strong> {data.is_verified ? "Yes" : "No"}
            </div>
            <InfoButton infoText="Verification indicates that the organization is legitimate and trusted." />
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Plan Name:</strong> {data.plan_name}
            </div>
            <InfoButton infoText="The plan name indicates the subscription level of the organization." />
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Filled Seats:</strong> {data.filled_seats}
            </div>
            <InfoButton infoText="The number of filled seats indicates how many members are using the organization's plan." />
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Plan Private Repositories:</strong>{" "}
              {data.plan_private_repos}
            </div>
            <InfoButton infoText="The number of private repositories allowed by the organization's plan." />
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Members URL:</strong>{" "}
              <a href={data.members_url}>{data.members_url}</a>
            </div>
          </div>
          <div className="report-section">
            <div className="report-content">
              <strong>Repositories URL:</strong>{" "}
              <a href={data.repos_url}>{data.repos_url}</a>
            </div>
          </div>
          <div className="org-report-details">
            {/* ... existing report sections ... */}

            {/* Add new sections */}
            <div className="report-section">
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
                  <div>No members without 2FA</div>
                )}
              </div>
              <InfoButton infoText="Members who haven't enabled two-factor authentication pose a security risk." />
            </div>

            {/* <div className="report-section">
              <div className="report-content">
                <strong>Admin Members:</strong>
                <ul className="member-list">
                  {adminMembers.map((member) => (
                    <li key={member.id}>{member.login}</li>
                  ))}
                </ul>
              </div>
              <InfoButton infoText="Organization administrators have full access to all repositories and settings." />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgReport;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../../css/pages/SelectionPage.css";

const SelectionPage = () => {
  const {
    userData,
    isAuthenticated,
    setSelectedOrg,
    setSelectedRepo,
    setLastViewedReport,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOrgSelect = (org) => {
    setSelectedOrg(org);
    // Save last viewed report info
    const reportInfo = {
      type: "org",
      id: org.login,
      org: org,
    };
    localStorage.setItem("lastViewedReport", JSON.stringify(reportInfo));
    setLastViewedReport(reportInfo);
    navigate(`/report/org/${org.login}`);
  };

  const handleRepoSelect = (repo) => {
    // Save both repo and org info
    setSelectedRepo(repo);
    const orgLogin = repo.owner.login;
    setSelectedOrg(repo.owner);

    // Use the orgLogin directly instead of selectedOrg state
    const reportInfo = {
      type: "repo",
      id: repo.name,
      repo: repo,
      org: repo.owner, // Use repo.owner instead of selectedOrg
    };

    localStorage.setItem("lastViewedReport", JSON.stringify(reportInfo));
    setLastViewedReport(reportInfo);

    // Use orgLogin in the navigation path
    navigate(`/report/repo/${orgLogin}-${repo.name}`);
  };

  if (!userData) return <div className="loading">Loading user data...</div>;
  if (!isAuthenticated) navigate("/login");
  return (
    <div className="selection-page">
      <h1 className="glitch" data-text="Select Target">
        Select Target
      </h1>
      <div className="selection-container">
        <section className="selection-section">
          <h2 className="section-title">Organizations</h2>
          {userData.orgs && userData.orgs.length > 0 ? (
            <ul className="selection-list">
              {userData.orgs.map((org) => (
                <li
                  key={org.id}
                  onClick={() => handleOrgSelect(org)}
                  className="selection-item"
                >
                  <span className="item-icon">&#128421;</span> {org.login}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No organizations found.</p>
          )}
        </section>

        <section className="selection-section">
          <h2 className="section-title">Repositories</h2>
          {userData.repos && userData.repos.length > 0 ? (
            <ul className="selection-list">
              {userData.repos.map((repo) => (
                <li
                  key={repo.id}
                  onClick={() => handleRepoSelect(repo)}
                  className="selection-item"
                >
                  <span className="item-icon">&#128194;</span> {repo.name}
                  <span className="item-owner">Owner: {repo.owner.login}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No repositories found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default SelectionPage;

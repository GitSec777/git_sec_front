import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../../css/pages/SelectionPage.css";

const SelectionPage = () => {
  const { userData, isAuthenticated, setSelectedOrg, setSelectedRepo } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleOrgClick = (org) => {
    setSelectedOrg(org);
    navigate(`/report/org/${org.login}`);
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    console.log("repo is:", repo);
    const encodedRepoName = encodeURIComponent(repo.full_name).replace(
      /%2F/g,
      "-"
    );
    navigate(`/report/repo/${encodedRepoName}`);
  };
  console.log("userData is:", userData.orgs);

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
                  onClick={() => handleOrgClick(org)}
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
                  onClick={() => handleRepoClick(repo)}
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/pages/SelectionPage.css";

const SelectionPage = () => {
  const [repos, setRepos] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/get_github_token",
          { withCredentials: true }
        );
        const accessToken = response.data.github_token;

        if (accessToken) {
          const repoResponse = await axios.get(
            "https://api.github.com/user/repos",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          const orgResponse = await axios.get(
            "https://api.github.com/user/orgs",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          setRepos(repoResponse.data);
          setOrgs(orgResponse.data);

          localStorage.setItem("reposData", JSON.stringify(repoResponse.data));
          localStorage.setItem("orgsData", JSON.stringify(orgResponse.data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrgClick = (org) => {
    navigate(`/report/org/${org.login}`);
  };

  const handleRepoClick = (repo) => {
    navigate(`/report/repo/${repo.full_name.replace(/\//g, "-")}`);
  };

  if (loading) return <div className="loading">Initializing...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="selection-page">
      <h1 className="glitch" data-text="Select Target">
        Select Target
      </h1>
      <div className="selection-container">
        <section className="selection-section">
          <h2 className="section-title">Organizations</h2>
          {orgs.length > 0 ? (
            <ul className="selection-list">
              {orgs.map((org) => (
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
          {repos.length > 0 ? (
            <ul className="selection-list">
              {repos.map((repo) => (
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

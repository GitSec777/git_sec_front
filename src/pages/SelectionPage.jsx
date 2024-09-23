import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

          // Cache the fetched data in localStorage
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
    console.log(`Navigate to /report/org/${org.login}`);

    navigate(`/report/org/${org.login}`);
  };

  const handleRepoClick = (repo) => {
    navigate(`/report/repo/${repo.full_name.replace(/\//g, "-")}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="selection-page">
      <h1>Select Organization or Repository</h1>
      <section>
        <h2>Organizations</h2>
        {orgs.length > 0 ? (
          <ul>
            {orgs.map((org) => (
              <li key={org.id} onClick={() => handleOrgClick(org)}>
                {org.login}
              </li>
            ))}
          </ul>
        ) : (
          <p>No organizations found.</p>
        )}
      </section>

      <section>
        <h2>Repositories</h2>
        {repos.length > 0 ? (
          <ul>
            {repos.map((repo) => (
              <li key={repo.id} onClick={() => handleRepoClick(repo)}>
                {repo.name} - <strong>Owner:</strong> {repo.owner.login}{" "}
                {/* Show owner info */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No repositories found.</p>
        )}
      </section>
    </div>
  );
};

export default SelectionPage;

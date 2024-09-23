import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrgReport from "../components/OrgReport";
import RepoReport from "../components/RepoReport";

const Report = () => {
  const navigate = useNavigate();
  const { orgName, repoName: paramRepoName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the last selected org or repo name from localStorage
    const cachedOrgName = localStorage.getItem("lastOrgName");
    const cachedRepoName = localStorage.getItem("lastRepoName");

    // If neither orgName nor repoName is present in the URL, use cached values
    if (!orgName && !paramRepoName) {
      if (cachedOrgName) {
        navigate(`/report/org/${cachedOrgName}`);
      } else if (cachedRepoName) {
        navigate(`/report/repo/${cachedRepoName.replace(/\//g, "-")}`);
      }
      return;
    }

    // If orgName or repoName exists in the URL, fetch the cached repos and orgs
    const cachedRepos = localStorage.getItem("reposData");
    const cachedOrgs = localStorage.getItem("orgsData");

    if (cachedRepos && cachedOrgs) {
      const reposData = JSON.parse(cachedRepos);
      const orgsData = JSON.parse(cachedOrgs);

      if (orgName) {
        const orgData = orgsData.find((org) => org.login === orgName);
        setData(orgData);
        localStorage.setItem("lastOrgName", orgName); // Cache org name
      } else if (paramRepoName) {
        const repoName = paramRepoName.replace(/-/g, "/");
        const repoData = reposData.find((repo) => repo.full_name === repoName);
        setData(repoData);
        localStorage.setItem("lastRepoName", repoName); // Cache repo name
      }

      setLoading(false);
    } else {
      setError("No cached data found. Please go back and select again.");
      setLoading(false);
    }
  }, [orgName, paramRepoName, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <div className="report-page">
      {orgName && <OrgReport data={data} />}
      {paramRepoName && <RepoReport data={data} />}
    </div>
  );
};

export default Report;

import React from "react";

// Replace these with your actual GitHub OAuth credentials
const CLIENT_ID = "Ov23limgzh26fACnXFFS";
const REDIRECT_URI = "http://127.0.0.1:5000/auth/github/callback"; // or your production URL

const handleLogout = () => {
  localStorage.removeItem("lastOrgName");
  localStorage.removeItem("lastRepoName");
  // Perform logout actions
};

const Login = () => {
  const handleGitHubLogin = () => {
    handleLogout();
    // GitHub OAuth authorization URL
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org,user,repo&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`;

    // Redirect to GitHub OAuth URL
    window.location.href = authUrl;
  };

  return (
    <div className="login-page">
      <h2 className="login-header">Login</h2>
      <div className="login-container">
        <button onClick={handleGitHubLogin} className="github-login-button">
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;

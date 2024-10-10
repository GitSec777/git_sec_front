import React from "react";
import axios from "axios";

// Replace these with your actual GitHub OAuth credentials
const CLIENT_ID = "Ov23limgzh26fACnXFFS";
const REDIRECT_URI = "http://127.0.0.1:5000/auth/github/callback"; // or your production URL

const Login = ({ onLoginSuccess }) => {
  const handleGitHubLogin = () => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:org,user,repo&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`;
    window.location.href = authUrl;
  };

  React.useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/get_user_data",
          {
            withCredentials: true,
          }
        );
        const { name } = response.data;
        localStorage.setItem("userName", name);
        localStorage.setItem("isLoggedIn", "true");
        onLoginSuccess(name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (localStorage.getItem("isLoggedIn")) {
      fetchUserName();
    }
  }, [onLoginSuccess]);

  return (
    <a className="navbar-btn" onClick={handleGitHubLogin}>
      Login with GitHub
    </a>
  );
};

export default Login;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const GitHubCallback = () => {
  const location = useLocation();
  console.log("in github call back component", location);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      // Send the code to your backend to exchange for an access token
      axios
        .post("http://127.0.0.1:5000/auth/github/callback", { code })
        .then((response) => {
          console.log("Access Token:", response.data);
          // Handle the response from your backend
        })
        .catch((error) => {
          console.error("Error exchanging code:", error);
        });
    }
  }, [location]);

  return <div>Processing GitHub Callback...</div>;
};

export default GitHubCallback;

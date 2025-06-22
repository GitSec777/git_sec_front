import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const GitHubCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      navigate(`/error?code=${error}&message=Github authorization failed. Please try again.`);
      return;
    }

    if (code) {
      // Send the code to your backend to exchange for an access token
      axios
        .post("http://localhost:5050/auth/github/callback", { code })
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

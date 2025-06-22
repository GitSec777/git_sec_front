// src/pages/ErrorPage.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const ErrorPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const errorCode = queryParams.get("code") || "unknown";
    const errorMessage = queryParams.get("message") || "An unknown error occurred";

    // Define common error messages for better user experience
    const errorMessages = {
        "authorization_failed": "GitHub authorization failed. Please try again.",
        "token_retrieval_failed": "Failed to retrieve GitHub access token. Please try again.",
        "redirect_uri_mismatch": "There was a configuration issue with the GitHub authentication.",
        "unknown": "An unexpected error occurred during authentication."
    };

    const displayMessage = errorMessages[errorCode] || errorMessage;

    return (
        <div className="error-container">
            <h2>Authentication Error</h2>
            <div className="error-message">
                <p>{displayMessage}</p>
            </div>
            <div className="error-actions">
                <Link to="/login" className="navbar-btn">
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
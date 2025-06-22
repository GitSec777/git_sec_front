// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(() => {
    const saved = localStorage.getItem("selectedOrg");
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedRepo, setSelectedRepo] = useState(() => {
    const saved = localStorage.getItem("selectedRepo");
    return saved ? JSON.parse(saved) : null;
  });
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [lastViewedReport, setLastViewedReport] = useState(() => {
    const saved = localStorage.getItem("lastViewedReport");
    return saved ? JSON.parse(saved) : null;
  });

  // Move checkAuthStatus outside useEffect so it can be exported
  useEffect(() => {
    if (userData) {
      console.log("userData state updated:", userData);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedOrg) {
      localStorage.setItem("selectedOrg", JSON.stringify(selectedOrg));
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedRepo) {
      localStorage.setItem("selectedRepo", JSON.stringify(selectedRepo));
    }
  }, [selectedRepo]);
  const checkAuthStatus = async () => {
    try {
      setLoadingAuth(true);
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";

      // First, check authentication status
      const authResponse = await axios.get(`${API_URL}/auth/check-status`, {
        withCredentials: true,
      });

      if (authResponse.data.error) {
        setIsAuthenticated(false);
        setUserData(null);
        return { success: false, error: authResponse.data.error };
      } else {
        setIsAuthenticated(true);

        try {
          console.log("Fetching GitHub data");
          // Get GitHub data using the new endpoint
          const githubDataResponse = await axios.get(
            `${API_URL}/api/github/user/data`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          // Store user data without the token
          const newUserData = {
            name: authResponse.data.name,
            ...githubDataResponse.data,
          };
          console.log("Setting user data:", newUserData); // Log the actual data being set
          setUserData(newUserData);
        } catch (dataError) {
          console.error("Error fetching GitHub data:", dataError);
          // Don't fail auth if only GitHub data fails
          setUserData({
            name: authResponse.data.name,
          });
        }

        return { success: true, user: authResponse.data.name };
      }
    } catch (error) {
      console.error("Auth check error:", error);

      // Add specific error handling based on response
      let errorMessage = "Authentication failed";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          errorMessage = "Not authenticated";
        } else if (error.response.status === 500) {
          errorMessage = "Server error";
        }
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server";
        console.log("Request error:", error.request);
      } else {
        // Something happened in setting up the request
        errorMessage = error.message;
        console.log("Error message:", error.message);
      }

      setIsAuthenticated(false);
      setUserData(null);

      return { success: false, error: errorMessage };
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    // Call checkAuthStatus once on component mount
    console.log("Initial auth check");
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";
      await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      setUserData(null);
      setSelectedOrg(null);
      setSelectedRepo(null);
      localStorage.removeItem("selectedOrg");
      localStorage.removeItem("selectedRepo");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        selectedOrg,
        setSelectedOrg,
        selectedRepo,
        setSelectedRepo,
        logout,
        loadingAuth,
        lastViewedReport,
        setLastViewedReport,
        // Export checkAuthStatus
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
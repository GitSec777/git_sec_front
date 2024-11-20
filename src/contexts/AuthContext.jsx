// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First, check authentication status
        const authResponse = await axios.get(
          "http://127.0.0.1:5000/auth/check-status",
          {
            withCredentials: true,
          }
        );

        if (authResponse.data.error) {
          setIsAuthenticated(false);
          setUserData(null);
        } else {
          setIsAuthenticated(true);
          // Get GitHub data
          const githubDataResponse = await axios.get(
            "http://127.0.0.1:5000/github_data/get_user_data",
            {
              withCredentials: true,
            }
          );

          // Store user data without the token
          setUserData({
            name: authResponse.data.name,
            ...githubDataResponse.data,
          });
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        setUserData(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/auth/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error("Logout error:", error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

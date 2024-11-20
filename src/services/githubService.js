import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export const githubService = {
  async getOrgNoMFAMembers(org) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/org/${org}/no-mfa-members`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching No MFA members:", error);
      throw error;
    }
  },

  async getOrgAdminMembers(org) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/org/${org}/admin-members`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching admin members:", error);
      throw error;
    }
  },

  async getDependabotAlerts(org, repo) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/repos/${org}/${repo}/dependabot-alerts`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Dependabot alerts:", error);
      throw error;
    }
  },

  async getRepoReport(org, repo) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/repos/${org}/${repo}/report`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching repo report:", error);
      throw error;
    }
  },
};

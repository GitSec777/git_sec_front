import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

// Org Routes
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

  async getOrgDependebotAlerts(org) {
    try {
      const response = await axios.get(
        // /orgs/{org}/dependabot/alerts
        `${API_BASE_URL}/api/org/${org}/dependebot-alerts`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("dependency insights🌟", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching dependency insights:", error);
      throw error;
    }
  },

  async getOrgSecurityAdvisories(org) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/org/${org}/security-advisories`,
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
      console.error("Error fetching security advisories:", error);
      throw error;
    }
  },

  async getOrgRepoSettings(org) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/org/${org}/repo-settings`,
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
      console.error("Error fetching organization repo settings:", error);
      throw error;
    }
  },

  // Repo Routes
  async getRepoCodeScanningAlerts(org, repo) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/repos/${org}/${repo}/code-scanning/alerts`,
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
      console.error("Error fetching code scanning alerts:", error);
      throw error;
    }
  },

  async getRepoSecretScanningAlerts(org, repo) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/repos/${org}/${repo}/secret-scanning/alerts`,
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
      console.error("Error fetching secret scanning alerts:", error);
      throw error;
    }
  },

  async getRepoVulnerabilityAlerts(org, repo) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/repos/${org}/${repo}/vulnerability-alerts`,
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
      console.error("Error fetching vulnerability alerts:", error);
      throw error;
    }
  },
};

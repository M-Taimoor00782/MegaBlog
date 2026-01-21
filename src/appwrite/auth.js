/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Appwrite endpoint
      .setProject(conf.appwriteProjectId); // Project ID

    this.account = new Account(this.client);
  }

  // -------------------- SIGNUP --------------------
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Login user immediately after signup
        return this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  // -------------------- LOGIN --------------------
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // -------------------- OAUTH LOGIN --------------------
async loginWithProvider(provider) {
  try {
    const successUrl =
      conf.appwriteSuccessUrl || `${window.location.origin}/success`;
    const failureUrl =
      conf.appwriteFailureUrl || `${window.location.origin}/failure`;

    // Check for valid providers
    const allowedProviders = ["github", "google", "linkedin"];
    if (!allowedProviders.includes(provider.toLowerCase())) {
      throw new Error(
        `Invalid provider. Allowed providers are: ${allowedProviders.join(
          ", "
        )}`
      );
    }

    return this.account.createOAuth2Session(provider.toLowerCase(), successUrl, failureUrl);
  } catch (error) {
    throw error;
  }
}

  // -------------------- FORGOT PASSWORD --------------------
  async forgotPassword(email) {
    try {
      return await this.account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      throw error;
    }
  }

  // -------------------- RESET PASSWORD --------------------
  async resetPassword({ userId, secret, password, confirmPassword }) {
    try {
      return await this.account.updateRecovery(
        userId,
        secret,
        password,
        confirmPassword
      );
    } catch (error) {
      throw error;
    }
  }

  // -------------------- CURRENT USER --------------------
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401) {
        return null;
      }
      throw error;
    }
  }

  // -------------------- LOGOUT --------------------
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;

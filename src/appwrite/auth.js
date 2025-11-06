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

  // Email/Password Account Creation
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // login user immediately after signup
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  //Email/Password Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // ✅ OAuth Login with Dynamic Success/Failure URLs
  async loginWithProvider(provider) {
    try {
      const successUrl =
        conf.appwriteSuccessUrl || `${window.location.origin}/success`;
      const failureUrl =
        conf.appwriteFailureUrl || `${window.location.origin}/failure`;

      return this.account.createOAuth2Session(provider, successUrl, failureUrl);
    } catch (error) {
      throw error;
    }
  }

  //Get current logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401) {
        // Not logged in, return null
        return null;
      }
      throw error;
    }
  }

  //Logout (all sessions)
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

// Export
const authService = new AuthService();
export default authService;

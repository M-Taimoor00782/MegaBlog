import conf from "../conf/conf";
import { Client, Databases, Storage, ID, Query, Permission, Role } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ---------------------- POSTS ----------------------

  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error("Create post failed:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.error("Update post failed:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Delete post failed:", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Get post failed:", error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Get posts failed:", error);
      throw error;
    }
  }

  // ---------------------- FILES ----------------------

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())]
      );
    } catch (error) {
      console.error("File upload failed:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Delete file failed:", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    if (!fileId) return "";
    const result = this.bucket.getFileView(conf.appwriteBucketId, fileId);
    return result?.href || result.toString?.() || "";
  }

  // ---------------------- LIKES ----------------------

  async addLike({ postId, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteLikesId,
        ID.unique(),
        { postId, userId }
      );
    } catch (error) {
      console.error("Add like failed:", error);
      throw error;
    }
  }

  async removeLike({ postId, userId }) {
    try {
      const existing = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteLikesId,
        [Query.equal("postId", postId), Query.equal("userId", userId)]
      );
      if (existing.total > 0) {
        await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteLikesId,
          existing.documents[0].$id
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Remove like failed:", error);
      throw error;
    }
  }

  async getLikes(postId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteLikesId,
        [Query.equal("postId", postId)]
      );
    } catch (error) {
      console.error("Get likes failed:", error);
      throw error;
    }
  }

  // ---------------------- COMMENTS ----------------------

  async addComment({ postId, userId, username, content }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsId,
        ID.unique(),
        { postId, userId, username, content }
      );
    } catch (error) {
      console.error("Add comment failed:", error);
      throw error;
    }
  }

  async getComments(postId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsId,
        [Query.equal("postId", postId), Query.orderAsc("$createdAt")]
      );
    } catch (error) {
      console.error("Get comments failed:", error);
      throw error;
    }
  }

  async deleteComment(commentId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsId,
        commentId
      );
      return true;
    } catch (error) {
      console.error("Delete comment failed:", error);
      throw error;
    }
  }

  // ------------ PROFILE FUNCTIONS ------------------

  async getProfile(userId) {
    try {
      const res = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteProfilesId,
        [Query.equal("userId", userId)]
      );
      return res.documents[0] || null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }

  async createProfile({ userId, username, email, phone = "", bio = "", avatar = "" }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteProfilesId,
        ID.unique(),
        { userId, username, email, phone, bio, avatar }
      );
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  }

  async updateProfile(userId, data) {
    try {
      const existing = await this.getProfile(userId);
      if (existing) {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteProfilesId,
          existing.$id,
          data
        );
      } else {
        return await this.createProfile({ userId, ...data });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

}

const service = new Service();
export default service;

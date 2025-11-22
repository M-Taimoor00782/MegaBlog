const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteLikesId: String(import.meta.env.VITE_APPWRITE_LIKES_ID),
    appwriteCommentsId: String(import.meta.env.VITE_APPWRITE_COMMENTS_ID),
    appwriteProfilesId: String(import.meta.env.VITE_APPWRITE_PROFILES_ID),


    appwriteSuccessUrl: import.meta.env.VITE_APPWRITE_SUCCESS_URL,
    appwriteFailureUrl: import.meta.env.VITE_APPWRITE_FAILURE_URL,
}

export default conf
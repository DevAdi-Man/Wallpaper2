import { Client, Account, Databases, Storage, TablesDB, Avatars } from 'react-native-appwrite';

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
    throw new Error("Missing Appwrite credentials! Check your .env file.");
}
export const appwriteConfig = {
    project_name: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
    endpoint: endpoint,
    projectId: projectId,
    db:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_NAME,
    databasesID:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    wallpaperCollectionID:process.env.EXPO_PUBLIC_APPWRITE_WALLPAPER_COLLECTION_ID,
    categoriesCollectionID:process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID,
    subCategoriesCollectionID:process.env.EXPO_PUBLIC_APPWRITE_SUBCATEGORIES_COLLECTION_ID,
    favoriteCollectionID:process.env.EXPO_PUBLIC_APPWRITE_FAVORITE_COLLECTION_ID,
    userMediaBucketID:process.env.EXPO_PUBLIC_APPWRITE_USER_MEDIA_BUCKET_ID,
    userCollectionID:process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,

    bannerBucketId:process.env.EXPO_PUBLIC_APPWRITE_BANNER_BUCKET_ID,
    bannerCollectionId:process.env.EXPO_PUBLIC_APPWRITE_BANNER_COLLECTION_ID
}

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform("com.devadiman.pixory");

export const account = new Account(client);
export const databases = new Databases(client);
export const tableDb = new TablesDB(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);

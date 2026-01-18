import { Client, Account, Databases, Storage, TablesDB } from 'react-native-appwrite';
import { Platform } from 'react-native';

// const client = new Client();
// client
//     .setEndpoint('http://192.168.31.39:8080/v1')
//     .setProject('696ba0d0868e43fa3f21');
// switch (Platform.OS) {
//     case 'ios':
//         client.setPlatform("com.devadiman.genshinImpact")
//         break
//     case 'android':
//         client.setPlatform("com.devadiman.genshinImpact")
// }
// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);
// export { client };



// import { Account, Client, Databases } from 'react-native-appwrite';

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

// console.log(endpoint)
// console.log(projectId)
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
    subCategoriesCollectionID:process.env.EXPO_PUBLIC_APPWRITE_SUBCATEGORIES_COLLECTION_ID
}

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
switch(Platform.OS){
    case 'ios':
        client.setPlatform("com.devadiman.genshinImpact")
        break
    case 'android':
        client.setPlatform("com.devadiman.genshinImpact")
}
export const account = new Account(client);
export const databases = new Databases(client);
export const tableDb = new TablesDB(client);
// export const storage = new Storage(client);

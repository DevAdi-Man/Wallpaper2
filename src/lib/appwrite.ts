import { Platform } from 'react-native';
import { Account, Client, Databases, Storage } from 'react-native-appwrite';

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
    throw new Error("Missing Appwrite credentials! Check your .env file.");
}
export const appwriteConfig = {
    project_name: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
    endpoint: endpoint,
    projectId: projectId,
    db:"wallpaper"
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
// export const storage = new Storage(client);

import { ID, ImageGravity, Models } from "react-native-appwrite"
import { appwriteConfig, avatar, storage, tableDb } from "../lib/appwrite"

export interface UserDocument extends Models.Row {
    accountId: string;
    name: string;
    email: string;
    bio?: string;
    avatarId: string | null;
    coverId: string | null;
}

export interface UserProfile extends UserDocument {
    avatarUrl: string;
    coverUrl: string;
}

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop";

export const userServices = {
    getUserProfiele: async (userId: string, userName: string, email: string) => {
        try {
            // check is profile already exist or not
            const row = await tableDb.getRow<UserDocument>({
                databaseId: appwriteConfig.databasesID!,
                tableId: appwriteConfig.userCollectionID!,
                rowId: userId
            })
            return parseProfile(row, userName)
        } catch (error:any) {
            if (error.code === 404 || error.message?.includes('could not be found')) {
                console.log("Profile DB entry missing. returning Ghost Profile.");

                // Return a temporary "Ghost" profile so the app doesn't crash
                return {
                    accountId: userId,
                    name: userName,
                    email: email,
                    bio: "",
                    avatarId: null,
                    coverId: null,
                    avatarUrl: avatar.getInitials({ name: userName }).toString(),
                    coverUrl: DEFAULT_COVER_IMAGE,
                    $id: userId,
                    $collectionId: appwriteConfig.userCollectionID!,
                    $databaseId: appwriteConfig.databasesID!,
                    $createdAt: new Date().toISOString(),
                    $updatedAt: new Date().toISOString(),
                    $permissions: []
                } as unknown as UserProfile;
            }
            // If it's a real error (like network), throw it
            console.error("Error while getUserProfiele", error)
            throw error
        }
    },

    createProfileDocument: async (userId: string) => {
        try {
            return await tableDb.createRow({
                databaseId: appwriteConfig.databasesID!,
                tableId: appwriteConfig.userCollectionID!,
                rowId: userId,
                data: {
                    accountId: userId,
                    avatarId: null,
                    coverId: null,
                    bio: ''
                }
            });
        } catch (error) {
            console.error("Error while createProfileDocument", error)
            throw error
        }
    },

    updateAvatar: async (userId: string, imageUri: string, userName: string) => {
        return uploadAndUpdate(userId, userName, imageUri, 'avatarId')
    },

    updateCover: async (userId: string, imageUri: string, userName: string) => {
        return uploadAndUpdate(userId, userName, imageUri, 'coverId')
    }
}


const parseProfile = (row: UserDocument, userName: string): UserProfile => {
    return {
        ...row,
        avatarUrl: row.avatarId ? storage.getFilePreview({
            bucketId: appwriteConfig.userMediaBucketID!,
            fileId: row.avatarId,
            width: 200,
            height: 200,
            gravity: ImageGravity.Center,
            quality: 100
        }).toString() : avatar.getInitials({ name: userName }).toString(),
        coverUrl: row.coverId
            ? storage.getFileView({
                bucketId: appwriteConfig.userMediaBucketID!,
                fileId: row.coverId
            }).toString()
            : DEFAULT_COVER_IMAGE
    }
}

const uploadAndUpdate = async (userId: string, userName: string, uri: string, fieldName: 'avatarId' | 'coverId') => {
    try {
        const file = {
            name: `${userId}_${fieldName}_${Date.now()}.jpg`,
            type: 'image/jpeg',
            size: 0,
            uri: uri
        }
        const uploaded = await storage.createFile({
            bucketId: appwriteConfig.userMediaBucketID!,
            fileId: ID.unique(),
            file: file
        });
        const updateDoc = await tableDb.updateRow<UserDocument>({
            databaseId: appwriteConfig.databasesID!,
            tableId: appwriteConfig.userCollectionID!,
            rowId: userId,
            data: {
                [fieldName]: uploaded.$id
            }
        });

        return parseProfile(updateDoc, userName)
    } catch (error) {
        console.error('Error while uploadAndUpdate', error)
        throw error

    }
}

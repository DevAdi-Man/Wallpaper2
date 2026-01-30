import { ID, Query } from "react-native-appwrite"
import { appwriteConfig, tableDb } from "../lib/appwrite"
import { WallpaperProps } from "./wallpaperService"

export const addFavorites = async (userId: string, wallpaperId: string) => {
    try {
         await tableDb.createRow({
            databaseId: appwriteConfig.databasesID!,
            tableId: appwriteConfig.favoriteCollectionID!,
            rowId: ID.unique(),
            data: {
                userId: userId,
                wallpapers: wallpaperId
            }
        });
    } catch (error) {
        console.error("Error adding favorites", error)
        throw error
    }
}

export const removeFavorites = async (userId: string, wallpaperId: string) => {
    try {
        const result = await tableDb.listRows({
            databaseId: appwriteConfig.databasesID!,
            tableId: appwriteConfig.favoriteCollectionID!,
            queries: [
                Query.equal('userId', userId),
                Query.equal('wallpapers', wallpaperId)
            ]
        });

        if (result.rows.length > 0) {
            const favoriteRowId = result.rows[0].$id
            await tableDb.deleteRow({
                databaseId: appwriteConfig.databasesID!,
                tableId: appwriteConfig.favoriteCollectionID!,
                rowId: favoriteRowId
            });
        }
    } catch (error) {
        console.error("Error removing favorites", error)
        throw error
    }

}
export const getFavorites = async (userId: string): Promise<WallpaperProps[]> => {
    try {
        const result = await tableDb.listRows({
            databaseId: appwriteConfig.databasesID!,
            tableId: appwriteConfig.favoriteCollectionID!,
            queries: [Query.equal('userId', userId)]
        });

        const clearData: WallpaperProps[] = await Promise.all(
            result.rows.map(async (row) => {
                const a = await getWallpaper(row.wallpapers);

                return {
                    id: a.$id,
                    imageSource: a.imgSource,
                    height: a.height
                };
            })
        );
        return clearData
    } catch (error) {
        console.warn("Error on getting favorites", error)
        throw error
    }
}

const getWallpaper = async (wallpaperId: string) => {
    const data = await tableDb.getRow({
        databaseId: appwriteConfig.databasesID!,
        tableId: appwriteConfig.wallpaperCollectionID!,
        rowId: wallpaperId
    })
    return data
}

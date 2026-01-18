import {  Query } from "react-native-appwrite";
import { appwriteConfig, tableDb } from "../lib/appwrite";

export interface WallpaperProps {
    id: string;
    imageSource: string;
    height: number;
}

const randamHeight = (): number => {
    return Math.floor(Math.random() * (450 - 300 + 1)) + 300;
}

export const getWallpaper = async (
    collectionId?: string,
    type?: 'group' | 'item',
    lastId?:string
):Promise<WallpaperProps[]> => {

    try {
        const filters = [];

        if (type === 'group' && collectionId) {
            filters.push(Query.equal('categories', collectionId))
        } else if (type === 'item' && collectionId) {
            filters.push(Query.equal('subcategories', collectionId))
        }
        if(lastId){
            filters.push(Query.cursorAfter(lastId))
        }
        const response = await tableDb.listRows({
            databaseId: appwriteConfig.databasesID!,
            tableId: appwriteConfig.wallpaperCollectionID!,
            queries: [
                ...filters,
                Query.orderDesc('$createdAt'),
                Query.limit(20)
            ],
            total:false
        });
        const clearWallpaper = response.rows.map((item)=>({
            id:item.$id,
            imageSource: item.imgSource,
            height: item.height ? randamHeight() : item.height
        }))
        return clearWallpaper;
    } catch (error) {
        console.error("Error in wallpaperService:", error);
        throw error;
    }

}

import { appwriteConfig, tableDb } from "../lib/appwrite";

export interface BannerProps {
    id: string;
    imageSource: string;
}
export const getBanners = async (): Promise<BannerProps[]> =>{
    try {
       const result = await tableDb.listRows({
            databaseId:appwriteConfig.databasesID!,
            tableId:appwriteConfig.bannerCollectionId!,
        }) ;
        const banner = result.rows.map((item)=>({
            id:item.$id,
            imageSource:item.imageSource
        }));
        return banner
    } catch (error) {
        return []
    }
}

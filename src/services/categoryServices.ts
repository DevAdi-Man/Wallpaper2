import { Query } from "react-native-appwrite";
import { appwriteConfig, tableDb } from "../lib/appwrite";

// 1. Child item (from subcategories colletions)
export interface CategoryItem {
    id: string;
    name: string;
    slug: string;
    thumbnail?: string;
}

// 2. Parent item (from categories collections)
export interface CategoryGroup {
    id: string;
    groupName: string;
    uri?: string
    items?: CategoryItem[];
}

export const getCategories = async (): Promise<CategoryGroup[]> => {
    try {
        const parentCategories = await tableDb.listRows({
            databaseId: appwriteConfig.databasesID!,
            tableId: appwriteConfig.categoriesCollectionID!,
            queries: [Query.limit(50)],
        });

        const childCategories = await tableDb.listRows({
            databaseId: appwriteConfig.databasesID!,
            tableId: appwriteConfig.subCategoriesCollectionID!,
            queries: [Query.limit(50),]
        })

        // combining them now
        const combined: CategoryGroup[] = parentCategories.rows.map((item) => {
            const relatedItem = childCategories.rows
                .filter((subitem) => subitem.categories === item.$id)
                .map((childItem) => ({
                    id: childItem.$id,
                    name: childItem.name,
                    slug: childItem.slug,
                    thumbnail: childItem.thumbnail
                }));
            return {
                id: item.$id,
                groupName: item.name,
                uri: item.thumbnail,
                slug: item.slug,
                items: relatedItem
            }
        })
        return combined
    } catch (error) {
        console.error("Fails to get all Categories and subCategories", error)
        throw error;
    }
}

export const getSubcategoriesByParent = async (parentId: string): Promise<CategoryItem[]> => {
    try {
        const response = await tableDb.listRows({
            databaseId:appwriteConfig.databasesID!,
            tableId:appwriteConfig.subCategoriesCollectionID!,
            queries:[
                Query.equal('categories',parentId),
                Query.limit(20)
            ]
        });
        return response.rows.map((item)=>({
            id:item.$id,
            name:item.name,
            slug:item.slug,
            thumbnail:item.thumbnail
        }))
    } catch (error) {
        console.error("Error from getSubcategoriesByParent",error)
        throw error
    }
}

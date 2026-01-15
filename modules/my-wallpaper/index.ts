import { WallpaperMode } from "./src/MyWallpaper.types";
import MyWallpaperModule from "./src/MyWallpaperModule";

export {WallpaperMode}

export async function setWallpaperAsync (
    imageUri:string,
    mode:WallpaperMode = 'home'
):Promise<boolean>{
    return await MyWallpaperModule.setWallpaper(imageUri,mode)
}

import { NativeModule, requireNativeModule } from 'expo';
import { MyWallpaperModuleEvents, WallpaperMode } from './MyWallpaper.types';

declare class MyWallpaperModule extends NativeModule<MyWallpaperModuleEvents>{
    setWallpaper(imageUri:string,mode: WallpaperMode) : Promise<boolean>
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MyWallpaperModule>('MyWallpaper');


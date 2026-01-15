package expo.modules.mywallpaper

import android.app.WallpaperManager
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.InputStream
import java.net.URL
import androidx.core.net.toUri

class MyWallpaperModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('MyWallpaper')` in JavaScript.
    Name("MyWallpaper")

    AsyncFunction("setWallpaper"){imageUri:String, mode:String ->
        val context = appContext.reactContext ?: throw Exception("Context not found")
        val wallpaperManager = WallpaperManager.getInstance(context)

        val inputStream: InputStream? = if (imageUri.startsWith("http")) {
        // Handle Remote URL
             URL(imageUri).openStream()
        } else {
        // Handle Local File (file:// or content://)
            val uri = Uri.parse(imageUri)
            context.contentResolver.openInputStream(uri)
        }

        if (inputStream == null) {
            throw Exception("Could not open input stream for URI: $imageUri")
        }
        val bitmap = BitmapFactory.decodeStream(inputStream) ?: throw Exception("Could not decode image. Ensure the URI is correct.")

        try {
            when (mode.lowercase()){
                "home" -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        wallpaperManager.setBitmap(
                            bitmap,
                            null,
                            true,
                            WallpaperManager.FLAG_SYSTEM
                        )
                    } else {
                        wallpaperManager.setBitmap(bitmap)
                    }
                }

                "lock" -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        wallpaperManager.setBitmap(
                            bitmap,
                            null,
                            true,
                            WallpaperManager.FLAG_LOCK
                        )
                    } else {
                        throw Exception("Lock screen wallpaper requires Android N or higher")
                    }
                }

                "both" -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        wallpaperManager.setBitmap(
                            bitmap,
                            null,
                            true,
                            WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK
                        )
                    } else {
                        wallpaperManager.setBitmap(bitmap)
                    }
                }

                else -> throw Exception("Invalid location. Use 'home', 'lock', or 'both'")
            }
        }catch (e: Exception){
            throw Exception("Error setting wallpaper: ${e.message}")
        }finally {
            inputStream.close()
        }

        return@AsyncFunction  true
    }
  }
}

# Pixory - Wallpaper Application

Pixory is a sleek and modern mobile wallpaper application built with React Native and Expo. It allows users to browse, save, and set high-quality wallpapers, all powered by an Appwrite backend.

## ✨ Features

- **Dynamic Theming:** Seamlessly switch between light and dark modes.
- **User Authentication:** Secure sign-up, login, and email verification.
- **Wallpaper Browsing:** Explore a vast collection of wallpapers.
- **Categorization:** Wallpapers organized into categories for easy discovery.
- **Favorites System:** Save your favorite wallpapers to a personal collection.
- **Set Wallpaper:** Apply wallpapers directly to your device's home screen or lock screen.
- **Profile Management:** Users can update their email and change their password.
- **Modern UI:** Built with a clean and intuitive user interface.

## 🛠️ Tech Stack

- **Frontend:**
  - [React Native](https://reactnative.dev/)
  - [Expo](https://expo.dev/) & Expo Router
  - [TypeScript](https://www.typescriptlang.org/)
- **Backend:**
  - [Appwrite](https://appwrite.io/)
- **Styling:**
  - [Unistyles](https://react-native-unistyles.vercel.app/) for theming and responsive design.
- **Forms:**
  - [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for form handling and validation.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn
- An Appwrite instance (cloud or self-hosted)

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/Pixory.git
cd Pixory
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

This project requires a connection to an Appwrite backend. Create a `.env` file in the root of the project by copying the example below and filling in your Appwrite project details.

#### `.env.sample`
```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_PROJECT_NAME=
EXPO_PUBLIC_APPWRITE_DATABASE_NAME=
EXPO_PUBLIC_APPWRITE_DATABASE_ID=
EXPO_PUBLIC_APPWRITE_WALLPAPER_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_SUBCATEGORIES_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_FAVORITE_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_USER_MEDIA_BUCKET_ID=
EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_BANNER_BUCKET_ID=
EXPO_PUBLIC_APPWRITE_BANNER_COLLECTION_ID=
```

**Note:** Since we have previously removed the `.env` file from the Git history, ensure your `.gitignore` file contains a line for `.env` to prevent accidentally committing your credentials.

### 4. Start the Application

```bash
npx expo start
```

This will open the Expo development server, allowing you to run the app on an Android emulator, iOS simulator, or on your physical device using the Expo Go app.

---

This README was generated with assistance from the Gemini CLI agent.
# Framez: Connect & Share 📸

## Overview
Framez is a modern social media application built with React Native (Expo) and TypeScript, enabling users to share their thoughts and images. It features robust authentication, seamless post creation, and dynamic content feeds, all powered by Supabase for backend services.

## Features
*   **User Authentication**: Secure sign-up, login, and sign-out functionality.
*   **Post Creation**: Users can create new posts, including text content and image uploads.
*   **Dynamic Feeds**: Browse a global feed of posts or view posts specific to a user's profile.
*   **User Profiles**: Manage personal profiles, including avatar updates and displaying user-specific content.
*   **Image Handling**: Integrated image picking and display for posts and avatars.
*   **Responsive UI**: A sleek, mobile-first interface built with NativeWind (Tailwind CSS for React Native).
*   **Real-time Capabilities**: Leveraging Supabase for efficient data synchronization and updates.
*   **Type Safety**: Developed with TypeScript for enhanced code quality and maintainability.

## Getting Started

Follow these steps to set up and run Framez on your local machine.

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Redot2468/hng13-frontend-stage4-framez.git
    cd framez
    ```

2.  **Install Dependencies**:
    Install the project dependencies using npm or yarn:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Update Supabase Types (Optional but Recommended)**:
    If your Supabase schema changes, you can regenerate the TypeScript types:
    ```bash
    npm run update-types
    # or
    yarn update-types
    ```

### Environment Variables

Before running the application, you need to configure your Supabase environment variables. Create a `.env` file in the root of the project with the following:

*   `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
*   `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Project Anon Key.

**Example .env:**
```
EXPO_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
EXPO_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
You can find these credentials in your Supabase project settings.

## Usage

To start the development server and run the application:

1.  **Start the Expo Development Server**:
    ```bash
    npm start
    # or
    yarn start
    ```
    This will open a new tab in your browser with the Expo Developer Tools.

2.  **Run on Your Device or Emulator**:
    *   Scan the QR code with your Expo Go app (iOS or Android).
    *   Run on an Android emulator by pressing `a`.
    *   Run on an iOS simulator by pressing `i` (macOS only).
    *   Run in a web browser by pressing `w`.

Once the app is running:
*   **Sign Up/Login**: Create a new account or sign in with existing credentials to access the application's features.
*   **View Feeds**: Navigate to the "Feeds" tab to see posts from all users.
*   **Create Post**: Go to the "Create" tab to write new content and optionally upload an image.
*   **Manage Profile**: Visit the "Profile" tab to update your avatar and view your own posts.

## Features
*   **User Authentication**: Secure user registration, login, and session management using Supabase Auth.
*   **Post Management**: Create, view, and display posts with both text and image content.
*   **Profile Customization**: Users can update their profile avatars.
*   **Dynamic Content Feeds**: Real-time display of user-generated content.
*   **Type-Safe Development**: Leverages TypeScript for robust and maintainable code.
*   **Form Validation**: Client-side form validation powered by Zod and React Hook Form.
*   **Optimistic UI Updates**: Efficient data fetching and caching with TanStack React Query.
*   **Modern Styling**: Utilizes NativeWind for a utility-first CSS approach (Tailwind CSS).
*   **Animations**: Enhances user experience with subtle animations using Moti and React Native Reanimated.

## Technologies Used

| Technology             | Description                                                                 | Link                                                                      |
| :--------------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **TypeScript**         | Superset of JavaScript that adds static types.                              | [TypeScript](https://www.typescriptlang.org/)                             |
| **React Native (Expo)**| Framework for building native mobile apps using React.                      | [React Native](https://reactnative.dev/) / [Expo](https://expo.dev/)      |
| **NativeWind**         | Tailwind CSS for React Native, enabling utility-first styling.              | [NativeWind](https://www.nativewind.dev/)                                 |
| **Supabase**           | Open-source Firebase alternative for database, authentication, and storage. | [Supabase](https://supabase.com/)                                         |
| **React Hook Form**    | Performant, flexible, and extensible forms with easy-to-use validation.     | [React Hook Form](https://react-hook-form.com/)                           |
| **Zod**                | TypeScript-first schema declaration and validation library.                 | [Zod](https://zod.dev/)                                                   |
| **TanStack Query**     | Powerful asynchronous state management for React.                           | [TanStack Query](https://tanstack.com/query/latest)                       |
| **Moti**               | Universal animation library for React Native powered by Reanimated.         | [Moti](https://moti.fyi/)                                                 |
| **Expo Router**        | File-system based routing for universal React Native apps.                  | [Expo Router](https://expo.github.io/router/docs/)                        |

## License
This project is licensed under the MIT License.

## Author
**Ridwan Demilade**
*   LinkedIn: [linkedin.com/in/ridwan-demilade](https://linkedin.com/in/ridwan-demilade)
*   Twitter: [@YourTwitterHandle](https://twitter.com/YourTwitterHandle)

---

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Redot2468/hng13-frontend-stage4-framez/actions)
[![Last Commit](https://img.shields.io/github/last-commit/Redot2468/hng13-frontend-stage4-framez)](https://github.com/Redot2468/hng13-frontend-stage4-framez/commits/main)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1B1F23?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-179BD2?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
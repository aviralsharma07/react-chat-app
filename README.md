# React Chat App

Live Project Link: [React Chat App](https://chat-app-avi.netlify.app/)

This is a React-based chat application that utilizes Firebase for storage and authentication. It uses Zustand as a state management tool and provides features for real-time messaging.

## Folder Structure

```
react-chat-app/
├── .firebase/ # Firebase configuration files
├── build/ # Production build output
├── public/ # Public assets and HTML template
│ ├── index.html # Main HTML template
├── src/ # Source files
│ ├── components/ # React components
│ │ ├── Chat/ # Chat components
│ │ ├── Detail/ # Detail components
│ │ ├── List/ # List components
│ │ ├── Login/ # Login components
│ │ └── Notification/ # Notification components
│ ├── context/ # Context for state management
│ ├── lib/ # Additional library files
│ │ ├── chatstore.js # Zustand store for chat state
│ │ ├── firebase.js # Firebase configuration
│ │ ├── upload.js # Utility functions for file uploads
│ │ └── userStore.js # Zustand store for user authentication
├── .env # Environment variables configuration
├── .eslintrc.cjs # ESLint configuration
├── .firebaserc # Firebase configuration
├── .gitignore # Git ignore file
├── README.md # Project documentation
├── firebase.json # Firebase hosting configuration
├── index.html # HTML template
├── package-lock.json # Dependency lock file
├── package.json # npm package metadata
├── vite.config.js # Vite configuration
```

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Firebase**: Cloud-based platform for building mobile and web applications.
- **Zustand**: State management library for React.
- **Vite**: Frontend build tool that provides fast development server and optimized builds.
- **ESLint**: Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/aviralsharma07/react-chat-app
   ```

2. Navigate to the project directory:

   ```bash
   cd react-chat-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up Firebase:

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Copy the Firebase configuration object into `src/lib/firebase.js`.
   - Enable Firebase Authentication and Firebase Realtime Database or Firestore for the chat functionality.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the browser and navigate to the provided URL to view the app.

## Usage

Once the app is running, users can sign in, view their chat history, and send messages in real-time.

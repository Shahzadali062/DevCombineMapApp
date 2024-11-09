# DevCombineMapApp

DevCombineMapApp is a mobile application developed with React Native using Expo. The app enables users to log in, fetch data from a backend server, and display detailed location markers on an interactive map.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Screens Overview](#screens-overview)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Additional Information](#additional-information)

## Features
- User Login with JWT authentication.
- Token Expiration Handling to redirect users upon token expiry.
- Interactive map with detailed location markers.
- Secure token storage with AsyncStorage.

## Installation

### Prerequisites
- Node.js and npm installed.
- Expo CLI globally installed (`npm install -g expo-cli`).

### Steps
1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd DevCombineMapApp
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start the Expo server**:
   ```sh
   expo start
   ```

## Usage
1. Start the app.
2. Log in using the credentials provided by the backend:
   - **Username**: `user`
   - **Password**: `password`
3. View locations on the map.
4. Tap on the markers to view detailed information about each location.

## Architecture
- **Frontend**: Built with React Native using TypeScript and Expo.
- **Backend**: REST API implemented in Golang that uses JWT-based authentication.
- **Map Integration**: Using `react-native-maps` to provide map functionality and display markers.

## Screens Overview

### 1. Login Screen (`index.tsx`)
- Allows users to authenticate using their username and password.
- Displays error messages for invalid credentials or missing fields.

### 2. Map Screen (`MapScreen.tsx`)
- Displays an interactive map using `react-native-maps`.
- Fetches locations from the backend server after authentication.
- Displays markers for each location with detailed information (address).
- Handles expired tokens by redirecting users back to the login screen.

## API Endpoints
- **POST `/login`**: Authenticates users and generates an access token.
  - **Request Body**: `{ "username": "string", "password": "string" }`
  - **Response**: `{ "access_token": "string", "refresh_token": "string" }`

- **GET `/locations`**: Fetches location data for authenticated users.
  - **Headers**: `Authorization: Bearer <access_token>`
  - **Response**: An array of location objects containing latitude, longitude, and formatted address.

## Folder Structure

```
DevCombineMapApp
├── app
│   ├── index.tsx                # Login Screen
│   ├── MapScreen.tsx            # Map Screen with locations
├── assets
├── components                   # Shared UI components
├── constants                    # Color and theme definitions
├── hooks                        # Custom hooks
├── node_modules                 # Node dependencies
├── package.json                 # Project dependencies and scripts
├── README.md                    # Project documentation
└── ...
```

## Additional Information

### Troubleshooting Tips
- **Login Issues**: Ensure that the backend server is running and reachable via the correct IP address.
- **Token Expiration**: The app checks token validity before fetching location data. If the token is expired, the user will be redirected to the login screen.

### Contact
For any issues or questions, feel free to reach out to the project maintainer at [shahzad18111062@gmail.com].


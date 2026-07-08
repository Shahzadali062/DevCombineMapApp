# DevCombineMapApp

A React Native + Expo mobile application that allows users to log in, store an authentication token securely, fetch protected location data from a backend API, and display valid locations as markers on an interactive map.

This project demonstrates mobile authentication, REST API integration, secure local token storage, and map-based location visualization using React Native Maps.

---

## 🚀 Features

- User login screen with username and password validation
- JWT-based authentication flow
- Secure token storage using AsyncStorage
- Protected API request with Bearer token
- Interactive map using React Native Maps
- Dynamic location markers
- Marker callouts with formatted address details
- Loading and error states
- Invalid location filtering
- Expo Router navigation
- TypeScript-based React Native structure
- Android and iOS support through Expo

---

## 🛠 Tech Stack

- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router**
- **React Native Maps**
- **AsyncStorage**
- **REST API**
- **JWT Authentication**
- **Fetch API**
- **Android / iOS**

---

## 📱 Screens

### Login Screen

The login screen allows users to enter their username and password.  
After successful authentication, the access token is saved locally using AsyncStorage and the user is redirected to the map screen.

### Map Screen

The map screen retrieves the saved token, sends an authenticated request to the backend, fetches location data, filters invalid coordinates, and displays valid locations as markers on the map.

---

## 📁 Project Structure

```bash
DevCombineMapApp/
├── app/
│   ├── index.tsx          # Login screen
│   ├── MapScreen.tsx      # Map screen with markers
│   └── _layout.tsx        # Expo Router stack layout
├── constants/
│   └── Colors.ts
├── hooks/
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   └── useThemeColor.ts
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Shahzadali062/DevCombineMapApp.git
cd DevCombineMapApp
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run on web:

```bash
npm run web
```

---

## 🔐 Authentication Flow

1. User enters username and password.
2. App sends a login request to the backend API.
3. Backend returns an access token.
4. Token is saved locally using AsyncStorage.
5. User is redirected to the map screen.
6. Map screen reads the saved token.
7. App sends an authenticated request to fetch locations.
8. Valid locations are displayed as map markers.

---

## 🌐 API Endpoints

### Login

```http
POST /login
```

Example request body:

```json
{
  "username": "user",
  "password": "password"
}
```

Expected response:

```json
{
  "access_token": "jwt_access_token",
  "refresh_token": "jwt_refresh_token"
}
```

---

### Get Locations

```http
GET /locations
```

Required header:

```http
Authorization: Bearer <access_token>
```

Expected response:

```json
[
  {
    "latitude": 37.7893,
    "longitude": -122.4108,
    "formattedAddress": "925 Bush St, San Francisco, CA"
  }
]
```

---

## 🗺 Map Functionality

The app uses `react-native-maps` to display an interactive map.

Location data is filtered before rendering, so records with invalid coordinates such as `0, 0` are not displayed.

Each valid location is shown as a map marker.  
When a user taps a marker, a callout displays the formatted address.

---

## 🧪 Scripts

```bash
npm start
```

Starts the Expo development server.

```bash
npm run android
```

Runs the app on an Android emulator or connected Android device.

```bash
npm run ios
```

Runs the app on an iOS simulator or connected iOS device.

```bash
npm run web
```

Runs the app in a web browser.

```bash
npm run lint
```

Runs Expo linting.

```bash
npm test
```

Runs Jest tests in watch mode.

---

## 📌 Use Cases

This project can be used as a starter template for:

- React Native authentication apps
- JWT-based mobile login systems
- Map-based mobile applications
- Location marker visualization
- Protected REST API integration
- Expo Router mobile projects
- Android/iOS map apps

---

## ⚠️ Security Note

Before using this project in production:

- Move backend URLs into environment variables
- Do not hardcode local IP addresses in source code
- Keep API keys private
- Restrict Google Maps API keys from Google Cloud Console
- Use secure token handling for production authentication
- Add proper refresh-token handling and logout flow

---

## 🔮 Future Improvements

- Add logout functionality
- Add refresh token support
- Move API base URL to environment variables
- Add map search and filtering
- Add user profile screen
- Add better UI design for login and map screens
- Add location clustering for large datasets
- Add offline/error retry handling
- Add Firebase or push notification support

---

## 👨‍💻 Author

**Shahzad Ali**  
React Native Developer | Mobile App Developer | AI Researcher

- GitHub: https://github.com/Shahzadali062
- LinkedIn: https://www.linkedin.com/in/shahzad-ali-989706251
- Location: Bangkok, Thailand

---

## 📄 License


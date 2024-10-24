# Quick Aid App
Quick Aid is a React Native application designed to provide users with emergency services, allowing rapid response to critical situations. The app notifies service providers like ambulances, police, and other emergency personnel and supports offline functionality by dialing emergency numbers.

## Features
* **Emergency Service Request:** Users can request emergency services and automatically notify nearby service providers.
* **Provider Notifications:** Alerts are sent to service providers through SMS or push notifications.
* **User Authentication:** Secure user login, registration, and OTP verification.
* **Offline Support:** Automatically dials emergency numbers when no internet connection is available.
* **Data Encryption:** Sensitive data, like user passwords, is encrypted for security.
Tech Stack
* **Frontend:** React Native (for iOS and Android support)
* **Backend:** Python with Django
* **Database:** Sqlite (for user, service requests, and provider data)
* **Notification Service:** push notifications

## Prerequisites
* Node.js (v20 or above)
* React Native CLI
* Android Studio or Xcode (for emulator)

## Installation Steps
**1. Clone the repository:**

```
1. git clone https://github.com/Innovate-X-team/quick-aid-user-app.git
2. cd quick-aid-user-app
```
**2. Install dependencies:**
```
npm install
```
**3. Configure environment variables:** Create a .env file in the root directory with the following details:

```
REACT_APP_API_ENDPOINT=[paste your server endpoint here]
```

**4. Start the React Native app:**

   For iOS:

```
npx react-native run-ios
```
   For Android:

```
npx react-native run-android
```
**5. Run the backend server:**

See Quick Aid's server repository for starting the backend server. https://github.com/Innovate-X-team/Quick-Aid-Backend

## Usage
* **Register:** New users can sign up with an email and password.
* **Request Service:** Submit your location and select the type of emergency service (e.g., ambulance, police).
* **Receive Notifications:** Service providers will be notified via push notification of your request.
* **Offline Mode:** If the app detects no internet connection, it will auto-dial the emergency service number.
## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a pull request

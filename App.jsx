/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PermissionsAndroid } from 'react-native';
import ConsumerHome from './pages/Consumer/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Profile from './pages/Profile';
import Login from './pages/LoginRegister/Login';
import ForgetPass from './pages/LoginRegister/forgetPass';
import ChangePass from './pages/LoginRegister/changePass';
import UserType from './pages/LoginRegister/userType';
import UserAgreement from './pages/Terms';
import RegisterConsumer from './pages/LoginRegister/registerConsumer';
import RegisterProvider from './pages/LoginRegister/registerProvider';
import RegisterProvider2 from './pages/LoginRegister/registerProvider2';
import VerifyEmail from './pages/LoginRegister/VerifyEmail';
import CreateAccount from './pages/LoginRegister/createAccount';
import About from './pages/About';
import SplashScreen from './pages/SplashScreen';
import ProviderHome from './pages/Provider/Home';


const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black', // Set default text color to black
    background: 'white', // Optionally, set a background color
  },
};


const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [userType, setUserType] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [splashScreen, setSplashScreen] = useState(true);

  // console.log(process.env.REACT_APP_API_ENDPOINT);

  const requestLocationPermissions = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BODY_SENSORS_BACKGROUND);
    } catch (error) {
      console.error('Error requesting location permissions:', error);
    }
  };

  requestLocationPermissions();
  const checkLogin = async () => {
    const splashTimeout = () => {
      if (username !== undefined && userType !== undefined) {
        setSplashScreen(false);
      } else {
        setTimeout(splashTimeout, 500);
      }
    };
    setTimeout(splashTimeout, 1000);
    setUsername(await AsyncStorage.getItem('username'));
    setUserType(await AsyncStorage.getItem('user_type'));
    username != null ? setIsLogedIn(true) : setIsLogedIn(false);
  };

  // useEffect(() => {
  checkLogin();
  // }, []);
  return (
    <SafeAreaView style={{ height: '100%', width: '100%' }} >
      <StatusBar
        animated={true}
        backgroundColor={isLogedIn ? '#e48634' : '#18acd1'}
        barStyle={'light-content'}
      />
      {splashScreen ? <SplashScreen /> :
        <>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName={isLogedIn ? userType === 'Consumer' ? 'ConsumerHome' : 'ProviderHome' : 'Login'}>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {(props) => <Login {...props} />}
              </Stack.Screen>
              <Stack.Screen name="forgetPass" options={{ headerShown: false }}>
                {(props) => <ForgetPass {...props} />}
              </Stack.Screen>
              <Stack.Screen name="changePass" options={{ headerShown: false }}>
                {(props) => <ChangePass {...props} />}
              </Stack.Screen>
              <Stack.Screen name="userType" options={{ headerShown: false }}>
                {(props) => <UserType {...props} />}
              </Stack.Screen>
              <Stack.Screen name="registerConsumer" options={{ headerShown: false }}>
                {(props) => <RegisterConsumer {...props} />}
              </Stack.Screen>
              <Stack.Screen name="registerProvider" options={{ headerShown: false }}>
                {(props) => <RegisterProvider {...props} />}
              </Stack.Screen>
              <Stack.Screen name="registerProvider2" options={{ headerShown: false }}>
                {(props) => <RegisterProvider2 {...props} />}
              </Stack.Screen>
              <Stack.Screen name="verifyEmail" options={{ headerShown: false }}>
                {(props) => <VerifyEmail {...props} />}
              </Stack.Screen>
              <Stack.Screen name="createAccount" options={{ headerShown: false }}>
                {(props) => <CreateAccount {...props} setIsLogedIn={setIsLogedIn} />}
              </Stack.Screen>
              <Stack.Screen name="UserAgreement" options={{ headerShown: false }}>
                {(props) => <UserAgreement {...props} />}
              </Stack.Screen>
              <Stack.Screen name="ConsumerHome" options={{ headerShown: false }}>
                {(props) => <ConsumerHome {...props} />}
              </Stack.Screen>
              <Stack.Screen name="ProviderHome" options={{ headerShown: false }}>
                {(props) => <ProviderHome {...props} />}
              </Stack.Screen>
              <Stack.Screen name="AboutTeam" options={{ headerShown: false }}>
                {(props) => <About {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
          <Toast visibilityTime={3000} position="bottom"  />
        </>
      }
      {/* <LoginRegistration setIsLogedIn={setIsLogedIn} /> */}
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   text: {
//     color: 'red',
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });


export default App;

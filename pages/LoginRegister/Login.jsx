/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [usernameEmail, setUsernameEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Validate input fields here
        if (!usernameEmail || !password) {
            Toast.show({
                type: 'error',
                text2: 'Please fill in all required fields.',
                text2Style: {fontSize: 18},
            });
            return;
        }

        // Submit form data to server or perform other actions
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/login/`, {
            usernameEmail,
            password,
        }).then(async(response, error) => {
            if(response.status === 200){
                Toast.show({
                    type: 'success',
                    text2: 'Login successful',
                    text2Style: {fontSize: 18},
                });
                await AsyncStorage.setItem('username', response.data.username);
                await AsyncStorage.setItem('name', response.data.name);
                await AsyncStorage.setItem('user_type', response.data.userType);
                navigation.reset({
                    index: 0,
                    routes: [{ name: response.data.userType === 'Consumer' ? 'ConsumerHome' : 'ProviderHome' }],
                });
            }
        }).catch(error=> {
            Toast.show({
                type: 'error',
                text2: error.response.data.error,
                text2Style: {fontSize: 18},
            });
        });

    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <>
            <StatusBar backgroundColor={'#18acd1'} />
            <View style={styles.container}>
                <Image style={styles.waterMark} source={require('../../assets/logo.png')} />
                {!keyboardVisible && <View style={styles.logoContailer}>
                    <Image source={require('../../assets/logo.png')} style={{ height: 150, width: 120 }} />
                    <View>
                        <Text style={styles.appName}>Quick Aid&nbsp;</Text>
                        <Text style={styles.teamName}>-Made By Innovate X </Text>
                    </View>
                </View>}
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Login to your profile</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Username or Email Id"
                        placeholderTextColor={'gray'}
                        value={usernameEmail}
                        onChangeText={setUsernameEmail}
                    />
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Enter your email ID"
                        placeholderTextColor={'gray'}
                        value={emailId}
                        onChangeText={setEmailId}
                    /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                        <Text style={{ color: 'black' }} onPress={() => navigation.navigate('forgetPass')}>Forget Password?</Text>
                        <Text style={{ color: 'black' }}>New User? <Text onPress={() => navigation.navigate('userType')} style={{ color: '#18acd1' }}>Register</Text></Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                {!keyboardVisible && <Image style={styles.footerImage} source={require('../../assets/footer-image.png')} />}
            </View>
        </>
    );
};

export default Login;

const styles = StyleSheet.create({
    waterMark: {
        height: 500,
        width: 500,
        position: 'absolute',
        alignSelf: 'center',
        opacity: 0.2,
        top: '50%',
        transform: 'translateY(-250px)',
    },
    container: {
        flex: 1,
        height: '100vh',
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
    },
    logoContailer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 30,
    },
    appName: {
        fontSize: 40,
        fontFamily: 'Alike-Regular',
        color: '#000',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    teamName: {
        fontSize: 15,
        marginBottom: 20,
        color: '#000',
        fontFamily: 'Alike-Regular',
        marginLeft: 30,
    },
    loginContainer: {
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
        transform: 'translateY(-50%)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        margin: 'auto',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 3,
        marginBottom: 10,
        padding: 10,
        borderRadius: 50,
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    button: {
        padding: 5,
        backgroundColor: '#18acd1',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
    },
    footerImage: {
        width: '112%',
        position: 'absolute',
        bottom: 0,
        resizeMode: 'cover',
        zIndex: -99,
    },
});

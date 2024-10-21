/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const ForgetPass = ({ navigation }) => {
    const [usernameEmail, setUsernameEmail] = useState('');
    const [OTP, setOTP] = useState('');

    const sendOtp = () => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/send_email_otp/`, {
            type: 'change',
            usernameEmail,
        }).then((response)=>{
            if(response.status === 200){
                Toast.show({
                    type:'success',
                    text2: 'We have sent an OTP to your email!',
                    text2Style: {fontSize: 18},
                });
            }
        }).catch((error) => {
            Toast.show({
                type:'error',
                text2: 'Something went wrong!',
                text2Style: {fontSize: 18},
            });
        });
    };

    const verifyOTP = () => {
        // Validate input fields here
        if (!usernameEmail || !OTP) {
            // eslint-disable-next-line no-alert
            alert('Please fill Email and OTP correctlly.');
            return;
        }

        // Submit form data to server or perform other actions
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/verify_email/`, {
            usernameEmail,
            otp: OTP,
        }).then((response)=>{
            if(response.status === 200){
                navigation.navigate('changePass', {
                    usernameEmail,
                });
            } else {
                Toast.show({
                    type:'error',
                    text2: 'Invalid OTP!',
                    text2Style: {fontSize: 18},
                });
            }
        }).catch(error=>{
            Toast.show({
                type:'error',
                text2: 'Something went wrong!',
                text2Style: {fontSize: 18},
            });
        });
    };
    return (
        <View style={styles.container}>
            <Image style={styles.waterMark} source={require('../../assets/logo.png')} />
            <View style={styles.logoContailer}>
                <View>
                    <Text style={styles.appName}>Quick Aid&nbsp;</Text>
                    <Text style={styles.teamName}>-Made By Innovate X </Text>
                </View>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Forget your password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username or email"
                    placeholderTextColor={'gray'}
                    value={usernameEmail}
                    onChangeText={setUsernameEmail}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 5 }}>
                    <Text onPress={sendOtp} style={{ color: '#18acd1' }}>Get OTP</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    placeholderTextColor={'gray'}
                    value={OTP}
                    onChangeText={setOTP}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                />
                <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
            <Image style={styles.footerImage} source={require('../../assets/footer-image.png')} />
        </View>
    );
};

export default ForgetPass;

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

/* eslint-disable react-native/no-inline-styles */

import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const VerifyEmail = ({ navigation, route }) => {
    const [containerHeight, setContainerHeight] = useState(0);
    const [OTP, setOTP] = useState(0);

    const { name, email } = route.params;

    const sendOTP = useCallback(() => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/send_email_otp/`, {
            type: 'verify',
            name,
            email: email,
        }).then(response => {
            Toast.show({
                type: 'success',
                text2: 'We have sent an OTP to your email',
                text2Style: {fontSize: 18},
            });
        }).catch(error => {
            Toast.show({
                type: 'error',
                text2: 'Something went wrong',
                text2Style: {fontSize: 18},
            });
        });
    },[email, name]);

    const verifyEmailFunc = () => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/verify_email/`, {
            email,
            otp: OTP,
        }).then((response)=>{
            if(response.status === 200){
                navigation.navigate('createAccount', route.params);
            } else {
                Toast.show({
                    type: 'error',
                    text2: 'Invalid OTP',
                    text2Style: {fontSize: 18},
                });
            }
        }).catch((error)=>{
            Toast.show({
                type: 'error',
                text2: 'Invalid OTP',
                text2Style: {fontSize: 18},
            });
        });
    };

    useEffect(() => {
        sendOTP();
    }, [sendOTP]);
    return (
        <View style={styles.container}>
            <View
                style={styles.logoContailer}
            >
                <View>
                    <Text style={styles.appName}>Quick Aid&nbsp;</Text>
                    <Text style={styles.teamName}>-Made By Innovate X </Text>
                </View>
            </View>
            <View
                style={[styles.otpContainer, { transform: [{ translateY: containerHeight * -0.5 }] }]}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setContainerHeight(height);
                }}
            >
                <Text style={styles.title}>Enter your OTP</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter otp sent to your Email"
                    placeholderTextColor={'gray'}
                    value={OTP}
                    onChangeText={setOTP}
                    keyboardType="number-pad"
                />
                <TouchableOpacity onPress={sendOTP} style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ color: '#18acd1', margin: 5, fontSize: 20 }}>Send Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={verifyEmailFunc}>
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
            </View>
            <Image style={styles.footerImage} source={require('../../assets/footer-image.png')} />
        </View>
    );
};

export default VerifyEmail;

const styles = StyleSheet.create({
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
    otpContainer: {
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
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
        width: '110%',
        position: 'absolute',
        bottom: 0,
        left: '1.2%',
        resizeMode: 'cover',
        zIndex: -99,
    },
});

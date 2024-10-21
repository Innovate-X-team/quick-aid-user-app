import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const ChangePass = ({navigation, route}) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changePassword = () => {
        // Validate input fields here
        if (password !== confirmPassword) {
            // eslint-disable-next-line no-alert
            alert('Password mismatch.');
            return;
        }

        // Submit form data to server or perform other actions
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/change_password/`, {
            usernameEmail: route.params.usernameEmail,
            password: password,
        }).then(response=>{
            Toast.show({
                type:'success',
                text2: 'Password changed successfully!',
                text2Style: {fontSize: 18},
            });
            navigation.navigate('Login');
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
                <Text style={styles.title}>Change Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    placeholderTextColor={'gray'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={'gray'}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={changePassword}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Image style={styles.footerImage} source={require('../../assets/footer-image.png')} />
        </View>
    );
};

export default ChangePass;

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

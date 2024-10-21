/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';

const RegisterConsumer = ({ navigation }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = () => {
        // Validate input fields here
        if (!name || !username || !mobileNo || !email || !dateOfBirth || !termsAccepted) {
            // eslint-disable-next-line no-alert
            alert('Please fill in all required fields and accept the terms and conditions.');
            return;
        }

        // Submit form data to server or perform other actions
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/check_username/', {
            username,
        }).then((response) => {
            navigation.navigate('verifyEmail', {
                type: 'consumer',
                name,
                username,
                phone_number: mobileNo,
                email,
                dateOfBirth,
            });
        }).catch(error => {
            setUsernameAvailable(false);
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
        <View style={styles.container}>
            <Image style={styles.waterMark} source={require('../../assets/logo.png')} />
            {!keyboardVisible && <View style={styles.logoContailer}>
                <View>
                    <Text style={styles.appName}>Quick Aid&nbsp;</Text>
                    <Text style={styles.teamName}>-Made By Innovate X </Text>
                </View>
            </View>}
            <View
                style={[styles.registerContainer, { transform: [{ translateY: containerHeight * -0.5 }] }]}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setContainerHeight(height);
                }}
            >
                <Text style={styles.title}>New Consumer User</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor={'gray'}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={[styles.input, { borderColor: usernameAvailable ? 'gray' : 'red' }]}
                    placeholder="Enter your username"
                    placeholderTextColor={'gray'}
                    value={username}
                    onChangeText={(item) => {
                        if (item.includes(' ')) { return; }
                        setUsername(item);
                        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/check_username/', {
                            username: item,
                        }).then((response) => {
                            setUsernameAvailable(true);
                        }).catch(error => {
                            setUsernameAvailable(false);
                        });
                    }}
                />
                {!usernameAvailable && <Text style={{ color: 'red', alignSelf: 'flex-end' }}>Username allready taken!</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email ID"
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your mobile number"
                    placeholderTextColor={'gray'}
                    value={mobileNo}
                    onChangeText={setMobileNo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date of birth"
                    placeholderTextColor={'gray'}
                    value={dateOfBirth.toDateString()}
                    onFocus={() => setOpen(true)}
                    onBlur={()=>setOpen(false)}
                    onPress={()=>setOpen(true)}
                />
                <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={dateOfBirth}
                    onConfirm={(date) => {
                        setOpen(false);
                        setDateOfBirth(date);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
                <View style={styles.termsContainer}>
                    <BouncyCheckbox
                        fillColor="#18acd1"
                        isChecked={termsAccepted}
                        onPress={() => setTermsAccepted(!termsAccepted)}
                        disableText={true}
                    />
                    <Text style={styles.termsText}>I hereby acknowledge that I have read, understood, and agree to abide by the <Text style={{ color: '#18acd1' }} onPress={() => navigation.push('UserAgreement')}>terms and conditions.</Text></Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            {!keyboardVisible && <Image style={styles.footerImage} source={require('../../assets/footer-image.png')} />}
        </View>
    );
};

export default RegisterConsumer;

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
    registerContainer: {
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        // marginTop: 70,
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
        marginTop: 10,
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
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    termsText: {
        marginLeft: 5,
        color: 'black',
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

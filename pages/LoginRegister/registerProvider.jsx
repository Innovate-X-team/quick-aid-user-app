/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterProvider = ({ navigation }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const [name, setName] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [username, setUsername] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');

    const services = [
        { label: 'Women Safety', value: 'women' },
        { label: 'Child Protection', value: 'child' },
        { label: 'Ambulance Service', value: 'ambulance' },
        { label: 'Fire Safety Service', value: 'fire' },
        { label: 'Police Service', value: 'police' },
        { label: 'NDRF', value: 'ndrf' },
    ];

    const handleSubmit = () => {
        // Validate input fields here
        if (!name || !mobileNo || !serviceType || !email ) {
            // eslint-disable-next-line no-alert
            alert('Please fill in all required fields.');
            return;
        }

        // Submit form data to server or perform other actions
        navigation.navigate('registerProvider2', {
            type: 'provider',
            name,
            service_type: serviceType,
            username,
            phone_number: mobileNo,
            email,
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
                <Text style={styles.title}>New Provider User</Text>
                <Dropdown
                    style={styles.input}
                    placeholder={!isFocus ? 'Select Service Type' : '...'}
                    placeholderStyle={{ color: 'gray' }}
                    selectedTextStyle={{color: 'black'}}
                    data={services}
                    value={serviceType}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={{color: 'black'}}
                    onChange={item => {
                        setServiceType(item.value);
                        setIsFocus(false);
                    }}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                />
                {/* <TextInput
                    style={styles.input}
                    placeholder="Service Type"
                    placeholderTextColor={'gray'}
                    value={serviceType}
                    onChangeText={setServiceType}
                /> */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor={'gray'}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={[styles.input, {borderColor: usernameAvailable ? 'gray' : 'red'}]}
                    placeholder="Enter your username"
                    placeholderTextColor={'gray'}
                    value={username}
                    onChangeText={(item)=> {
                        setUsername(item);
                        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/check_username/', {
                            username: item,
                        }).then((response)=>{
                            setUsernameAvailable(true);
                        }).catch(error=>{
                            setUsernameAvailable(false);
                        });
                    }}
                />
                {!usernameAvailable && <Text style={{color: 'red', alignSelf: 'flex-end'}}>Username allready taken!</Text>}
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            {!keyboardVisible && <Image style={styles.footerImage} source={require('../../assets/footer-image.png')} />}
        </View>
    );
};

export default RegisterProvider;

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
        marginTop: 10,
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

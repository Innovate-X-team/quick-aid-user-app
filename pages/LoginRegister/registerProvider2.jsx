/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { State, City }  from 'country-state-city';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState, useEffect } from 'react';
import districts from '../../assets/districts';

const RegisterProvider2 = ({ navigation, route }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const [citys, setCitys] = useState([]);
    const [city, setCity] = useState('');
    const [states, setStates] = useState(State.getStatesOfCountry('IN'));
    const [state, setState] = useState('');
    const [regNo, setRegNo] = useState('');
    const [district, setDistrict] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = () => {
        // Validate input fields here
        if (!state || !city || !termsAccepted || !regNo ) {
            // eslint-disable-next-line no-alert
            alert('Please fill in all required fields and accept the terms and conditions.');
            return;
        }

        // Submit form data to server or perform other actions
        navigation.navigate('verifyEmail', {
            ...route.params,
            state,
            district,
            city,
            reg_no: regNo,
        });
    };

    useEffect(()=> {
        console.log(state)
        state !== '' ? districts[state].districts : []
    },[state]);

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
                    placeholder={'Select State'}
                    placeholderStyle={{ color: 'gray' }}
                    selectedTextStyle={{color: 'black'}}
                    data={states}
                    value={state}
                    labelField="name"
                    valueField="isoCode"
                    itemTextStyle={{color: 'black'}}
                    onChange={item => {
                        setState(item.isoCode);
                        setCitys(City.getCitiesOfState('IN', item.isoCode));
                    }}
                />
                <Dropdown
                    style={styles.input}
                    placeholder={'Select State'}
                    placeholderStyle={{ color: 'gray' }}
                    selectedTextStyle={{color: 'black'}}
                    data={state !== '' ? districts[state].districts : []}
                    value={district}
                    labelField="name"
                    valueField="name"
                    itemTextStyle={{color: 'black'}}
                    onChange={item => {
                        setDistrict(item.name);
                    }}
                />
                <Dropdown
                    style={styles.input}
                    placeholder={'Select City'}
                    placeholderStyle={{ color: 'gray' }}
                    selectedTextStyle={{color: 'black'}}
                    data={citys}
                    value={city}
                    labelField="name"
                    valueField="name"
                    itemTextStyle={{color: 'black'}}
                    onChange={item => {
                        setCity(item.name);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Registration Number of Provider"
                    placeholderTextColor={'gray'}
                    value={regNo}
                    onChangeText={setRegNo}
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

export default RegisterProvider2;

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

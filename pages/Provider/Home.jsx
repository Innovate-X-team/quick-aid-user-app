/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackgroundService from 'react-native-background-actions';
import Hamburger from '../../assets/Hamburger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideBar from './SideBar';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';


const updateLocation = async() => {
    const username = await AsyncStorage.getItem('username');
    Geolocation.watchPosition(async(position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        await axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/update_location/', {
            username,
            latitude: location[0],
            longitude: location[1],
        });
    }, error => {
        console.log(error);
    }, { enableHighAccuracy: false });
};

const ProviderHome = ({ navigation }) => {
    const [username, setUsername] = useState('second');
    const [sideBar, setSideBar] = useState(false);
    const [name, setName] = useState('');
    const [isOnDuty, setIsDuty] = useState(false);

    const loadDetails = async () => {
        setName(await AsyncStorage.getItem('name'));
        setUsername(await AsyncStorage.getItem('username'));
    };

    const toggleSwitch = async () => {
        setIsDuty(!isOnDuty);
    };

    const backgroundServices = async() => {
        if (isOnDuty) {
            Geolocation.getCurrentPosition(async(position) => {
                const location = [position.coords.latitude, position.coords.longitude];
                await axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/update_location/', {
                    username,
                    latitude: location[0],
                    longitude: location[1],
                });
            }, error => {
                console.log(error);
            }, { enableHighAccuracy: false });
            await BackgroundService.start(updateLocation, {
                taskName: 'Location update',
                taskTitle: 'Location update',
                taskDesc: 'Location update',
            });
        } else {
            await BackgroundService.stop();
        }
    };

    useEffect(() => {
        loadDetails();
        backgroundServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnDuty]);

    return (
        <>
            <StatusBar backgroundColor={'#e48634'} />
            {sideBar && <SideBar sideBar={sideBar} setSideBar={setSideBar} navigation={navigation} />}
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setSideBar(!sideBar)}>
                        <Hamburger style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    <Text style={styles.userGreeting}>Hi, {name.split(' ')[0]}</Text>
                </View>

                <View style={styles.servicesContainer}>
                    <Text style={{ color: 'black', fontSize: 20 }}>On Duty</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}  // Customize the track color
                        thumbColor={isOnDuty ? '#f5dd4b' : '#f4f3f4'}      // Customize the thumb color
                        ios_backgroundColor="#3e3e3e"                      // Background color on iOS
                        onValueChange={toggleSwitch}                       // Toggle function
                        value={isOnDuty}                                  // Current state
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={{ color: 'white', fontSize: 20 }}>DEVELOPED BY INNOVATE X</Text>
                </View>
            </View>
        </>
    );
};

export default ProviderHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    menuIcon: {
        fontSize: 30,
        color: '#000',
    },
    userGreeting: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    servicesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    serviceButton: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,// for a subtle shadow effect
    },
    serviceImgaeContainer: {
        width: 120,
        height: 120,
        backgroundColor: '#f5f5f5',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        overflow: 'hidden',
        padding: 10,
        borderWidth: 2,
        borderColor: '#000',
    },
    serviceImgae: {
        width: '100%',
        height: '100%',
    },
    serviceText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FF8C00', // Orange color
        bottom: 0,
    },
});

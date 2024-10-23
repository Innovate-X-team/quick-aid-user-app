/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Switch, Alert, RefreshControl, ScrollView, Linking, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import BackgroundService from 'react-native-background-actions';
import Hamburger from '../../assets/Hamburger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideBar from './SideBar';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { isLocationEnabled } from 'react-native-android-location-enabler';
import messaging from '@react-native-firebase/messaging'
import Geolocation from '@react-native-community/geolocation';
import { WebView } from 'react-native-webview';
import axios from 'axios';


const updateLocation = async () => {
    const username = await AsyncStorage.getItem('username');
    Geolocation.watchPosition(async (position) => {
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
    const [refreshing, setRefreshing] = useState(false);
    const [username, setUsername] = useState(null);
    const [sideBar, setSideBar] = useState(false);
    const [name, setName] = useState('');
    const [isOnDuty, setIsDuty] = useState(false);
    const [isOnWork, setIsOnWork] = useState(false);
    const [task, setTask] = useState(null);

    const requestLocation = async () => {
        const checkEnabled = await isLocationEnabled();
        if (!checkEnabled) {
            await promptForEnableLocationIfNeeded();
        }
    };

    const loadDetails = async () => {
        const user = await AsyncStorage.getItem('username')
        setName(await AsyncStorage.getItem('name'));
        setUsername(user);
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/is_onduty/',{
            username
        }).then(response=> {
            setIsDuty(response.data.on_duty)
        })
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/get_assigned_task/', {
            username: user,
        }).then((response) => {
            if (response.status === 200) {
                setTask(response.data.data);
            }
        }).catch((error) => {
            Alert.alert('Failed to load details');
        });
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadDetails();
        // Simulate a network request (e.g., fetching new data)
        setTimeout(() => {
            setRefreshing(false); // Stop refreshing after a delay
        }, 2000); // Mock delay of 2 seconds
    }, []);

    const toggleSwitch = async () => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/onduty_toggle/`, {
            username,
            on_duty: !isOnDuty,
        }).then((response) => {
            if (response.status === 200) {
                setIsDuty(!isOnDuty);
            }
        }).catch((error) => {
            Alert.alert('Failed to update status');
        });
    };

    const backgroundServices = async () => {
        if (isOnDuty) {
            try {
                await requestLocation();
            } catch (error) {
                Alert.alert('This app requires location permission to run.');
                return;
            }
            Geolocation.getCurrentPosition(async (position) => {
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
    }, [username]);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          loadDetails();
        });
    
        return unsubscribe;
      }, []);

    return (
        <>
            <StatusBar backgroundColor={'#e48634'} />
            {sideBar && <SideBar sideBar={sideBar} setSideBar={setSideBar} navigation={navigation} />}
            <View style={styles.container} RefreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
                <View>
                    {
                        task && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ color: 'black', fontSize: 30, margin: 10 }}>Current Task: {task.task_name}</Text>
                                <View style={styles.taskContainer}>
                                    <View>
                                        <Text style={{ color: 'black', fontSize: 25 }}>{task.consumer.name}</Text>
                                        <Text style={{ color: 'black', fontSize: 18, margin: 5 }}>{task.task.location_name}</Text>
                                    </View>
                                    <View style={{ width: '100%', height: 200 }} onPress={()=>{}}>
                                        <TouchableWithoutFeedback onPress={()=> {
                                            Linking.openURL(`https://www.google.com/maps?q=${task.task.latitude},${task.task.longitude}`)
                                        }}>
                                        <WebView
                                            source={{ uri: `https://www.openstreetmap.org/export/embed.html?bbox=${task.task.longitude - 0.00005},${task.task.latitude - 0.00005},${task.task.longitude + 0.00005},${task.task.latitude + 0.00005}&layer=mapnik&marker=${task.task.latitude},${task.task.longitude}` }}
                                            style={{ height: 200, width: '100%', flex: 1 }}
                                            javaScriptEnabled={true}
                                            domStorageEnabled={true}
                                            startInLoadingState={false}
                                            scalesPageToFit={true}
                                            originWhitelist={['*']}
                                        />
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={[styles.button, { borderBottomLeftRadius: 10 }]}
                                            onPress={() => {
                                                Linking.openURL(`tel:${task.consumer.phone_number}`)
                                            }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 18 }}>Call</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, { borderBottomRightRadius: 10 }]}
                                            onPress={()=> {
                                                if(!isOnWork){
                                                    axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/accept_task/', {
                                                        username,
                                                        task_id: task.task.id
                                                    }).then(response=> {
                                                        if(response.status === 200){
                                                            setIsOnWork(true)
                                                        }
                                                    }).catch(error=>{
                                                        Alert.alert(error.response.data.error)
                                                    })
                                                }
                                                else{
                                                    axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/complete_task/', {
                                                        task_id: task.task.id
                                                    }).then(response=> {
                                                        if(response.status === 200){
                                                            setIsOnWork(false)
                                                            loadDetails()
                                                        }
                                                    }).catch(error=>{
                                                        Alert.alert(error.response.data.error)
                                                    })
                                                }
                                            }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 18 }}>{isOnWork ? 'End Task' : 'Accept'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
    },
    taskContainer: {
        elevation: 2,
        backgroundColor: '#f2efe9',
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        width: 500,
        height: 300,
        backgroundColor: '#f2efe9',
        alignSelf: 'stretch'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#FF8C00', // Orange color
        padding: 10,
        margin: 0,
        borderWidth: 0,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FF8C00', // Orange color
        bottom: 0,
    },
});

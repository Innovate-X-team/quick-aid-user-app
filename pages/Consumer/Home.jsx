/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, PermissionsAndroid, Linking, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Hamburger from '../../assets/Hamburger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideBar from './SideBar';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { isLocationEnabled } from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import * as Location from 'react-native-geolocation-service';
import axios from 'axios';


const ConsumerHome = ({ navigation }) => {
  const [sideBar, setSideBar] = useState(false);
  const [name, setName] = useState('');
  // const [location, setLocation] = useState([]);

  const requestLocation = async() => {
    const checkEnabled = await isLocationEnabled();
    if(!checkEnabled) {
      await promptForEnableLocationIfNeeded();
    }
  };

  const ambulanceService = async() => {
    try{
      await requestLocation();
    }catch(error) {
      Alert.alert('This app requires location permission to run.');
      return;
    }
    Geolocation.getCurrentPosition(async(position) => {
      const location = [position.coords.latitude, position.coords.longitude];
      await axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/ambulance_service/',{
        latitude: location[0],
        longitude: location[1],
      });
    },
    (error)=> {
      console.log(error);
    }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000});
  };

  const loadDetails = async () => {
    setName(await AsyncStorage.getItem('name'));
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'#e48634'} />
      {sideBar && <SideBar sideBar={sideBar} setSideBar={setSideBar} navigation={navigation} />}
      <View style={styles.container}>
        <Image style={styles.waterMark} source={require('../../assets/logo.png')} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSideBar(!sideBar)}>
            <Hamburger style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={styles.userGreeting}>Hi, {name.split(' ')[0]}</Text>
        </View>

        <View style={styles.servicesContainer}>
          <TouchableOpacity style={styles.serviceButton}>
            <View style={styles.serviceImgaeContainer}>
              <Image source={require('../../assets/women-safety.png')} style={styles.serviceImgae} />
            </View>
            <Text style={styles.serviceText}>Women's Safety</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton}>
            <View style={styles.serviceImgaeContainer}>
              <Image source={require('../../assets/child-protection.png')} style={styles.serviceImgae} />
            </View>
            <Text style={styles.serviceText}>Child Protection</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton} onPress={ambulanceService}>
            <View style={styles.serviceImgaeContainer}>
              <Image source={require('../../assets/Ambulance.png')} style={styles.serviceImgae} />
            </View>
            <Text style={styles.serviceText}>Ambulance Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton}>
            <View style={styles.serviceImgaeContainer}>
              <Image source={require('../../assets/fire-safety.png')} style={styles.serviceImgae} />
            </View>
            <Text style={styles.serviceText}>Fire Safety Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton}>
            <View style={styles.serviceImgaeContainer}>
              <Image source={require('../../assets/police.png')} style={styles.serviceImgae} />
            </View>
            <Text style={styles.serviceText}>Police Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton}>
            <View style={styles.serviceImgaeContainer}>
              <Image source={require('../../assets/NDRF.png')} style={styles.serviceImgae} />
            </View>
            <Text style={styles.serviceText}>NDRF Team</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={{ color: 'white', fontSize: 20 }}>DEVELOPED BY INNOVATE X</Text>
        </View>
      </View>
    </>
  );
};

export default ConsumerHome;

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
    backgroundColor: '#fff',
    //   padding: 20,
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
    backgroundColor: 'transparent',
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

/* eslint-disable react-native/no-inline-styles */
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './homeStyle';
import Profile from '../assets/profile-user';
import Police from '../assets/Police';
import Ambulance from '../assets/Ambulance';
import Fire from '../assets/Fire';
import Electricity from '../assets/Electricity';
import Water from '../assets/Water';
import Garbage from '../assets/Garbage';
import { callPolice, callAmbulance, callFireBregade } from '../actions/callFunctions';

const Home = ({ navigation, setIsLogedIn }) => {
  const emergencyServies = [
    {
      title: 'Police Depertment',
      icon: <Police style={{ width: 100, height: 100 }} />,
      function: ()=>callPolice(),
    },
    {
      title: 'Ambulance',
      icon: <Ambulance style={{ width: 100, height: 100 }} />,
      function: ()=>callAmbulance(),
    },
    {
      title: 'Fire Depertment',
      icon: <Fire style={{ width: 100, height: 100 }} />,
      function: ()=>callFireBregade(),
    },
  ];
  const otherServies = [
    {
      title: 'Electricity',
      icon: <Electricity style={{ width: 90, height: 90 }} />,
    },
    {
      title: 'Water',
      icon: <Water style={{ width: 100, height: 100 }} />,
    },
    {
      title: 'Garbage',
      icon: <Garbage style={{ width: 100, height: 100 }} />,
    },
  ];

  return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Emergency Connect</Text>
        <TouchableOpacity onPress={()=> navigation.push('Profile')}>
          <Profile style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.headerText2}>Emergency Services</Text>
        <FlatList
          data={emergencyServies}
          renderItem={({item}) => <TouchableOpacity
            style={styles.card}
            onPress={item.function}
          >
            <View>
              {item.icon}
            </View>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
          }
          keyExtractor={item => item.title}
          horizontal={true}
        />
      </View>
      <View>
        <Text style={styles.headerText2}>Other Services</Text>
        <FlatList
          data={otherServies}
          renderItem={({item}) => <View style={styles.card}>
            <View>
              {item.icon}
            </View>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
          }
          keyExtractor={item => item.title}
          horizontal={true}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem('JWT');
            // console.logKC(props)
            setIsLogedIn(false);
          }}
        >
          <Text style={{ color: '#000', fontSize: 30 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

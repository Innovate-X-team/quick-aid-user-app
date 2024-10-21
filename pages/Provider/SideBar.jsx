/* eslint-disable react-native/no-inline-styles */
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React,{useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideBar = ({ sideBar, setSideBar, navigation }) => {
  const [username, setUsername] = useState('');
  const handleLogOut = async()=>{
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('userType');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const loadDetails = async() => setUsername(AsyncStorage.getItem('username'));

  useEffect(()=> {
    loadDetails();
  },[]);
  return (
    <Modal visible={sideBar} transparent={true}>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => setSideBar(false)}>
        <TouchableWithoutFeedback style={styles.container} onPress={() => { }}>
          <View style={styles.mainContainer}>
            <View style={{ backgroundColor: '#d54436', borderTopEndRadius: 50, borderEndEndRadius: 50, padding: 10, width: 250, margin: 10, marginLeft: 0 }}>
              <Text style={{ fontSize: 25 }}>@{username}</Text>
            </View>
            <TouchableOpacity onPress={handleLogOut}>
            <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold', margin: 10 }}>LOGOUT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
            setSideBar(false);
            navigation.navigate('AboutTeam');
          }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', margin: 10 }}>ABOUT INNOVATE X TEAM</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
    </Modal >
  );
};

export default SideBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    width: 300,
    borderEndEndRadius: 20,
    borderTopEndRadius: 20,
    top: 30,
    backgroundColor: '#e48634',
    paddingVertical: 10,
  },
});

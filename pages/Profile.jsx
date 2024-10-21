import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');

  return (
    <View>
        <View>
            <Text>Name: <Text>{name}</Text></Text>
        </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

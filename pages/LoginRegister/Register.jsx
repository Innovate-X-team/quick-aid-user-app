import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const UserType = () => {
  return (
    <View style={styles.container}>
        <View style={styles.logoContailer}>
            <Image source={require('../../assets/logo.png')} style={{height: 150, width:120}} />
            <View>
                <Text style={styles.appName}>Quick Aid&nbsp;</Text>
                <Text style={styles.teamName}>-Made By Innovate X </Text>
            </View>
        </View>
      <Text>Login</Text>
      <Image style={styles.footerImage} source={require('../../assets/footer-image.png')} />
    </View>
  );
};

export default UserType;

const styles = StyleSheet.create({
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
    footerImage: {
        width: '110%',
        position: 'absolute',
        bottom: 0,
        left: '1.2%',
        resizeMode: 'cover',
    },
});

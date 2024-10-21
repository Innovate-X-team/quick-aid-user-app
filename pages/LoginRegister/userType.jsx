import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const UserType = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Image style={styles.waterMark} source={require('../../assets/logo.png')} />
        <View style={styles.logoContailer}>
            <View>
                <Text style={styles.appName}>Quick Aid&nbsp;</Text>
                <Text style={styles.teamName}>-Made By Innovate X </Text>
            </View>
        </View>
      <View style={styles.serviceTypeContainer}>
        <TouchableOpacity style={styles.serviceTypeButton} onPress={()=>navigation.push('registerConsumer')}>
            <Text style={styles.serviceTypeText}>Service Consumer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceTypeButton} onPress={()=>navigation.push('registerProvider')}>
            <Text style={styles.serviceTypeText}>Service Provider</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity> */}
      </View>
      <Image style={styles.footerImage} source={require('../../assets/footer-image.png')} />
    </View>
  );
};

export default UserType;

const styles = StyleSheet.create({
    waterMark: {
        height: 500,
        width: 500,
        position: 'absolute',
        alignSelf: 'center',
        opacity: 0.3,
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
    serviceTypeContainer: {
        position: 'absolute',
        width: '100%',
        top: '40%',
        transform: 'translateY(-50%)',
        alignSelf: 'center',
    },
    serviceTypeButton: {
        padding: 25,
        backgroundColor: '#18acd1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    serviceTypeText: {
        fontSize: 30,
        color: 'white',
    },
    continueButton: {
        padding: 8,
        backgroundColor: '#18acd1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    continueText: {
        fontSize: 30,
        color: 'white',
    },
    footerImage: {
        width: '110%',
        position: 'absolute',
        bottom: 0,
        left: '1.2%',
        resizeMode: 'cover',
    },
});

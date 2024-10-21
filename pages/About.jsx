/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const teamData = [
    { name: 'Sayan Biswas', role: 'Full Stack Developer', image: 'https://media.licdn.com/dms/image/v2/D5603AQEstd1h2jaN3Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1676548041787?e=1734566400&v=beta&t=BB_86ue7Z0s1Xwv0eRCwiUfktxoAnjfayL4mo0pM4G0', linkedin: 'https://www.linkedin.com/in/sayan-biswas-coder' },
    { name: 'Jeesu Pal', role: 'UI/UX Designer', image: 'https://media.licdn.com/dms/image/v2/D4E03AQGtfEXWyYqn2w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721569848500?e=1734566400&v=beta&t=OrXXBwK8wR0F44L7iqgkZu_bqF3XCSigYnZ-Na40Ors', linkedin: 'https://www.linkedin.com/in/jeesu-pal' },
    { name: 'Soumalya Middey', role: 'Backend Developer', image: 'https://media.licdn.com/dms/image/v2/D4E03AQFoBpc_VRwAfA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1720276711705?e=1734566400&v=beta&t=6jKQN3MuslD2uRgSITfh0VZxVjjaG6nhvezNM0Bx1fs', linkedin: 'https://www.linkedin.com/in/soumalya-middey-292a60317' },
    { name: 'Bitan Sarkar', role: 'Backend Developer', image: 'https://media.licdn.com/dms/image/v2/D4D03AQFVzY1YWor0WQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719915817058?e=1734566400&v=beta&t=dx_HrCjkHsLbKQv5Jbo7wSUOsLiw0FXnn4sSvqoRXEE', linkedin: 'https://www.linkedin.com/in/bitan-sarkar-5580712b6' },
    { name: 'Mridul Howlader', role: 'Backend Developer', image: 'https://media.licdn.com/dms/image/v2/D4D03AQFntDHN05aeHA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721833925677?e=1734566400&v=beta&t=Hn61F9Sgn-C_hHpXQMi3yggjObuR4R0SJZ4xsum8yCw', linkedin: 'https://www.linkedin.com/in/mridul-howlader-75846931b' },
];

const About = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.headerText}>ABOUT INNOVATE X TEAM</Text>

            {/* Team Members */}
            <View style={styles.membersContainer}>
                {teamData.map((member, index) => (
                    <TouchableOpacity key={index} style={styles.memberContainer} onPress={() => Linking.openURL(member.linkedin)} >
                        <Image source={{ uri: member.image }} style={styles.memberImage} />
                        <View style={{ backgroundColor: '#e48634', borderRadius: 50, padding: 10, alignItems: 'center' }}>
                            <Text style={styles.memberName}>{member.name}</Text>
                            <Text style={styles.memberRole}>{member.role}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={{ color: 'black', textAlign: 'center' }}>*Click on the profiles to see linkedin profiles of members.</Text>

            {/* Button to return to home */}
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.push('Home')}>
                <Text style={styles.homeButtonText}>RETURN TO HOME</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>DEVELOPED BY INNOVATE X</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#fff',
        flexWrap: 'wrap',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF4500',
        marginBottom: 20,
    },
    membersContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    memberContainer: {
        alignItems: 'center',
        marginVertical: 10,
        width: '40%',
    },
    memberImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: -10,
        zIndex: 100,
        borderWidth: 2,
        borderColor: '#e48634',
    },
    memberName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    memberRole: {
        fontSize: 14,
        color: '#fff',
    },
    homeButton: {
        backgroundColor: '#00BFFF',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginVertical: 20,
    },
    homeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#e48634',
        width: '100%',
        alignItems: 'center',
        padding: 15,
    },
    footerText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default About;

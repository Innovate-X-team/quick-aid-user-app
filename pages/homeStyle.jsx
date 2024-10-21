import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E9E9E9',
        height: '100%',
        width: '100%',
    },
    header: {
        backgroundColor: '#81F5FA',
        width: '100%',
        height: '12%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
    },
    headerText2: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
        marginTop: 10,
    },
    card: {
        flex: 1,
        height: 170,
        width: 250,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        margin: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
    },
    cardText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
});


export default styles;


/**
 * @format
 */

import { AppRegistry, Linking } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import axios from 'axios';

messaging().setBackgroundMessageHandler(async ({data}) => {
    console.log('Message handled in the background!', data);
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
    await notifee.displayNotification({
        title: data.title,
        body: data.body,
        data: data,
        android: {
            channelId, // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            sound: 'hollow',
            pressAction: {
                id: 'default',
            },
            actions: [
                {
                    title: 'Open Map',
                    pressAction: { id: 'map' },
                },
                {
                    title: 'Accept',
                    pressAction: { id: 'accept' },
                },
            ],
        },
    });
});
notifee.onBackgroundEvent(async ({ type, detail })=> {
    const { notification, pressAction } = detail;

    if (type === EventType.ACTION_PRESS && pressAction.id === 'map') {
        Linking.openURL(`https://www.google.com/maps?q=${notification.data.latitude},${notification.data.longitude}`);
    }
    if (type === EventType.ACTION_PRESS && pressAction.id === 'accept') {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/accept_task/', {
            username: notification.data.username,
            task_id: notification.data.task.id,
        });
    }
});

AppRegistry.registerComponent(appName, () => App);

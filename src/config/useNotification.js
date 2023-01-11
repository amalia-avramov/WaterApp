import * as Notifications from 'expo-notifications';
import {Platform} from "react-native";
import * as Device from 'expo-device';

export async function schedulePushNotification() {
    const notification = await Notifications.scheduleNotificationAsync({
        content: {
            title: "Stay Hydrated: Time to Drink Water 💧",
            body: 'Take a break and drink a glass of water now. ' +
                'You are on your way to achieve your hydration goal! ' +
                'Also add your progress in the WaterApp!',
            data: {data: 'goes here'},
        },
        trigger: {
            seconds: 60,
            repeats: true
        },
    });

    await Notifications.cancelScheduledNotificationAsync(identifier);
}

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}


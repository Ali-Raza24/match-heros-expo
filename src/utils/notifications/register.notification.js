import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export const registerForPushNotificationAsync = async () => {

    const { status: existingStatus } = await Notifications.requestPermissionsAsync({});
    let finalStatus = existingStatus;
    // const token = (await Notifications.getExpoPushTokenAsync()).data;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    const token = (await Notifications.getExpoPushTokenAsync({ projectId: "97baa1cb-d003-40ec-889d-38fe3e851508", experienceId: "@raza_ali81", })).data;

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            enableLights: false
        });
    }

    return token;

}
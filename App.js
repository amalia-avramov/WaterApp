import {createStackNavigator} from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import Start from "./src/screens/Start";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-native-paper";
import {theme} from "./src/components/theme";
import ForgotPassword from "./src/screens/ForgotPassword";
import {useAuth} from "./src/config/useAuth";
import * as Notifications from 'expo-notifications';
import {useEffect, useRef, useState} from "react";
import {registerForPushNotificationsAsync, schedulePushNotification} from "./src/config/useNotification";


const Stack = createStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const {user} = useAuth();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };

    }, []);


    return (
        <Provider theme={theme}>
            {user ?
                (<NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='Home'
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Home" component={Home}/>
                        <Stack.Screen name="Login" component={Login}/>
                    </Stack.Navigator>
                </NavigationContainer>)
                : (<NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='Start'
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Start" component={Start}/>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Register" component={Register}/>
                        <Stack.Screen name="Home" component={Home}/>
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    </Stack.Navigator>
                </NavigationContainer>)}
        </Provider>
    )
}


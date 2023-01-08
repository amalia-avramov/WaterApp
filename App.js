// noinspection UnnecessaryLocalVariableJS

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


const Stack = createStackNavigator();

export default function App() {
    const {user} = useAuth();
    console.log(user)
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
                        <Stack.Screen name={'Home'} component={Home}/>
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


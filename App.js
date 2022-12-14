// noinspection UnnecessaryLocalVariableJS

import {createStackNavigator} from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import Start from "./src/screens/Start";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-native-paper";
import {theme} from "./src/components/theme";



const Stack=createStackNavigator();

export default function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="StartScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Start" component={Start} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

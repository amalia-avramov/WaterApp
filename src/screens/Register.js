import React from 'react'
import RegisterStep2 from "./RegisterStep2";
import RegisterStep1 from "./RegisterStep1";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

function Register() {
    return (
        <Stack.Navigator initialRouteName="RegisterStep1"
                         screenOptions={{
                             headerShown: false,
                         }}>
            <Stack.Screen name="RegisterStep1" component={RegisterStep1}/>
            <Stack.Screen name="RegisterStep2" component={RegisterStep2}/>
        </Stack.Navigator>
    );
}

export default Register;

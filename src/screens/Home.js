import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {EvilIcons, FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import DrinkTracker from "./DrinkTracker";
import {Historical} from "./Historical";
import {Profile} from "./Profile";


const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator
            initialRouteName='DrinkTracker'
            screenOptions={({route}) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'DrinkTracker') {
                        return <MaterialIcons name="local-drink" size={size} color={color} />
                    } else if (route.name === 'Historical') {
                        return <FontAwesome name="history" size={size} color={color} />
                    } else if(route.name === 'Profile'){
                        return <EvilIcons name='user' size={size} color={color} />
                    }

                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Historical" component={Historical}/>
            <Tab.Screen name="DrinkTracker" component={DrinkTracker}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>

    );
}


import React from 'react';
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import DrinkTracker from "../components/DrinkTracker";
import {useAuth} from "../config/useAuth";
import firebase from "firebase/compat";


export default function Home({navigation, route}) {
    const {user} = useAuth();

    return (
        <Background>
            <Header>Let’s start </Header>
            <DrinkTracker/>
            <Button
                mode="outlined"
                onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Start'}],
                    })
                }
            >
                Logout
            </Button>
        </Background>
    );
}


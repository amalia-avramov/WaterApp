import React from 'react';
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import DrinkTracker from "../components/DrinkTracker";

export default function Home({navigation, route}) {
    const {name} = route.params;

    return (
        <Background>
            <Header>Let’s start {name}</Header>
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


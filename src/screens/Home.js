import React from 'react';
import {Text} from 'react-native';
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import auth from "firebase/compat";


export default function Home({navigation}) {
    return (
        <Background>
            <Header>Let’s start</Header>
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


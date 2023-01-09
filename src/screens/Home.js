import React from 'react';
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import DrinkTracker from "../components/DrinkTracker";
import {useAuth} from "../config/useAuth";
import {getAuth, signOut} from "firebase/auth";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import app from "../config/firebase";

const auth = getAuth();


export default function Home({navigation, route}) {




    return (
        <Background>
            <Header>Let’s start </Header>
            <DrinkTracker/>
            <Button
                mode="outlined"
                onPress={() => {
                    signOut(auth).then(r => console.log(r));
                    navigation.navigate('Start')
                }}
            >
                Logout
            </Button>
        </Background>
    );
}


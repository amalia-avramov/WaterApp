import React from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import {ImageBackground, StyleSheet, View} from "react-native";
import {theme} from "../components/theme";

export default function Start({navigation}) {
    return (
        <ImageBackground
            source={require('../../assets/bg3.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Header>WaterApp</Header>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Login')}
                >
                    Login
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('Register')}
                >
                    Sign Up
                </Button>
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
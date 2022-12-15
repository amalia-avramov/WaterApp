import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Text} from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import {theme} from '../components/theme'
import {getAuth} from "firebase/auth";
import app from "../config/firebase";

const auth = getAuth(app);

function Register({navigation}) {
    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Header>Create Account</Header>
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

export default Register;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})

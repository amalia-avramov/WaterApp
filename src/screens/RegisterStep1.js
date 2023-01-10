import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Text} from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import {theme} from '../components/theme'
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import app from "../config/firebase";
import {AntDesign} from "@expo/vector-icons";
import Paragraph from "../components/Paragraph";


function RegisterStep1({navigation}) {
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({value: '', error: ''})
    const [rePassword, setRePassword] = useState({value: '', error: ''})

    function emailValidator(email) {
        const re = /\S+@\S+\.\S+/
        if (!email) return "Email can't be empty."
        if (!re.test(email)) return 'Ooops! We need a valid email address.'
        return ''
    }

    function passwordValidator(password) {
        if (!password) return "Password can't be empty."
        if (password.length < 8) return 'Password must be at least 8 characters long.'
        return ''
    }

    function rePasswordValidator(password, rePassword) {
        if (password !== rePassword) return "Password mismatch"
        return ''
    }

    async function onSignUpPressed() {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        const rePasswordError = rePasswordValidator(password.value, rePassword.value)
        if (emailError || passwordError || rePasswordError) {
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            setRePassword({...rePassword, error: rePasswordError})
            return
        }
        try {
            navigation.navigate('Register', {screen: 'RegisterStep2', params: {email: email.value, password: password.value}})
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Header>Create Account</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({value: text, error: ''})}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({value: text, error: ''})}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <TextInput
                label="Password again"
                returnKeyType="done"
                value={rePassword.value}
                onChangeText={(text) => setRePassword({value: text, error: ''})}
                error={!!rePassword.error}
                errorText={rePassword.error}
                secureTextEntry
            />
            <View style={styles.row}>
                <Paragraph>Already have an account?</Paragraph>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
            <AntDesign name="arrowright" size={24} color="black" style={styles.arrow}
                       onPress={onSignUpPressed}
            />
        </Background>
    )
}

export default RegisterStep1;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    arrow: {
        alignSelf: 'flex-end',
        top: 20,
        left: 4,
    }
})

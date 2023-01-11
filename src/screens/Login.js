import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import {theme} from "../components/theme";
import Button from "../components/Button";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import app from "../config/firebase";
import {schedulePushNotification} from "../config/useNotification";


const auth = getAuth(app);

function Login({navigation}) {
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({value: '', error: ''})

    function emailValidator(email) {
        const re = /\S+@\S+\.\S+/
        if (!email) return "Email can't be empty."
        if (!re.test(email)) return 'Ooops! We need a valid email address.'
        return ''
    }

    function passwordValidator(password) {
        if (!password) return "Password can't be empty."
        if (password.length < 5) return 'Password must be at least 5 characters long.'
        return ''
    }

    async function onLoginPressed() {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            return
        }
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value);
            navigation.navigate('Home', {screen:'DrinkTracker'});
        } catch (error) {
            setEmail(email.error)
        }

        await schedulePushNotification();
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Header>Welcome!</Header>
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
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Text style={{color: 'red'}}>
                {email.error}
                </Text>
            <Button mode="contained" onPress={onLoginPressed}>
                Login
            </Button>
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('Register')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

export default Login;

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 50,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginLeft: 5,
    },
})
import React, {useState} from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import app from "../config/firebase";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import alert from "react-native-web/dist/exports/Alert";

const auth = getAuth(app);

function ForgotPasswordScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleResetPassword = async () => {
        // Validate email
        if (!email) {
            alert('Please enter your email.');
            return;
        }
        try {
            // Send request to Firebase to reset password with the email provided
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Reset email was sent successfully.');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                });
            // If successful, navigate to Home screen
            navigation.navigate('Login');
        } catch (error) {
            // If unsuccessful, display an error message
            alert(error.message);
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Text style={styles.text}>Forgot Password</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Reset Password" onPress={handleResetPassword}/>
        </Background>
    );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 12,
    },
})
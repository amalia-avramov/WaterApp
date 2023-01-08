import React, { useState } from 'react';
import { Button } from 'react-native';
import app from "../config/firebase";
import {getAuth} from "firebase/auth";
import Background from "../components/Background";
import Paragraph from "../components/Paragraph";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";

const auth= getAuth(app);
function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleResetPassword = async () => {
        // Validate email
        if (!email) {
            alert('Please enter your email.');
            return;
        }

        // Validate new password and confirm new password
        if (!newPassword || !confirmNewPassword) {
            alert('Please enter and confirm your new password.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert('The new password and confirm new password fields do not match.');
            return;
        }

        try {
            // Send request to Firebase to reset password with the email provided
            await auth.sendPasswordResetEmail(email);

            // If successful, navigate to Home screen
            navigation.navigate('Home');
        } catch (error) {
            // If unsuccessful, display an error message
            alert(error.message);
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Paragraph>Forgot Password</Paragraph>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
            />
            <TextInput
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry={true}
            />
            <Button title="Reset Password" onPress={handleResetPassword} />
        </Background>
    );
}

export default ForgotPasswordScreen;
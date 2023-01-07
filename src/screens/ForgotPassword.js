import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { auth } from 'react-native-firebase';
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
            await auth().sendPasswordResetEmail(email);

            // If successful, navigate to Home screen
            navigation.navigate('Home');
        } catch (error) {
            // If unsuccessful, display an error message
            alert(error.message);
        }
    };

    return (
        <View>
            <Text>Forgot Password</Text>
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
        </View>
    );
}

export default ForgotPasswordScreen;
import BackButton from "../components/BackButton";
import React from "@types/react";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import {useState} from "react";
import DatePicker from "react-native-date-picker";

function Register2({navigation}) {
    const [firstName, setFirstName] = useState({value: '', error: ''});
    const [lastName, setLastName] = useState({value: '', error: ''});
    const [weight, setWeight] = useState({value: 0, error: ''});

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <TextInput
                label="First Name"
                returnKeyType="next"
                value={firstName.value}
                onChangeText={(text) => setFirstName({value: text, error: ''})}
                error={!!firstName.error}
                errorText={firstName.error}
                autoCapitalize
            />
            <TextInput
                label="Last Name"
                returnKeyType="next"
                value={lastName.value}
                onChangeText={(text) => setLastName({value: text, error: ''})}
                error={!!lastName.error}
                errorText={lastName.error}
                autoCapitalize
            />
            <TextInput
                label="Weight"
                returnKeyType="next"
                value={weight.value}
                onChangeText={(text) => setWeight({value: text, error: ''})}
                error={!!weight.error}
                errorText={weight.error}
                autoCapitalize
                keyboardType="number-pad"
            />
            <DatePicker date={new Date(2022,12,22)}/>
        </Background>);
}

export default Register2;
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import React, {useState} from "react";
import {Button} from "react-native";
import DatePicker from "react-native-modern-datepicker";

function RegisterStep2({navigation}) {
    const [firstName, setFirstName] = useState({value: '', error: ''});
    const [lastName, setLastName] = useState({value: '', error: ''});
    const [weight, setWeight] = useState({value: 0, error: ''});
    const [selectedDate, setSelectedDate] = useState('');
    const [open, setOpen] = useState(false)

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
                label="Weight (Kg)"
                returnKeyType="next"
                value={weight.value}
                onChangeText={(text) => setWeight({value: text, error: ''})}
                error={!!weight.error}
                errorText={weight.error}
                autoCapitalize
                keyboardType="number-pad"
            />
            <TextInput
                label={'Date of birth'}
                value={selectedDate}
            />
            <Button title="Select your birth date" onPress={() => setOpen(true)} />
            {open && <DatePicker
                mode={'calendar'}
                onSelectedChange={(date) => {
                    setOpen(false)
                    setSelectedDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />}
        </Background>);
}

export default RegisterStep2;
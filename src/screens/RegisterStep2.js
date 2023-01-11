import BackButton from "../components/BackButton";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import React, {useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import app from "../config/firebase"
import {AntDesign, Fontisto} from "@expo/vector-icons";

const db = getFirestore(app);

function RegisterStep2({navigation, route}) {
    const {email, password} = route.params;
    const [firstName, setFirstName] = useState({value: '', error: ''});
    const [lastName, setLastName] = useState({value: '', error: ''});
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState({value: 0, error: ''});
    const [selectedDate, setSelectedDate] = useState('');
    const [open, setOpen] = useState(false);

    const [color, setColor] = useState('black');
    const [color2, setColor2] = useState('black');

    const [pressed, setPressed] = useState(false);
    const [pressed2, setPressed2] = useState(false);

    async function writeToDataBase() {
       try {
            const newDoc = await addDoc(collection(db, 'users'), {
                email: email,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                weight: weight,
                dateOfBirth: selectedDate,
            });
            navigation.navigate('Register', {
                screen: 'RegisterStep3', params: {
                    email: email,
                    password: password,
                    dateOfBirth: selectedDate,
                    weight: weight.value,
                    docRef: newDoc
                }
            })

       } catch (err) {
           console.error("writeToDB failed. reason :", err)
       }
    }

    function onButtonPressed(numb) {
        if (numb === 1) {
            setPressed(true);
            setPressed2(false);
            setColor('pink');
            setColor2('black');}
        else if(numb === 0){
            setPressed(false);
            setPressed2(true);
            setColor('black');
            setColor2('blue');
        }
    }


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
            />
            <TextInput
                label="Last Name"
                returnKeyType="next"
                value={lastName.value}
                onChangeText={(text) => setLastName({value: text, error: ''})}
                error={!!lastName.error}
                errorText={lastName.error}
            />
            <Text style={styles.text}>Gender</Text>
            <View style={styles.genderContainer}>
                <Fontisto name="female" size={48} color={color} onPress={() => {setGender("female"); setPressed(true);onButtonPressed(1)}}
                          style={{marginRight: 20}}/>
                <Fontisto name="male" size={48} color={color2} onPress={() => {setGender("male"); setPressed2(true);onButtonPressed(0)}}
                          style={{marginLeft: 20}}/>
            </View>
            <TextInput
                label="Weight (Kg)"
                returnKeyType="done"
                value={weight.value}
                onChangeText={(text) => setWeight({value: text, error: ''})}
                error={!!weight.error}
                errorText={weight.error}
                keyboardType="number-pad"
            />
            <TextInput
                label={'Date of birth'}
                value={selectedDate}
            />
            <Button title="Select your birth date" onPress={() => setOpen(true)}/>
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
            <View style={styles.arrow}>
                <AntDesign name="arrowright" size={24} color="black"  onPress={writeToDataBase}/>
            </View>
        </Background>);
}

export default RegisterStep2;

const styles = StyleSheet.create({
    arrow: {
        alignSelf: 'flex-end',
        top: 40,
        left: 4,
    },
    text: {
        textAlign: 'left',
    },
    genderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    }
})
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import React, {useEffect, useState} from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {updateDoc} from "firebase/firestore";
import app from "../config/firebase";
import moment from "moment";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import DatePicker from "react-native-modern-datepicker";
import {Text} from "react-native-paper";
import {theme} from "../components/theme";
import {AntDesign} from "@expo/vector-icons";

const auth = getAuth(app);

function RegisterStep3({navigation, route}) {

    const {dateOfBirth, weight, email, password, docRef} = route.params;
    const [drinkingWater, setDrinkingWater] = useState(0);
    const [recommendedIntake, setRecommendedIntake] = useState(0);
    const [wakingTime, setWakingTime] = useState("");
    const [sleepingTime, setSleepingTime] = useState("");
    const [openTimePicker1, setOpenTimePicker1] = useState(false)
    const [openTimePicker2, setOpenTimePicker2] = useState(false)
    const [changeWaterIntake, setChangeWaterIntake] = useState(false);
    const [isNoPress, setIsNoPress] = useState(false)

    const age = moment().diff(dateOfBirth, 'years');

    useEffect(() => {
        calculateRecommendedIntake()
    })

    const calculateRecommendedIntake = () => {
        const weightInLbs = weight * 2.2046;
        // Calculate recommended water intake based on age and weight
        let recommendedIntake;
        if (age < 18) {
            // Children: Recommended intake = weight (in lbs) x 0.7
            recommendedIntake = weightInLbs * 0.7;
        } else if (age < 65) {
            // Adults: Recommended intake = weight (in lbs) x 0.6
            recommendedIntake = weightInLbs * 0.6;
        } else {
            // Seniors: Recommended intake = weight (in lbs) x 0.5
            recommendedIntake = weightInLbs * 0.5;
        }

        //Transform fl oz in l
        recommendedIntake = (recommendedIntake * 29.6) / 1000;

        setRecommendedIntake(Math.round(recommendedIntake * 10) / 10);
    };

    async function updateUserData() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error)
        }
        await updateDoc(docRef, {
            "age": age,
            "drinkingWater": drinkingWater === 0 ? recommendedIntake : drinkingWater,
            "mlConsumed": 0,
            "wakingTime": wakingTime,
            "sleepingTime": sleepingTime
        })
        navigation.navigate('Home', {screen: 'DrinkTracker'})
    }

    function calcWakingTime(time) {
        setWakingTime(time);
        setOpenTimePicker1(false)
    }

    function calcSleepingTime(time) {
        setSleepingTime(time);
        setOpenTimePicker2(false)
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Text style={styles.text}>Your age: {age} years</Text>
            <Text style={styles.text}>Your weight: {weight} kg</Text>
            <Text style={styles.text}>Recommended Water Intake: {recommendedIntake} L</Text>
            {!isNoPress && <Text style={styles.text}>Do you want to drink more/less water?</Text>}
            {!isNoPress && <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5
            }}>
                <AntDesign name="checkcircleo" style={{marginRight: 15}} size={48}
                           onPress={() => {
                               setChangeWaterIntake(true)
                               setIsNoPress(true)
                           }}/>
                <AntDesign name='closecircleo' style={{marginLeft: 15}} size={48}
                           onPress={() => setIsNoPress(true)}/>
            </View>}
            {changeWaterIntake && <TextInput
                label="How much do you want to drink"
                returnKeyType="done"
                value={drinkingWater}
                onChangeText={(text) => setDrinkingWater(text)}
                keyboardType="number-pad"
            />}
            <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.text}>When do you start your day?</Text>
                    <Text style={styles.values}>{wakingTime}</Text>
                </View>
                <TouchableOpacity onPress={() => setOpenTimePicker1(true)}>
                    <Text style={styles.link}>Select time</Text>
                </TouchableOpacity>
                {openTimePicker1 && <DatePicker mode='time' minuteInterval={5} onTimeChange={calcWakingTime}/>}
            </View>

            <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.text}>When do you go to sleep?</Text>
                    <Text style={styles.values}>{sleepingTime}</Text>
                </View>
                <TouchableOpacity onPress={() => setOpenTimePicker2(true)}>
                    <Text style={styles.link}>Select time</Text>
                </TouchableOpacity>
                {openTimePicker2 && <DatePicker mode='time' minuteInterval={5} onTimeChange={calcSleepingTime}/>}
            </View>
            <Button
                mode="contained"
                style={{marginTop: 24}}
                onPress={updateUserData}
            >
                Register
            </Button>
        </Background>
    );
}

export default RegisterStep3;

const styles = StyleSheet.create({
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
        margin: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 21,
        textAlign: 'left',
        margin: 10,
    },
    values:{
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 21,
        textAlign: 'left',
        margin: 10,
        color: theme.colors.primary
    }
})
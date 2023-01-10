import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import React, {useEffect, useState} from "react";
import Background from "../components/Background";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import {Image, StyleSheet, View} from "react-native";
import {BaseButton} from "react-native-gesture-handler";
import {getFirestore, updateDoc} from "firebase/firestore";
import app from "../config/firebase";
import moment from "moment";
import TimeInput from "@tighten/react-native-time-input";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

function RegisterStep3({navigation, route}) {

    const {dateOfBirth, weight, email, password,docRef} = route.params;
    const [drinkingWater, setDrinkingWater] = useState(0);
    const [recommendedIntake, setRecommendedIntake] = useState(0);
    const [wakingTime,setWakingTime] = useState("");
    const [sleepingTime,setSleepingTime] = useState("");

    const age = moment().diff(dateOfBirth, 'years');

    useEffect(()=>{
        calculateRecommendedIntake()
    })

    const calculateRecommendedIntake = () => {
        // Calculate recommended water intake based on age and weight
        let recommendedIntake = 0;
        if (age < 18) {
            // Children: Recommended intake = weight (in kg) x 0.7
            recommendedIntake = weight * 0.7;
        } else if (age < 65) {
            // Adults: Recommended intake = weight (in kg) x 0.6
            recommendedIntake = weight * 0.6;
        } else {
            // Seniors: Recommended intake = weight (in kg) x 0.5
            recommendedIntake = weight * 0.5;
        }

        recommendedIntake = recommendedIntake / 10;

        setRecommendedIntake(Math.round(recommendedIntake * 10) / 20);
    };

    async function updateUserData() {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateDoc(docRef, {
            "age": age,
            "drinkingWater": drinkingWater,
            "mlConsumed": 0,
        })
        navigation.navigate('Home', {screen: 'DrinkTracker'})

    }

    function calcWakingTime(time) {
        setWakingTime(time.toString);
    }

    function calcSleepingTime(time) {
        setSleepingTime(time.toString);
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Paragraph>Your age: {age} years</Paragraph>
            <Paragraph>Your weight: {weight} kg</Paragraph>
            <Paragraph>Recommended Water Intake: {recommendedIntake} L</Paragraph>
            <Paragraph>How much water do you want to drink in a day?</Paragraph>
            <TextInput
                label="Water that drink in a day"
                returnKeyType="next"
                value={drinkingWater}
                onChangeText={(text) => setDrinkingWater(text)}
                keyboardType="number-pad"
            />
           {/* <Paragraph>Do you want to drink more or less water?</Paragraph>*/}
           {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <BaseButton onPress={() => setMoreOrLess('less')}>
                    <Image source={require('../../assets/less.jpg')} style={styles.image}/>
                </BaseButton>
                <BaseButton onPress={() => setMoreOrLess('more')}>
                    <Image source={require('../../assets/greater.jpg')} style={styles.image}/>
                </BaseButton>
            </View>

            <View>
                <Paragraph>When do you start your day?</Paragraph>
                <TimeInput onTimeChange={calcWakingTime}></TimeInput>
            </View>

            <View>
                <Paragraph>When do you go to sleep?</Paragraph>
                <TimeInput onTimeChange={calcSleepingTime}></TimeInput>
            </View>
            <Button
                title={''}
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
    image: {
        width: 60,
        height: 60,
        margin: 20,
    },
    sliderContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
    }
})
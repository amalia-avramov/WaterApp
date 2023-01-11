import React, {useEffect, useState} from 'react';
import {Dimensions, KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import TextInput from "../components/TextInput";
import {arrayUnion, collection, doc, getDocs, getFirestore, updateDoc} from 'firebase/firestore'
import app from "../config/firebase";
import {useAuth} from "../config/useAuth";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import {schedulePushNotification} from "../config/useNotification";


const db = getFirestore(app);

const DrinkTracker = () => {
    const {user} = useAuth();
    const [mlConsumed, setMlConsumed] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [currentUser, setCurrentUser] = useState({});

    const fetchPost = async () => {
        await getDocs(collection(db, "users"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                const newCurrentUser = newData.find((u) => u.email === user.email)
                setCurrentUser(newCurrentUser);
            })
    }

    useEffect(() => {
        fetchPost().then(r => console.log('Fetch user Data'));
    }, [user, mlConsumed, setMlConsumed])

    const updateMlConsumed = async () => {
        setMlConsumed(Number(inputValue));
        const docRef = doc(db, "users", currentUser.id);
        setInputValue('');
        let date = new Date().getDate(); //To get the Current Date
        let month = new Date().getMonth() + 1; //To get the Current Month
        let year = new Date().getFullYear(); //To get the Current Year
        let hours = new Date().getHours(); //Current Hours
        let min = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()//Current Minutes

        const newTime = hours + ':' + min
        const newDate = (month < 10 ? "0" + month : month) + '/' + (date < 10 ? "0" + date : date) + '/' + year;

        await updateDoc(docRef, {
            mlConsumed: currentUser.mlConsumed + Number(inputValue),
            drinkTracker: arrayUnion({
                date: newDate,
                time: newTime,
                mlTracking: Number(inputValue)
            })
        })
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.text}>Milliliters consumed: {currentUser.mlConsumed}</Text>
            <View style={styles.progressBarContainer}>
                <View
                    style={[styles.fill, {height: `${(currentUser.mlConsumed / (currentUser.drinkingWater * 1000)) * 100}%`}]}>
                    <Text style={styles.progressText}>{currentUser.mlConsumed}</Text>
                </View>
                <View style={styles.empty}/>
            </View>
            <TextInput
                placeholder="Enter milliliters consumed"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="number-pad"
                returnKeyType="done"
                style={{marginHorizontal: 50}}
            />
            <Button
                mode="outlined"
                onPress={updateMlConsumed}
            >Submit</Button>
            {(currentUser.mlConsumed >= currentUser.drinkingWater * 1000) &&
                <Paragraph>Your goal was reached!</Paragraph>}

        </KeyboardAvoidingView>


    );
}

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 30,
    },
    progressBarContainer: {
        width: 80,
        height: windowHeight / 4,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ddd',
        overflow: 'hidden',
        position: 'relative',
        transform: [{rotate: "180deg"}]
    },
    fill: {
        backgroundColor: '#6baafd',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        backgroundColor: '#ddd',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    progressText: {
        color: 'white',
        transform: [{rotate: "180deg"}]
    },
});

export default DrinkTracker;
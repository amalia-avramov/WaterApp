import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextInput from "../components/TextInput";
import {collection, getDocs, getFirestore, doc, updateDoc} from 'firebase/firestore'
import app from "../config/firebase";
import {useAuth} from "../config/useAuth";
import Background from "../components/Background";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const db = getFirestore(app);

const DrinkTracker = () => {
    const {user} = useAuth();
    const [mlConsumed, setMlConsumed] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [time, setTime] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const [data, setData] = useState({})

    const fetchPost = async () => {
        await getDocs(collection(db, "users"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                const newCurrentUser = newData.find((u) => u.email === user.email)
                setCurrentUser(newCurrentUser);
                console.log(currentUser)
            })

    }

    useEffect(() => {
        fetchPost().catch((error) => console.log(error))
    }, [user, mlConsumed])

    const updateMlConsumed = async () => {
        setMlConsumed(mlConsumed + Number(inputValue));
        setInputValue('');
        const docRef=doc(db, "users", currentUser.id);
        setTimeout(async () => await updateDoc(docRef, {
            mlConsumed: mlConsumed
        }), 1000);

        let hours = new Date().getHours(); //Current Hours
        let min = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()//Current Minutes

        const newTime =
            hours + ':' + min
        time.push(newTime)
    }


    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.text}>Milliliters consumed: {mlConsumed}</Text>
                <View style={styles.progressBarContainer}>
                    <View
                        style={[styles.fill, {height: `${(mlConsumed / (currentUser.drinkingWater * 1000)) * 100}%`}]}>
                        <Text style={styles.progressText}>{mlConsumed}</Text>
                    </View>
                    <View style={styles.empty}/>
                </View>
                <TextInput
                    placeholder="Enter milliliters consumed"
                    value={inputValue}
                    onChangeText={setInputValue}
                    keyboardType="numeric"
                />
                <Button
                    mode="contained"
                    onPress={updateMlConsumed}
                >Submit</Button>
                {(mlConsumed > currentUser.drinkingWater * 1000) &&
                    <Paragraph>Your goal was reached!</Paragraph>}
                <View>
                    {time.map((item, index) => (
                        <Text style={styles.text} key={index}>{item}</Text>
                    ))}
                </View>
            </View>
        </Background>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    progressBarContainer: {
        width: 100,
        height: 300,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ddd',
        overflow: 'hidden',
        position: 'relative',
        transform: [{rotate: "180deg"}]
    },
    fill: {
        backgroundColor: 'blue',
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
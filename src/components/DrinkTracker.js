import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import TextInput from "./TextInput";
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import app from "../config/firebase";
import {useAuth} from "../config/useAuth";
const db = getFirestore(app);

const DrinkTracker = () => {
    const {user} = useAuth();
    const [mlConsumed, setMlConsumed] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [time, setTime] = useState([]);
    const [currentUser,setCurrentUser] = useState({})

    const fetchPost = async () => {
        await getDocs(collection(db, "users"))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map(doc=> doc.data());
                const newCurrentUser= newData.find((u)=> user.email===u.email);
                setCurrentUser(newCurrentUser);
                console.log(newData);
                console.log(currentUser)
            })

    }
    
    const updateMlConsumed = async () => {
        fetchPost();
        setMlConsumed(mlConsumed + Number(inputValue));
        setInputValue('');
        let hours = new Date().getHours(); //Current Hours
        let min = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()//Current Minutes

        const newTime =
            hours + ':' + min
        time.push(newTime)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Milliliters consumed: {mlConsumed}</Text>
            <View style={styles.progressBarContainer}>
                <View style={[styles.fill, {height: `${(mlConsumed / (currentUser.drinkingWater * 1000)) * 100}%`}]}>
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
                title="Submit"
                onPress={updateMlConsumed}
            />
            <View>
                {time.map((item,index) => (
                    <Text style={styles.text} key={index}>{item}</Text>
                ))}
            </View>
        </View>
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
    },
});

export default DrinkTracker;
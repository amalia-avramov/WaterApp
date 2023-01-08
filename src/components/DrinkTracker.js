import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import TextInput from "./TextInput";
import {getDoc} from 'firebase/firestore'

const DrinkTracker = () => {
    const [mlConsumed, setMlConsumed] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [time, setTime] = useState([]);


    const updateMlConsumed = async () => {
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
                <View style={styles.empty}/>
                <View style={[styles.fill, {height: `${mlConsumed / 2000 * 100}%`}]}>
                    <Text style={styles.progressText}>{mlConsumed}</Text>
                </View>
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
                {time.map((item) => (
                    <Text style={styles.text}>{item}</Text>
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
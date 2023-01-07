import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const DrinkTracker = () => {
    const [mlConsumed, setMlConsumed] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const updateMlConsumed = () => {
        setMlConsumed(mlConsumed + Number(inputValue));
        setInputValue('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Milliliters consumed: {mlConsumed}</Text>
            <View style={styles.progressBarContainer}>
                <View style={[styles.fill, { height: `${mlConsumed / 2000 * 100}%` }]}>
                    <Text style={styles.progressText}>{mlConsumed}</Text>
                </View>
                <View style={styles.empty} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter milliliters consumed"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
            />
            <Button
                title="Submit"
                onPress={updateMlConsumed}
            />
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
        height: '100%',
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
        height: '100%',
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
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
});

export default DrinkTracker;
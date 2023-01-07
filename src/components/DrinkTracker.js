import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const DrinkTracker = () => {
    const [mlConsumed, setMlConsumed] = useState(0);

    const updateMlConsumed = (ml) => {
        setMlConsumed(ml);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Milliliters consumed: {mlConsumed}</Text>
            <View style={styles.progressBar}>
                <View style={[styles.fill, { width: `${mlConsumed / 2000 * 100}%` }]} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter milliliters consumed"
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
    progressBar: {
        width: '80%',
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ddd',
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: 'blue',
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
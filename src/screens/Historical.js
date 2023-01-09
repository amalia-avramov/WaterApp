import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import Background from "../components/Background";
import {useAuth} from "../config/useAuth";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import app from "../config/firebase";
import {FontAwesome5} from "@expo/vector-icons";


const db = getFirestore(app);

export function Historical() {
    const {user} = useAuth();
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const fetchPost = async () => {
            await getDocs(collection(db, "users"))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({...doc.data(), id: doc.id}));
                    const newCurrentUser = newData.find((u) => u.email === user.email)
                    setCurrentUser(newCurrentUser);

                })
        }
        setTimeout(() => fetchPost().catch((error) => console.log(error)), 1000);
    }, [user])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={currentUser.drinkTracker}
                    renderItem={({item}) => <Item item={item}/>}
                />
            </SafeAreaView>
        </Background>);
}

function Item({item}) {
    return (
        <View style={styles.listItem}>
            <FontAwesome5 name="glass-whiskey" size={24} color="black"/>
            <View>
                <Text style={styles.text}>Tracking time: {item.time}</Text>
                <Text style={styles.text}>Tracking ml: {item.mlTracking}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        marginLeft: 8,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#70a6ee',
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 10
    },
    listItem: {
        display: 'flex',
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "80%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 5
    }
})

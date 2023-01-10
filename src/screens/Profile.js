import {getAuth, signOut} from "firebase/auth";
import app from "../config/firebase";
import {AntDesign} from "@expo/vector-icons";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {useAuth} from "../config/useAuth";
import {useEffect, useState} from "react";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {theme} from "../components/theme";

const auth = getAuth(app);
const db = getFirestore(app);

export function Profile({navigation}) {
    const {user} = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [weight, setWeight] = useState(0);
    const [drinkingWater, setDrinkingWater] = useState(0);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            await getDocs(collection(db, "users"))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({...doc.data(), id: doc.id}));
                    const newCurrentUser = newData.find((u) => u.email === user.email);
                    setFirstName(newCurrentUser.firstName.value);
                    setLastName(newCurrentUser.lastName.value);
                    setEmail(newCurrentUser.email);
                    setDateOfBirth(newCurrentUser.dateOfBirth);
                    setDrinkingWater(newCurrentUser.drinkingWater);
                    setWeight(newCurrentUser.weight.value);
                    setGender(newCurrentUser.gender)
                })
        }
        fetchPost().catch((error) => console.log(error));
    }, [user])

    return (
        <View>

            <View style={{backgroundColor: '#6baafd', height: 100}}>
                <View style={{margin: 10, alignItems: 'flex-end'}}>
                    <AntDesign name="logout" size={32} color="black"
                               onPress={() => {
                                   signOut(auth).then(r => console.log(r));
                                   setTimeout(() => {
                                       navigation.navigate('Start')
                                   }, 1000);
                               }}

                    />
                </View>
            </View>
            <View style={{marginTop: -30, alignItems: 'center'}}>
                <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 30
                }}>
                    <AntDesign name="user" size={48} color="black"/>
                </View>
            </View>
            <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.name}>{firstName}</Text>
                <Text style={styles.name}>{lastName}</Text>
            </View>
            <TouchableWithoutFeedback>
                <View style={styles.mainCardView}>
                    <View style={{flexDirection: 'column'}}>
                        <Text
                            style={styles.text}>
                            Email: {email}
                        </Text>
                        <Text
                            style={styles.text}>
                            Weight: {weight}
                        </Text>
                        <Text
                            style={styles.text}>
                            Date of birth: {dateOfBirth}
                        </Text>
                        <Text
                            style={styles.text}>
                            Goal: {drinkingWater}L
                        </Text>
                        <Text
                            style={styles.text}>
                            Gender: {gender}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={{backgroundColor: '#6baafd', borderRadius:25, width:50, height:50, alignItems: 'center', marginLeft:'auto'}}>
                <AntDesign name='edit' size={24} style={{margin:10}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 21,
        textAlign: 'left',
        marginHorizontal: 5,
        marginVertical: 10,
        color: theme.colors.primary
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainCardView: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: "#eaeaea",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        marginTop: 6,
        marginBottom: 20,
        marginLeft: 16,
        marginRight: 16,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 10,
    }
})
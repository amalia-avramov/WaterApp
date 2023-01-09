import {getAuth, signOut} from "firebase/auth";
import app from "../config/firebase";
import {AntDesign} from "@expo/vector-icons";
import {ScrollView, View} from "react-native";
import {useAuth} from "../config/useAuth";
import {useEffect, useState} from "react";
import {collection, getDocs, getFirestore} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export function Profile({navigation}) {
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
    console.log(currentUser.lastName)
    return (
        <View>
            <ScrollView>
                <View style={{backgroundColor: '#6baafd', height: 100}}>
                    <View style={{margin:10, alignItems: 'flex-end'}}>
                    <AntDesign name="logout" size={32} color="black"
                               onPress={() => {
                                   signOut(auth).then(r => console.log(r));
                                   navigation.navigate('Start')
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
                <View style={{alignItems:'center'}}>{}</View>
            </ScrollView>
        </View>
    )
}
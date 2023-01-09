import Background from "../components/Background";
import {getAuth, signOut} from "firebase/auth";
import app from "../config/firebase";
import {AntDesign} from "@expo/vector-icons";

const auth = getAuth(app);

export function Profile({navigation}) {
    return (
        <Background>
            <AntDesign name="logout" size={24} color="black"
                       onPress={() => {
                           signOut(auth).then(r => console.log(r));
                           navigation.navigate('Start')
                       }}

            />
        </Background>
    )
}
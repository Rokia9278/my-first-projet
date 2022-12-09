import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native-web";
import {auth, db} from '../../firebase/auth';
import {createUserWithEmailAndPassword} from '@firebase/auth';
import {collection, addDoc} from 'firebase/firestore';

export default function Register(){
    const[ email, setEmail]=useStater('')
    const[pwd, setPwd]=useStater('')
    const[name, setName]=useStater('')
    const handleRegister = async()=> {
        createUserWithEmailAndPassword(auth, email,pwd)
        .then( async userCredentials => {
            const currentUser=userCredentials.user;
            const docUser = await addDoc(collection(db, "users"),{
                userId: currentUser.uid,
                name: name,
                email: currentUser.email,
            })
            console.log('Registered with:',currentUser);
            alert('Registered')
        })
        .catch(error=>alert(error.message))
    }
    return(
        <View style={styles.container}>
            <StatusBar style="light"/>
            <View style={{
                flexDirection: 'column'
            }}>
                <Text style={{
                    fontSize: 90,
                    color: 'white',
                }}>Register</Text>
            </View>
            <View style={{
                margin: 40
            }}>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        margin: 10
                    }}
                    onChanngeText={setName}
                    value={name}
                    placehoder="votre Non">

                </TextInput>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        margin: 10
                    }}
                    onChanngeText={setEmail}
                    value={email}
                    placehoder="votre Email">

                </TextInput>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        margin: 10
                    }}
                    onChanngeText={setPwd}
                    value={pwd}
                    placehoder="votre mot de passe ! ">

                </TextInput>
                <TouchhableOpacity
                    style={{
                        alignItems: "center",
                        backgroundColor: "#97DFC3",
                        padding: 10,
                        borderRadius: 20,
                        width: 130,
                        alignSelf: 'center'
                    }}
                    onPress={()=> handleRegister()}
                    >
                        <Text>create account</Text>

                </TouchhableOpacity>
            </View>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8CF1B4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
});


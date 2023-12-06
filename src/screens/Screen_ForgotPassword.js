import React,{useState, useEffect} from 'react';
import ip from './IPaddress'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, TextInput, Pressable, Alert } from 'react-native';


export default function Screen_ForgotPassword({ navigation, route }) {


    const [UserId, setUserId] = useState('')

    const onHandleUserIdChange = (value)=>{
        setUserId(value)
    }

    
    // useEffect(()=>{
        
        const forgotPassword = async()=>{
        let url = `http://${ip}:3000/forgotpassword`
        if(UserId.length===0){
            return
        }
        // else 
        let userId = UserId;
        try {

            let response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({userId})
            })
            response = await response.json();
            
            if(response.success === true){
                // navigation.navigate('Screen_EnterPasswordResetCode')
                console.log("mail sent ig")
            }
            else if(response.success===false){
                // console.log("invalid user")
                Alert.alert("Invalid user","User does not exist")
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <>
            <View style={styles.body}>

                <Text style={styles.heading_text}>Forgot Password</Text>

                <View style={styles.UsernameInputBoxView}>
                 
                    <TextInput onChangeText={(value) => onHandleUserIdChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='Enter your userId' placeholderTextColor={'black'} ></TextInput>
                </View>
                <Pressable onPress={forgotPassword}  style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]}>
                    <LinearGradient style={{borderRadius: 200}} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }} colors={['rgb(5, 214, 217)', 'rgb(249, 7, 252)']} >
                        <Text style={[styles.btntext, { textAlign: 'center' }]}> Submit</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    heading_text: {
        flex: 0.7,
        fontSize: 70,
        marginTop: '10%',
        marginBottom: '18%',
        fontWeight: '900',
        fontStyle: 'normal',
        color: 'gray'
    },
    body: {
        flex: 1,
        // width:'100%',
        // height: '100vh',
        // borderWidth: 4,
        // borderColor: 'red',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'start'
    },
    text: {

        margin: 0,
        // fontSize: 15,
        fontWeight: '500',
        color: 'black',
        textAlign: 'left'
    },
    btntext: {
        margin: '4%',
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textAlign: 'left'
    },
    loginBtn: {
        flex: 1,
        width: 300,
        height: 100,
        color: 'white',
        // borderRadius: 200,
        borderTopEndRadius: 100,
        borderBottomLeftRadius: 100,

        // justifyContent: 'center',
        // alignItems: 'center'
        marginTop: 0,
    },
    UsernameInputBoxView: {
        marginBottom: '0%',
        flex: 0.5,

    },

    UsernameInputBox: {
        width: 300,
        height: 50,
        fontSize: 20,
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 5,
    },
})
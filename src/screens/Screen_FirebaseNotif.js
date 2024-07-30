import React, { useState, PropsWithChildren, useEffect } from "react";
// import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Button,
    PermissionsAndroid,
    Platform,
    Alert,
    BackHandler
} from 'react-native';

import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging'

// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';

export default function Screen_FirebaseNotif({ navigation, route }) {


    function handleBackButtonClick() {
        navigation.navigate('Screen_Home');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    const [TitleText, setTitleText] = useState('');
    const [MessageText, setMessageText] = useState('');

    const onHandleTitleChange = (value) => {
        setTitleText(value);

    }
    const onHandleMessageChange = (value) => {
        setMessageText(value);
    }

    const GoToHomePage = () => {
        navigation.navigate('Screen_Home')
    }
    
    // useEffect(() => {

    const sendFCMNotifs = async () => {

        try {
            let url = `${ip}/sendFCM`
            if(TitleText.length===0 || MessageText.length===0){
                Alert.alert("Empty fields")
            }
            else{
            let notifData = {
                title: TitleText.trim(),
                body: MessageText.trim()
            }
            let response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(notifData)
            })
            // response = response.json();
            // console.log(response)
        }
        } catch (error) {
            
        }
            }
        
        
 

   

  

    
    useEffect(() => {
        
    

        async function Logged() {
            try {
                let url = `${ip}/verifyToken`
                const credentials = await Keychain.getGenericPassword();
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(credentials)
                })
        //    console.log(response.text())
                response = await response.json();
                
                if (response.success === true) {
                    navigation.navigate('Screen_Home')

                }
                else if (response.success === false) {

                }

            } catch (error) {
                // console.info(error)
            }
        }
        // Logged();

        
    }, [])


    // const [text, setText] = useState('');


    return (
        <>
            <View style={styles.body}>

                <Text style={styles.welcome_text}>Send Firebase notifs</Text>

                <View style={styles.UsernameInputBoxView}>
               
                    <TextInput onChangeText={(value) => onHandleTitleChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='Title' placeholderTextColor={'black'} ></TextInput>
                </View>

                <View style={styles.PasswordInputBoxView}>
           
                    <TextInput onChangeText={(value) => onHandleMessageChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder='Message' placeholderTextColor={'black'} ></TextInput>
                    {/* <Pressable onPress={goToForgotPasswordScreen} style={{ marginTop: 10 }}><Text style={[styles.text, { textAlign: 'right' }]}>Forgot password?</Text></Pressable> */}
                </View>

            


                <Pressable onPress={sendFCMNotifs} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]}>
                    {/* <LinearGradient style={styles.LG} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }} colors={['rgb(5, 214, 217)', 'rgb(249, 7, 252)']} > */}
                        <Text  style={[styles.btntext, { textAlign: 'center', color: 'black' }]}> Send</Text>
                    {/* </LinearGradient> */}
                </Pressable>
                <Pressable onPress={GoToHomePage} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]}>
                    {/* <LinearGradient style={styles.LG} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }} colors={['rgb(5, 214, 217)', 'rgb(249, 7, 252)']} > */}
                        <Text  style={[styles.btntext, { textAlign: 'center', color: 'black' }]}> Go back to Home page</Text>
                    {/* </LinearGradient> */}
                </Pressable>


           


            </View>
        </>
    )
}




const styles = StyleSheet.create({
    welcome_text: {
        flex: 2,
        fontSize: 70,
        marginTop: '10%',
        marginBottom: '1%',
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
    linkbeforetext: {
        margin: 0,
        fontSize: 20,
        fontWeight: '600',
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
    UsernameInputBoxView: {
        marginBottom: '8%',
        flex: 0.7,

    },
    PasswordInputBoxView: {
        marginBottom: '8%',
        flex: 0.7,
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
    PasswordInputBox: {
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
        marginBottom: 4,
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
        marginTop: '7',
        // marginBottom: '100'
    },
    LG: {
        borderRadius: 200,
    },
    bottomText: {
        flex: 0.6,
        marginTop: '0%',
        marginBottom: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        alignSelf: ''
    },
    linkColor: {
        color: 'red'
    }

});
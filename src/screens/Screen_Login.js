import React, { useState, PropsWithChildren, useEffect } from "react";
// import type { PropsWithChildren } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Button,
    PermissionsAndroid,
    Platform,
} from 'react-native';

import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging'

// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';

export default function Screen_Login({ navigation, route }) {

    const [UsernameText, setUsernameText] = useState('');
    const [PasswordText, setPasswordText] = useState('');

    const onHandleUsernameChange = (value) => {
        setUsernameText(value);

    }
    const onHandlePasswordChange = (value) => {
        setPasswordText(value);
    }

    const goToForgotPasswordScreen = () => {
        navigation.navigate('Screen_ForgotPassword')
    }
    const GoToRegistrationPage = () => {
        navigation.navigate('Screen_Registration')
    }
    // useEffect(() => {

        
        
        
    const createChannels = () => {
        PushNotification.createChannel({
            channelId: "test-channel",
            channelName: "Test Channel"
        },
            (created) => console.log("channel created")
        )
    }

    const NotificationPermission = () => { //this func is for requesting notification permission from user
        const checkApplicationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    );
                } catch (error) {
                }
            }
        };
        checkApplicationPermission();
    }

    const Login = async () => {

       
        try {
            
            await messaging().registerDeviceForRemoteMessages();
            const FcmDeviceToken = await messaging().getToken();
            // FcmDeviceToken = token
            // let url = 'http://192.168.0.103:3000/login'
   
        let url = `${ip}/login`
       console.log(FcmDeviceToken)
            const LoginData = {
                userId: UsernameText,
                password: PasswordText,
                FcmDeviceToken: FcmDeviceToken
            }
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },

                body: JSON.stringify(LoginData)
            })

           
            response = await response.json();
            if (response.success === true) {

                try {
                    const username = 'hey'
                    const password = response.token;
                    console.info("token is:" +response.token)
                    // await AsyncStorage.setItem('Token', response.token)
                    await Keychain.setGenericPassword(username, password)
                } catch (error) {
                    console.error(error)
                }
                
                console.log("here...homeeeeeeee")
                navigation.navigate('Screen_Home')
            }
            // console.log(response);
        } catch (error) {
            console.error(error)
        }
    }
    
    // let FcmDeviceToken = '';

    // const getDeviceToken = async () => {
        
    //     await messaging().registerDeviceForRemoteMessages();
    //     const token = await messaging().getToken();
    //     FcmDeviceToken = token
    //     // console.info("Device token is:" + )
    //     // save the token to the db
    //     let serverKey = 'AAAADz1-KfI:APA91bGJ-sKa3F15DexhEXHxHp_XWl4dEoC6HChxD6cJF42ad9RzvTj0K0KfxwCLLeAA54nWSGHwxN8ZYd2EIbBHztsXGu57ZG7jt-QKT8peIQYvyhMEWj03oX1kO2I0AYR8KVbs09gO'
    // }
   
    
    useEffect(() => {
        
        // getDeviceToken();
        NotificationPermission();
        createChannels();

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
        Logged();

        // Login();
    }, [])


    // const [text, setText] = useState('');


    return (
        <>
            <View style={styles.body}>

                <Text style={styles.welcome_text}>Welcome</Text>

                <View style={styles.UsernameInputBoxView}>
                    {/* <Text style={styles.text}>UserId</Text> */}
                    {/* onChangeText={(value) => setText(value)} */}
                    <TextInput onChangeText={(value) => onHandleUsernameChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='UserId' placeholderTextColor={'black'} ></TextInput>
                </View>

                <View style={styles.PasswordInputBoxView}>
                    {/* <Text style={styles.text}>Password</Text> */}
                    <TextInput onChangeText={(value) => onHandlePasswordChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder='Password' placeholderTextColor={'black'} ></TextInput>
                    <Pressable onPress={goToForgotPasswordScreen} style={{ marginTop: 10 }}><Text style={[styles.text, { textAlign: 'right' }]}>Forgot password?</Text></Pressable>
                </View>

                {/* <View>
                    <Text style={styles.text}>Confirm Password</Text>
                    <TextInput style={[styles.PasswordInputBox, { color: 'white' }]} editable placeholder='e.g: Harry' placeholderTextColor={'white'} onChangeText={(value) => setText(value)}></TextInput>
                </View> */}


                <Pressable onPress={Login} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]}>
                    <LinearGradient style={styles.LG} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }} colors={['rgb(5, 214, 217)', 'rgb(249, 7, 252)']} >
                        <Text style={[styles.btntext, { textAlign: 'center' }]}> Login</Text>
                    </LinearGradient>
                </Pressable>


                <View style={styles.bottomText}>
                    <Text style={[{ color: 'black' }]}>Don't have an account?</Text>
                    <Pressable onPress={GoToRegistrationPage}><Text style={styles.linkColor}>Create an account</Text></Pressable>

                </View>


            </View>
        </>
    )
}




const styles = StyleSheet.create({
    welcome_text: {
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
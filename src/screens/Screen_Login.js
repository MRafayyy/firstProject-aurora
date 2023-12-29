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
    Image,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Keyboard,
    BackHandler,
    Alert
} from 'react-native';

import HomeTabs from "../HomeTabs";
import Screen_Home from "./Screen_Home";

import { useTheme } from '@react-navigation/native';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging'

// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';
import { useConnectionStatus } from "../components/NoInternet";
// import { ScrollView } from "react-native-gesture-handler";

export default function Screen_Login({ navigation, route }) {

    const isConnected = useConnectionStatus();


    function handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    const [UsernameText, setUsernameText] = useState('');
    const [PasswordText, setPasswordText] = useState('');
    const [Loader, setLoader] = useState(false);
    const [UsernameError_msg, setUsernameError_msg] = useState(['']);
    const [PasswordError_msg, setPasswordError_msg] = useState(['']);

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



    let arr = [];

    const Login = async () => {

        !isConnected? Alert.alert('No Internet', 'Please connect to the internet'):

        // Keyboard.dismiss();
        arr = [];

        if (UsernameText.trim().length === 0 && PasswordText.trim().length === 0) {
            setUsernameError_msg(['User Id field cannot be empty'])
            setPasswordError_msg(['Password field cannot be empty'])
            return
        }
        else if (UsernameText.trim().length === 0) {
            setUsernameError_msg(['User Id field cannot be empty'])
            setPasswordError_msg([]);
            return
        }
        else if (PasswordText.trim().length === 0) {
            setPasswordError_msg(['Password field cannot be empty'])
            setUsernameError_msg([]);
            return
        }
        else {
            setUsernameError_msg([]);
            setPasswordError_msg([]);
        }







        try {
            // try {
            setLoader(true)
            await messaging().registerDeviceForRemoteMessages();
            const FcmDeviceToken = await messaging().getToken();
            // FcmDeviceToken = token
            // let url = 'http://192.168.0.103:3000/login'
            let url = `${ip}/login`
            // console.log(FcmDeviceToken)
            const LoginData = {
                userId: UsernameText.trim(),
                password: PasswordText.trim(),
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

            // } catch (error) {
            //     setLoader(false)
            //     Alert.alert("Could not get device token Error", 'Error may be generated if you are not connected to the internet', [{ style: 'cancel' }])
            // }



            if (response.success === true) {
                setLoader(true)
                try {
                    const username = 'hey'
                    const password = response.token;
                    console.info("token is:" + response.token)
                    // await AsyncStorage.setItem('Token', response.token)
                    await Keychain.setGenericPassword(username, password)
                } catch (error) {
                    setLoader(false)
                    console.error(error)
                    Alert.alert("Keychain Error", error, [{ style: 'cancel' }])
                }

                console.log("here...homeeeeeeee")

                navigation.navigate(HomeTabs, { screen: Screen_Home })
                setUsernameText('');
                setPasswordText('');
                setUsernameError_msg([])
                setPasswordError_msg([])
                setLoader(false)
            }

            else if (response.success === false) {
                Alert.alert("Invalid Error", response.reason, [{ style: 'cancel' }])
                setLoader(false)
            }

            else if (response.success === "FCMTokenError") {

                Alert.alert(response.success, response.reason, [{ style: 'cancel' }])
                setLoader(false)
            }
            else if (response.success === "SomeError") {

                Alert.alert(response.success, response.reason, [{ style: 'cancel' }])
                setLoader(false)
            }

            // console.log(response);
        } catch (error) {
            Alert.alert("System Error", error, [{ style: 'cancel' }])
            setLoader(false)
            console.error(error)
        }
    }


    useEffect(() => {
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
                    navigation.navigate(HomeTabs, { screen: Screen_Home })

                }
                else if (response.success === false) {

                }

            } catch (error) {
                // console.info(error)
            }
        }
        // Logged();

        // Login();
    }, [])



    return (
        <>
            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={{ flex: 1 }} >
                {/* <ScrollView> */}
                <View style={styles.body}>

                    <Image source={require('../../assets/images/login.jpg')} style={[{ width: responsiveWidth(100), height: responsiveHeight(40), resizeMode: 'cover', marginBottom: responsiveHeight(6) }]} />

                    {/* <Text style={styles.welcome_text}>Welcome</Text> */}

                    <View style={styles.UsernameInputBoxView}>
                        <TextInput editable={!Loader} value={UsernameText} onChangeText={(value) => onHandleUsernameChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} placeholder='User Id' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {UsernameError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                    </View>

                    <View style={styles.PasswordInputBoxView}>
                        <TextInput editable={!Loader} value={PasswordText} onChangeText={(value) => onHandlePasswordChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} placeholder='Password' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {PasswordError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                        <Pressable onPress={goToForgotPasswordScreen} style={{ marginTop: 10 }}><Text style={[styles.text, { textAlign: 'right' }]}>Forgot password?</Text></Pressable>
                    </View>




                    <Pressable onPress={Login} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]} disabled={Loader}>

                        {Loader ? <ActivityIndicator size='large' color="#fff" /> : <Text style={[styles.btntext, { textAlign: 'center' }]}> Login</Text>}
                    </Pressable>


                    <View style={styles.bottomText}>
                        <Text style={[{ color: 'black', fontSize: responsiveFontSize(1.5) }]}>Don't have an account?</Text>
                        <Pressable onPress={GoToRegistrationPage}><Text style={styles.linkColor}>Create an account</Text></Pressable>
                    </View>


                </View>
                {/* </ScrollView> */}
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </>
    )
}




const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontSize: responsiveFontSize(1.5),
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
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: 'white',
        textAlign: 'left'
    },

    UsernameInputBoxView: {
        marginBottom: responsiveHeight(4),

    },
    PasswordInputBoxView: {
        marginBottom: responsiveHeight(4),
    },

    UsernameInputBox: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
    },
    PasswordInputBox: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
        // marginBottom: responsiveHeight(1),
    },

    loginBtn: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        color: 'white',
        backgroundColor: '#0662bf',
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7',
    },

    bottomText: {
        marginTop: responsiveHeight(15),
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        alignSelf: '',

    },
    linkColor: {
        color: 'red',
        fontSize: responsiveFontSize(1.5)
    }

});
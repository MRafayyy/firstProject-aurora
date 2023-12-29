import React, { useState, useEffect } from 'react';
import ip from './IPaddress'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, TextInput, Pressable, Alert, Image, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import { useConnectionStatus } from "../components/NoInternet";


export default function Screen_ForgotPassword({ navigation, route }) {

    const isConnected = useConnectionStatus();

    const [EmailError_msg, setEmailError_msg] = useState(['']);
    const [Loader, setLoader] = useState(false);
    const [Email, setEmail] = useState('')

    const onHandleUserIdChange = (value) => {
        setUserId(value)
    }
    const onHandleEmailChange = (value) => {
        setEmail(value)
    }

    const backToLogin = () => {
        navigation.navigate('Screen_Login')
        setEmailError_msg([])
        setEmail('')
    }


    const validateEmail = () => {
        // !isConnected? Alert.alert('No Internet', 'Please connect to the internet'):
        setEmailError_msg([])
        if (Email.trim().length === 0) {
            setEmailError_msg(['Email field is empty'])
            setLoader(false)
            // return
        }

    }

    // useEffect(() => {

    //     validateEmail();

    // }, [Email])

    const forgotPassword = async () => {
        !isConnected? Alert.alert('No Internet', 'Please connect to the internet'):
        validateEmail();

        if (EmailError_msg.length === 0) {


            setLoader(true)
            let url = `${ip}/forgotpassword`
            // else 
            let email = Email;
            try {

                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                })
                response = await response.json();

                if (response.success === true) {
                    // navigation.navigate('Screen_EnterPasswordResetCode')
                    console.log("mail sent ig")
                    setLoader(false)
                    Alert.alert("Success", "Credentials have been sent to your email address",  [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        }],)
                }
                else if (response.success === false) {
                    // console.log("invalid user")
                    setLoader(false)
                    Alert.alert("Invalid email", "Email does not exist",  [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        }],)
                }

            } catch (error) {
                setLoader(false)
                console.log(error)
            }
        }
    }


    return (
        <>
            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={{ flex: 1 }} >
                {/* <ScrollView> */}
                <View style={styles.body}>

                    <Image source={require('../../assets/images/forgotpassword.jpg')} style={[{ width: responsiveWidth(100), height: responsiveHeight(40), resizeMode: 'cover', marginBottom: responsiveHeight(6) }]} />



                    <View style={styles.UsernameInputBoxView}>
                        <TextInput onChangeText={(value) => onHandleEmailChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='Enter your email' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {EmailError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                    </View>

                    {/* <View style={styles.PasswordInputBoxView}>
                    <TextInput onChangeText={(value) => onHandlePasswordChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder='Password' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                    {PasswordError_msg.map((value, index) => (
                        <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                    ))}
                    <Pressable onPress={goToForgotPasswordScreen} style={{ marginTop: 10 }}><Text style={[styles.text, { textAlign: 'right' }]}>Forgot password?</Text></Pressable>
                </View> */}




                    <Pressable onPress={forgotPassword} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100, marginBottom: responsiveHeight(4) }]} disabled={Loader}>

                        {Loader ? <ActivityIndicator size='large' color="#fff" /> : <Text style={[styles.btntext, { textAlign: 'center' }]}> Submit</Text>}
                    </Pressable>


                    <Pressable onPress={backToLogin} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]} disabled={Loader}>

                        <Text style={[styles.btntext, { textAlign: 'center' }]}>Back to login</Text>
                    </Pressable>


                    {/* <View style={styles.bottomText}>
                    <Text style={[{ color: 'black', fontSize: responsiveFontSize(1.5) }]}>Don't have an account?</Text>
                    <Pressable onPress={GoToRegistrationPage}><Text style={styles.linkColor}>Create an account</Text></Pressable>
                </View> */}


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
        justifyContent: 'flex-start'
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
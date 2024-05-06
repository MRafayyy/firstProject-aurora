import React, { useState, useEffect } from 'react';
import ip from './IPaddress'

import { StyleSheet, View, Text, TextInput, Pressable, Alert, Image, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import { useConnectionStatus } from "../components/NoInternet";
import GlobalStyles from '../utils/GlobalStyles';


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
                <View style={[GlobalStyles.body, {justifyContent: 'flex-start'}]}>

                    <Image source={require('../../assets/images/forgotpassword.jpg')} style={[{ width: responsiveWidth(100), height: responsiveHeight(40), resizeMode: 'cover', marginBottom: responsiveHeight(6) }]} />



                    <View style={GlobalStyles.UserPassInputBoxView}>
                        <TextInput onChangeText={(value) => onHandleEmailChange(value)} style={[GlobalStyles.UserPasswInputBox, { color: 'black' }]} editable placeholder='Enter your email' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {EmailError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                    </View>




                    <Pressable onPress={forgotPassword} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, GlobalStyles.loginBtn, { borderRadius: 100, marginBottom: responsiveHeight(4) }]} disabled={Loader}>
                        {Loader ? <ActivityIndicator size='large' color="#fff" /> : <Text style={[GlobalStyles.btntext, { textAlign: 'center' }]}> Submit</Text>}
                    </Pressable>


                    <Pressable onPress={backToLogin} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, GlobalStyles.loginBtn]} disabled={Loader}>
                        <Text style={[GlobalStyles.btntext]}>Back to login</Text>
                    </Pressable>




                </View>
                {/* </ScrollView> */}
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </>
    )
}




const styles = StyleSheet.create({



});
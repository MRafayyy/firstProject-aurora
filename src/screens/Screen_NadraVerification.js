import React, { useState, PropsWithChildren, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Button,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import ip from './IPaddress';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import { useConnectionStatus } from "../components/NoInternet";
import GlobalStyles from "../utils/GlobalStyles";


export default function Screen_NadraVerification({ navigation, route }) {

    const isConnected = useConnectionStatus();

    function handleBackButtonClick() {
        navigation.navigate('Screen_Registration');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);



    const userId = route.params;
    const hmm = userId;
    const [Loader, setLoader] = useState(false);

    const [nameText, setnameText] = useState('');
    const [Fathers_nameText, setFathers_nameText] = useState('');
    const [cnicText, setcnicText] = useState('');

    const [nameError_msg, setnameError_msg] = useState(['']);
    const [Fathers_nameError_msg, setFathers_nameError_msg] = useState(['']);
    const [cnicError_msg, setcnicError_msg] = useState(['']);

    const onHandleNameChange = (value) => {
        setnameText(value);

    }
    const onHandleFathersNameChange = (value) => {
        setFathers_nameText(value);


    }
    const onHandleCnicChange = (value) => {
        setcnicText(value);
    }


    let arr = [];

    const Verify = async () => {

        !isConnected? Alert.alert('No Internet', 'Please connect to the internet'):

        arr = [];

        if (nameText.trim().length === 0 && Fathers_nameText.trim().length === 0 && cnicText.trim().length === 0) {
            setnameError_msg(['name field cannot be empty'])
            setFathers_nameError_msg(["father's name field cannot be empty"])
            setcnicError_msg(['cnic field cannot be empty'])
            return
        }
        else if (nameText.trim().length === 0) {
            setnameError_msg(['name field cannot be empty'])
            setFathers_nameError_msg([]);
            setcnicError_msg([]);
            return
        }
        else if (Fathers_nameText.trim().length === 0) {
            setFathers_nameError_msg(["father's name field cannot be empty"])
            setnameError_msg([]);
            setcnicError_msg([]);
            return
        }
        else if (cnicText.trim().length === 0) {
            setcnicError_msg(['cnic field cannot be empty'])
            setnameError_msg([]);
            setFathers_nameError_msg([]);
            return
        }
        else {
            setFathers_nameError_msg([]);
            setnameError_msg([]);
            setcnicError_msg([]);
        }




        let url = `${ip}/VerifyNadraInfo`
        setLoader(true)
        try {

            const NadraData = {

                name: nameText.trim(),
                fathers_name: Fathers_nameText.trim(),
                cnic: parseInt(cnicText.trim()),
                gender: "female",
                userId: hmm.userId
            }
            // console.log(NadraData)
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },

                body: JSON.stringify(NadraData)
            })

            response = await response.json();

            if (response === true) {
                navigation.navigate('Screen_Login')
            }
            else {
                setLoader(false)
                Alert.alert("Invalid data")
            }
            console.log(response);

        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    return (
        <>
            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={{ flex: 1 }} >

                <View style={[GlobalStyles.body, {justifyContent: 'flex-start'}]}>
                    <Image source={require('../../assets/images/nadrav.jpg')} style={[{ width: responsiveWidth(80), height: responsiveHeight(35), resizeMode: 'contain', marginBottom: responsiveHeight(2) }]} />


                    <View style={styles.UsernameInputBoxView}>
                        <TextInput onChangeText={(value) => onHandleNameChange(value)} style={[GlobalStyles.UserPasswInputBox]} editable placeholder='Your name' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {nameError_msg.map((value, index) => (
                            <Text style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]} key={index}>{value}</Text>
                        ))}
                    </View>


                    <View style={styles.UsernameInputBoxView}>
                        <TextInput onChangeText={(value) => onHandleFathersNameChange(value)} style={[GlobalStyles.UserPasswInputBox]} editable placeholder="Father's name" placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {Fathers_nameError_msg.map((value, index) => (
                            <Text style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]} key={index}>{value}</Text>
                        ))}
                    </View>


                    <View style={[styles.PasswordInputBoxView]}>
                        <TextInput onChangeText={(value) => onHandleCnicChange(value)} style={[GlobalStyles.UserPasswInputBox]} editable placeholder='CNIC' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {cnicError_msg.map((value, index) => (
                            <Text style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]} key={index}>{value}</Text>
                        ))}
                    </View>



                    <Pressable onPress={Verify} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, GlobalStyles.loginBtn, {marginTop: responsiveHeight(6) }]} disabled={Loader}>
                        {Loader ? <ActivityIndicator size='large' color="#fff" /> : <Text style={[GlobalStyles.btntext]}> Verify</Text>}
                    </Pressable>




                </View>
            </KeyboardAvoidingView>
        </>
    )
}




const styles = StyleSheet.create({

});
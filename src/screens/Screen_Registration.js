import React, { useState, PropsWithChildren, useEffect } from "react";
// import type { PropsWithChildren } from 'react';
// import LinearGradient from 'react-native-linear-gradient';
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
    ScrollView,
    Dimensions,
    ActivityIndicator,
    Alert,
    BackHandler
} from 'react-native';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import ip from './IPaddress';

export default function Screen_Registration({ navigation, route }) {


    function handleBackButtonClick() {
        navigation.navigate('Screen_Login');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);


    let regex_email = /^[^\s@]+(?:@[^\s@]+(?:\.[^\s@]+)*)?$/
    let regex_specialchar = /(?=.*?[.#?!@$%^&*-])/
    let regex_numbers = /(?=.*?[0-9])/
    let regex_CapAlphabet = /(?=.*?[A-Z])/
    let regex_SmallAlphabet = /(?=.*?[a-z])/

    const GoToLoginPage = () => {
        setEmailText();
        setUsernameText();
        setPasswordText();
        setCPasswordText();

        setUsernameError_msg([]);
        setEmailError_msg([]);
        setPasswordError_msg([])
        setCPasswordError_msg([])
        navigation.navigate('Screen_Login')
    }

    // useEffect(()=>{


    const [EmailText, setEmailText] = useState('');
    const [UsernameText, setUsernameText] = useState('');
    // console.log(UsernameText.length)
    const [PasswordText, setPasswordText] = useState('');
    const [CPasswordText, setCPasswordText] = useState('');

    const [Loader, setLoader] = useState(false);

    const [EmailError_msg, setEmailError_msg] = useState(['']);
    const [UsernameError_msg, setUsernameError_msg] = useState(['']);
    const [PasswordError_msg, setPasswordError_msg] = useState(['']);
    const [CPasswordError_msg, setCPasswordError_msg] = useState(['']);

    const [isClicked, setisClicked] = useState(false)

    // },[])

    const onHandleEmailChange = (value) => {
        setEmailText(value);

    }

    const onHandleUsernameChange = (value) => {
        setUsernameText(value);
    }

    const onHandlePasswordChange = (value) => {
        setPasswordText(value);


    }
    const onHandleCPasswordChange = (value) => {
        setCPasswordText(value);
    }







    const Register = () => {



        setisClicked(true);

        //    validateFields();
        // useEffect(() => {
        // if (UsernameText.length !== 0 && EmailText.length !== 0 && PasswordText.length !== 0 && CPasswordText.length !== 0) {
        if (EmailError_msg.length === 0 && UsernameError_msg.length === 0 && PasswordError_msg.length === 0 && CPasswordError_msg.length === 0) {
            let url = `${ip}/register`
            setLoader(true)

            const SendRegistrationInfo = async () => {
                try {

                    const registrationData = {
                        userId: UsernameText,
                        email: EmailText,
                        password: PasswordText
                    }
                    let response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            "Content-Type": 'application/json'
                        },

                        body: JSON.stringify(registrationData)
                    })
                    // console.log(response)
                    response = await response.json();
                    console.log(response)

                    if (response === true) {
                        navigation.navigate('Screen_NadraVerification', { userId: UsernameText });
                        setLoader(false)

                    }
                    else {
                        setUsernameError_msg(['User Id or email already exists'])
                        setLoader(false)
                    }
                    // console.log(response);
                } catch (error) {
                    Alert.alert("Error", error)
                    setLoader(false)
                    console.log(error)
                }
            }

            SendRegistrationInfo();
        }
        // }

        // }, [EmailError_msg, UsernameError_msg, PasswordError_msg, CPasswordError_msg]);

    }
    useEffect(() => {

        let arr = [];

        const validateFields = () => {

            arr = [];

            // setUsernameError_msg([]);

            if (!UsernameText || UsernameText.trim().length === 0) {
                setUsernameError_msg(['UserId cannot be empty'])
            }
            else {
                if (!UsernameText || UsernameText.trim().length < 3 && UsernameText.trim().length !== 0) {
                    setUsernameError_msg(["length too short!"])

                }
                else {
                    setUsernameError_msg([]);

                }
            }


            if (!EmailText || EmailText.trim().length === 0) {
                setEmailError_msg(['Email cannot be empty'])
            }
            else if (!EmailText || EmailText.trim().length > 0) {

                if (!EmailText.match(regex_email)) {
                    setEmailError_msg(['Invalid email format'])
                }
                else {
                    setEmailError_msg([]);
                }
            }

            setPasswordError_msg([])

            if (!PasswordText || PasswordText.trim().length === 0) {


                arr.push('Password field cannot be empty')
                setPasswordError_msg(arr)

            }

            else if (!PasswordText || PasswordText.trim().length > 0) {


                if (!PasswordText.match(regex_numbers)) {
                    // setPasswordError_msg([...PasswordError_msg, "should contain a number"]) //wont work this way, use array then state
                    arr.push("must contain a number")

                }

                if (!PasswordText.match(regex_CapAlphabet)) {

                    arr.push("must contain a capital letter")

                }
                if (!PasswordText.match(regex_SmallAlphabet)) {

                    arr.push('must contain a small letter')

                }
                if (!PasswordText.match(regex_specialchar)) {

                    arr.push('must contain a special character')

                }

                setPasswordError_msg(arr)

            }


            if (!CPasswordText || CPasswordText.trim() !== PasswordText.trim()) {
                setCPasswordError_msg(['Passwords do not match'])
            }
            else {
                setCPasswordError_msg([])
            }


        }

        if (isClicked === true) {
            validateFields();
        }

    }, [UsernameText, EmailText, PasswordText, CPasswordText, isClicked])


    return (
        <>


            {/* <ScrollView  showsVerticalScrollIndicator={true} style={{flex:1}}> */}
            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={{ flex: 1 }} >
                <View style={styles.body}>

                    <Image source={require('../../assets/images/730_generated.jpg')} style={[{ width: responsiveWidth(100), height: responsiveHeight(40), resizeMode: 'cover' }]} />



                    <View style={styles.UsernameInputBoxView}>
                        <TextInput onChangeText={(value) => onHandleUsernameChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='User Id' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {UsernameError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                    </View>


                    <View style={styles.UsernameInputBoxView}>
                        <TextInput onChangeText={(value) => onHandleEmailChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='Email' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {EmailError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                    </View>


                    <View style={[styles.PasswordInputBoxView]}>
                        <TextInput onChangeText={(value) => onHandlePasswordChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder='Password' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {PasswordError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                    </View>


                    <View style={[styles.PasswordInputBoxView]}>
                        <TextInput onChangeText={(value) => onHandleCPasswordChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder='Confirm Password' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {CPasswordError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                    </View>


                    <Pressable onPress={Register} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]} disabled={Loader}>
                        {Loader ? <ActivityIndicator size='large' color="#fff" /> : <Text style={[styles.btntext, { textAlign: 'center' }]}> Register</Text>}
                    </Pressable>


                    <View style={styles.bottomText}>
                        <Text style={[{ color: 'black', fontSize: responsiveFontSize(1.5) }]}>Already have an account?</Text>
                        <Pressable onPress={GoToLoginPage} ><Text style={styles.linkColor}>Login</Text></Pressable>
                    </View>


                </View>
            </KeyboardAvoidingView>
            {/* </ScrollView> */}
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
        marginBottom: responsiveHeight(3),

    },
    PasswordInputBoxView: {
        marginBottom: responsiveHeight(3),
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
        // borderTopWidth: 1,
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
        marginTop: responsiveHeight(2),
    },

    bottomText: {
        marginTop: responsiveHeight(2),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        alignSelf: '',

    },
    linkColor: {
        color: 'red',
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center'
    }

});
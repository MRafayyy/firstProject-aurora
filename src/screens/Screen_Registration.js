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
} from 'react-native';


export default function Screen_Registration({ navigation, route }) {



    let regex_specialchar = /(?=.*?[.#?!@$%^&*-])/
    let regex_numbers = /(?=.*?[0-9])/
    let regex_CapAlphabet = /(?=.*?[A-Z])/
    let regex_SmallAlphabet = /(?=.*?[a-z])/

    const GoToLoginPage = () => {
        navigation.navigate('Screen_Login')
    }
    const [UsernameText, setUsernameText] = useState('');
    const [PasswordText, setPasswordText] = useState('');
    const [CPasswordText, setCPasswordText] = useState('');

    const [UsernameError_msg, setUsernameError_msg] = useState(['']);
    const [PasswordError_msg, setPasswordError_msg] = useState(['']);
    const [CPasswordError_msg, setCPasswordError_msg] = useState(['']);


    const onHandleUsernameChange = (value) => {
        setUsernameText(value);

    }
    const onHandlePasswordChange = (value) => {
        setPasswordText(value);


    }
    const onHandleCPasswordChange = (value) => {
        setCPasswordText(value);
    }

    let arr = [];

    const Register = () => {
        arr = [];

        if (UsernameText.trim().length === 0) {
            setUsernameError_msg(['UserId cannot be empty'])
        }
        else {
            if (UsernameText.length < 3 && UsernameText.trim().length !== 0) {
                setUsernameError_msg(["demn length too short!"])

            }
            else {
                setUsernameError_msg([]);

            }
        }

        setPasswordError_msg([])
        if (PasswordText.trim().length === 0) {


            arr.push('Password field cannot be empty')
            setPasswordError_msg(arr)

        }

        else if (PasswordText.trim().length > 0) {


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


        if (CPasswordText.trim() !== PasswordText.trim()) {
            setCPasswordError_msg(['Passwords do not match'])
        }
        else {
            setCPasswordError_msg([])
        }

    }


    // const SendRegistrationInfo = async () => {
        //     try {


    //         let response = await fetch(url, {
    //             method: 'POST',
    //             "Content-Type": 'application/json',
    //             body: {
    //                 userId: UsernameText,
    //                 password: PasswordText
    //             }
    //         })
    //         response = await response.json();
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    useEffect(() => {
        if (UsernameError_msg.length === 0 && PasswordError_msg.length === 0 && CPasswordError_msg.length === 0) {
            let url = 'http://192.168.0.103:3000/register'
          
            const SendRegistrationInfo = async () => {
                try {

                    const registrationData = {
                        userId: UsernameText,
                        password: PasswordText
                    }
                    let response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            "Content-Type": 'application/json'
                        },

                        body: JSON.stringify(registrationData)
                    })
                    response = await response.json();
                    if(response===true){
                        navigation.navigate('Screen_NadraVerification',{userId: UsernameText});
                    }
                    console.log(response);
                } catch (error) {
                    console.log(error)
                }
            }
            SendRegistrationInfo();
        }
    }, [UsernameError_msg, PasswordError_msg, CPasswordError_msg]);




    return (
        <>
            <View style={styles.body}>

                <Text style={styles.welcome_text}>Aurora</Text>

                <View style={styles.UsernameInputBoxView}>
                    {/* onChangeText={(value) => setText(value)} */}
                    <TextInput onChangeText={(value) => onHandleUsernameChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='UserId' placeholderTextColor={'black'} ></TextInput>
                    {/* <Text style={{ color: 'red'}}>{UsernameError_msg}</Text> */}
                    {UsernameError_msg.map((value, index) => (
                        <Text style={{ color: 'red', marginTop: 0 }} key={index}>{value}</Text>
                    ))}
                </View>


                <View style={[styles.PasswordInputBoxView]}>

                    <TextInput onChangeText={(value) => onHandlePasswordChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder='Password' placeholderTextColor={'black'} ></TextInput>
                    {/* <Text style={{ color: 'red', marginTop: 7 }}>{PasswordError_msg}</Text> */}
                    {PasswordError_msg.map((value, index) => (
                        <Text style={{ color: 'red', marginTop: 0 }} key={index}>{value}</Text>
                    ))}
                </View>


                <View style={[styles.PasswordInputBoxView]}>
                    <TextInput onChangeText={(value) => onHandleCPasswordChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder='Confirm Password' placeholderTextColor={'black'} ></TextInput>
                    {/* <Text style={{ color: 'red', marginTop: 0 }}>{CPasswordError_msg}</Text> */}
                    {CPasswordError_msg.map((value, index) => (
                        <Text style={{ color: 'red', marginTop: 0 }} key={index}>{value}</Text>
                    ))}
                </View>


                <Pressable onPress={Register} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]}>
                    {/* <LinearGradient colors={['##05D6D9', '##F907FC', '#FFFFFF']}> */}
                    <LinearGradient style={styles.LG} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }} colors={['rgb(5, 214, 217)', 'rgb(249, 7, 252)']} >
                        <Text style={[styles.btntext, { textAlign: 'center' }]}> Register</Text>
                    </LinearGradient>
                </Pressable>

                <View style={styles.bottomText}>
                    <Text style={[{ color: 'black' }]}>Already have an account?</Text>
                    <Pressable onPress={GoToLoginPage} ><Text style={styles.linkColor}>Login</Text></Pressable>

                </View>


            </View>
        </>
    )
}




const styles = StyleSheet.create({
    welcome_text: {
        flex: 1.2,
        fontSize: 70,
        marginTop: '13%',
        marginBottom: '13%',
        fontWeight: '900',
        fontStyle: 'normal',
        color: 'gray'
    },
    body: {
        flex: 1,
        // width: '100%',
        // height: '100vh',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'start',
        // borderWidth: 4,
        // borderColor: 'red'
        color: 'black',
    },
    text: {
        margin: 0,
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textAlign: 'left'
    },
    linkbeforetext: {
        margin: 0,
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        textAlign: 'left',
    },
    btntext: {
        margin: '4%',
        // margin: 10,
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textAlign: 'left'
    },
    UsernameInputBoxView: {
        // marginBottom: '12%',
        marginBottom: '17%',
        flex: 0.7,
        // borderColor: 'red',
        // borderWidth: 1,

    },
    UsernameInputBox: {
        width: 300,
        height: 50,
        fontSize: 20,
        backgroundColor: 'white',
        color: 'black',
        marginBottom: 4,
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 5,
    },
    PasswordInputBoxView: {
        marginBottom: '17%',
        flex: 0.7,
        // borderColor: 'red',
        // borderWidth: 1,
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
        // marginBottom: 50,
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
        marginTop: '7%',
    },
    LG: {
        borderRadius: 200,
    },
    bottomText: {
        flex: 1,
        marginTop: "0%",
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    linkColor: {
        color: 'red'
    }

});
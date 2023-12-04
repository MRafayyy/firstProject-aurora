import React, { useState, PropsWithChildren, useEffect } from "react";
// import type { PropsWithChildren } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Button
} from 'react-native';
import ip from './IPaddress';


  export default function Screen_NadraVerification({ navigation, route }){

const userId = route.params;
const hmm = userId;
// console.log(userId);

    const [nameText, setnameText] = useState('');
    const [Fathers_nameText, setFathers_nameText] = useState('');
    const [cnicText, setcnicText] = useState('');

    const onHandleNameChange = (value) => {
        setnameText(value);

    }
    const onHandleFathersNameChange = (value) => {
        setFathers_nameText(value);


    }
    const onHandleCnicChange = (value) => {
        setcnicText(value);
    }


    const onPressHandler = () => {
        navigation.navigate('Screen_B');
    }
  
    const Verify =async()=>{
        let url = `http://${ip}:3000/VerifyNadraInfo`
        try {

            const NadraData = {

                name: nameText,
                fathers_name: Fathers_nameText,
                cnic: parseInt(cnicText),
                gender: "female",
                userId: hmm.userId
            }
            console.log(NadraData)
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
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

useEffect(() => {
Verify();
}, [])


    // const [text, setText] = useState('');


    return (
        <>
            <View style={styles.body}>

                <Text style={styles.welcome_text}>NADRA</Text>

                <View style={styles.UsernameInputBoxView}>
                    <TextInput onChangeText={(value) => onHandleNameChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='Name' placeholderTextColor={'black'} ></TextInput>
                </View>


                <View style={styles.PasswordInputBoxView}>
                    <TextInput onChangeText={(value) => onHandleFathersNameChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder="Father's name" placeholderTextColor={'black'} ></TextInput>
                </View>
                
                
                <View style={styles.PasswordInputBoxView}>
                    <TextInput onChangeText={(value) => onHandleCnicChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder="CNIC" placeholderTextColor={'black'} ></TextInput>
                </View>

              


                <Pressable onPress={Verify} style={({pressed})=>[pressed? {opacity: 0.8}: {},styles.loginBtn, { borderRadius: 100 }]}>
                    {/* <LinearGradient colors={['##05D6D9', '##F907FC', '#FFFFFF']}> */}
                    <LinearGradient style={styles.LG} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }} colors={['rgb(5, 214, 217)', 'rgb(249, 7, 252)']} >
                        <Text style={[styles.btntext, { textAlign: 'center' }]}> Verify</Text>
                    </LinearGradient>
                </Pressable>

             


            </View>
        </>
    )
}




const styles = StyleSheet.create({
    welcome_text: {
        flex:0.7,
        fontSize: 50,
        marginTop: '13%',
        marginBottom: '13%',
        fontWeight: '900',
        fontStyle: 'normal',
        color: 'gray',
        // fontFamily: 'Cabin-Regular',
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'start',
    },
    text: {
        margin: 10,
        fontSize: 20,
        // fontWeight: '600',
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Cabin-Bold',
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
        marginBottom: '8%',
        flex: 0.5,

    },
    PasswordInputBoxView: {
        marginBottom: '8%',
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
      
    },
    loginBtn: {
        flex:1.5,
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
        flex:1,
        marginTop: 130,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        alignSelf: ''
    },
    linkColor: {
        color: 'red'
    }

});
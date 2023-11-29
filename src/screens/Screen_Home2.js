import React, { useState, useEffect, PropsWithChildren } from "react";

import GlobalStyle from "../utils/GlobalStyle";

import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput
} from 'react-native';
import * as Keychain from 'react-native-keychain';


export default function Screen_Home({ navigation, route }) {

    const onPressHandler = () => {
        navigation.navigate('Screen_B');
    }

    useEffect(() => {
        async function check(){
        // try {
        //     let url = 'http://192.168.0.103:3000/verifyToken'
        //     const credentials = await Keychain.getGenericPassword();
        //     let response  = await fetch(url,{
        //         method: 'POST',
        //         headers:{
        //             'Content-Type' : "application/json"
        //         },
        //         body: JSON.stringify(credentials)
        //     })

        //     if(response.success === true){
        //         console.error("hurrah"+ response)
        //     }
        //     else if(response.success === false){
        //         navigation.navigate('Screen_Login')
        //         console.error("oh oh")
        //     }
        //     // console.log("credential are :"+credentials.username)
        //     // console.log("credential are :"+credentials.password)
            
        // } catch (error) {
        //     console.log(error)
        // }
    }
        check();
    }, [])
    
    
    const Logout = async()=>{
        await Keychain.resetGenericPassword();
        navigation.navigate('Screen_Login');

    }


    return (
        <>
<View style={styles.body}>
    <Text style={[styles.text, GlobalStyle.CustomFont]}>Wlcome to the screen after home screen</Text>
    <Pressable onPress={Logout} style={{backgroundColor: 'orange'}}>
        <Text style={styles.text}>Logout</Text>
    </Pressable>
</View>
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
        margin: 10,
        fontSize: 20,
        // fontWeight: '600',
        color: 'black',
        textAlign: 'left'
    },

});
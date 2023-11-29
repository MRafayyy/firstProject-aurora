import React, { useState, PropsWithChildren } from "react";

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

    const Logout = async () => {
        await Keychain.resetGenericPassword();
        navigation.navigate('Screen_Login');
    }


    const NextScreen = async () => {
        try {
            let url = 'http://192.168.0.103:3000/verifyToken'
            const credentials = await Keychain.getGenericPassword();
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(credentials)
            })
            response = await response.json();
            if (response.success === true) {
                console.log("hurrah token validated")
                navigation.navigate('Screen_Home2');
            }
            else if (response.success === false) {
                navigation.navigate('Screen_Login')
                console.log("oh oh token expired so go back to login page")
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <View style={styles.body}>
                <Text style={[styles.text, GlobalStyle.CustomFont]}>Welcome to home screen</Text>
                <Pressable onPress={Logout} style={{ backgroundColor: 'orange' }}>
                    <Text style={styles.text}>Logout</Text>
                </Pressable>
                <Pressable onPress={NextScreen} style={{ backgroundColor: 'orange' }}>
                    <Text style={styles.text}>Next Screen</Text>
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
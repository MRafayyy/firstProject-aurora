import React, { useState, PropsWithChildren } from "react";

import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput
} from 'react-native';


export default function Screen_Home({ navigation, route }) {

    const onPressHandler = () => {
        navigation.navigate('Screen_B');
    }
    
    const Logout = ()=>{
        navigation.navigate('Screen_Login');

    }


    return (
        <>
<View style={styles.body}>
    <Text style={styles.text}>Welcome to home screen</Text>
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
        fontWeight: '600',
        color: 'black',
        textAlign: 'left'
    },

});
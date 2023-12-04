import React, { useState, PropsWithChildren } from "react";

// import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput
} from 'react-native';
import GlobalStyle from "../utils/GlobalStyle";


export default function Screen_Splash({ navigation, route }) {

   
    setTimeout(()=>{

        // const Forward = ()=>{
            navigation.navigate('Screen_Login');
            
        // }

    }, 4000)


    return (
        <>
<View style={styles.body}>
    <Text style={[styles.text, GlobalStyle.CustomFont]}>Aurora</Text>
    {/* <Pressable onPress={Logout} style={{backgroundColor: 'orange'}}>
        <Text style={styles.text}>Logout</Text>
    </Pressable> */}
</View>
        </>
    )
}




const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        margin: 10,
        fontSize: 70,
        // fontWeight: '600',
        color: 'white',
        textAlign: 'center'
    },

});
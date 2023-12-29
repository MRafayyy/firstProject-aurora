import React, { useState, useEffect, PropsWithChildren } from "react";

// import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    BackHandler
} from 'react-native';
import GlobalStyle from "../utils/GlobalStyle";
import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';
import HomeTabs from "../HomeTabs";
import { Screen } from "react-native-screens";
import Screen_Home from "./Screen_Home";

export default function Screen_Splash({ navigation, route }) {

   
    // setTimeout(()=>{

    //     // const Forward = ()=>{
    //         navigation.navigate('Screen_Login');
            
    //         // }

    // }, 4000)

    function handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
      }
      
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
      }, []);


    useEffect(() => {
        
        async function Logged() {
            try {
                let url = `${ip}/verifyToken`
                const credentials = await Keychain.getGenericPassword();
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(credentials)
                })
                //    console.log(response.text())
                response = await response.json();
                
                if (response.success === true) {
                    navigation.navigate(HomeTabs, { screen: Screen_Home, params: { userId: credentials.username}})
                    
                }
                else if (response.success === false) {
                    
                    setTimeout(()=>{

                        // const Forward = ()=>{
                            navigation.navigate('Screen_Decider');
                            
                            // }
                
                    }, 3000)
                }

            } catch (error) {
                // console.info(error)
                setTimeout(()=>{

                    // const Forward = ()=>{
                        navigation.navigate('Screen_Decider');
                        
                        // }
            
                }, 3000)
            }
        }
        Logged();

        // Login();
    }, [])


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
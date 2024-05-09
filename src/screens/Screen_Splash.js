import React, { useState, useEffect, PropsWithChildren, useContext } from "react";

import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    BackHandler
} from 'react-native';
import GlobalStyle from "../utils/GlobalStyles";
import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';
import HomeTabs from "../HomeTabs";
import { Screen } from "react-native-screens";
import Screen_Home from "./Screen_Home";
import UserIdContext from "../UserIdContext";
import EncryptedStorage from 'react-native-encrypted-storage'
import { connectToSocket } from "../components/SocketService";
import UserScreenNavigation from "../navigation/Women/MaterialBottomTabsNavigation";



export default function Screen_Splash({ navigation, route }) {

    const {userId, setUserId } = useContext(UserIdContext);
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
                console.log(credentials)
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
                    const mongoId =  await EncryptedStorage.getItem('user_session')
                    // credentials = JSON.parse(credentials.username)
                    setUserId({userId: credentials.username, mongoId})
                    // navigation.navigate(HomeTabs, { screen: Screen_Home, params: { userId: credentials.username}})
                    // navigation.navigate(BottomTabScreens, { screen: Screen_Home, params: { userId: credentials.username}})
                    navigation.navigate(UserScreenNavigation, {
                        screen: Screen_Home,
                        params: { userId: credentials.username},
                      });
                     
                   const socket = connectToSocket(credentials.username, mongoId)
                    socket.emit('LoggedIn',{ userId: credentials.username, mongoId: mongoId} )
                }
                else if (response.success === false) {
                    
                    setTimeout(()=>{

                        // const Forward = ()=>{
                            navigation.navigate('Screen_Decider');
                            
                            // }
                
                    }, 2000)
                }

            } catch (error) {
                // console.info(error)
                setTimeout(()=>{

                    // const Forward = ()=>{
                        navigation.navigate('Screen_Decider');
                        
                        // }
            
                }, 1000)
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
import React, { useState, useEffect, useRef, useContext } from "react";

import GlobalStyle from "../utils/GlobalStyle";

import {
    StyleSheet,
    Text,
    View,
    Pressable,
    BackHandler,
    Alert,
    ScrollView,
    FlatList,
    RefreshControl,
    Refreshing,
    onRefreshHandler
} from 'react-native';
import ip from './IPaddress'
import * as Keychain from 'react-native-keychain';
import PushNotification from "react-native-push-notification";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useConnectionStatus } from "../components/NoInternet";
// import * as Ably from 'ably';
import EncryptedStorage from 'react-native-encrypted-storage'
import SocketIOClient from 'socket.io-client'
import { io } from 'socket.io-client';

import { useRoute } from '@react-navigation/native';
// import {initializeSocket} from '../components/sockets'
import UserIdContext from "../UserIdContext";
import socket from "../components/SocketService";


// import { getSocket } from "../components/sockets";

export default function Screen_Home({ navigation, route }) {
 console.log("Screen_Home rendered")
    const isConnected = useConnectionStatus();
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [presentMembers, setpresentMembers] = useState([])




    const { userId, setUserId } = useContext(UserIdContext)
    // console.log(userId + "huraaa")


useEffect(()=>{
    // socket.on('bd',(data)=>{
    //     console.log("lalala")
    // })

    // return(()=>{
    //     // socket.close();
    // })
},[])


    //    const socketI = io(`${ip}/userrr`,{
    //         auth: {Token: userId}
    //       }); 

    // useEffect(() => {

    //     // const socket = initializeSocket(userId);

    //       socketI.removeAllListeners()
    //     socketI.disconnect()      

    //     //   socketI.removeEventListener()
    //       socketI.on('connect', () => {
    //           console.log('Connected to server');
    //       });
    //       // socketI.disconnect()

    //       socketI.on('disconnect', () => {
    //           console.log('Disconnected from server');
    //       });




    // //     return () => {
    // //  socketI.disconnect()      
    // //     };
    //   }, []);
















    async function retrieveUserSession() {
        try {
            const session = await EncryptedStorage.getItem("user_session");

            if (session !== undefined) {
                const parsedSession = JSON.parse(session);
                if (parsedSession['clientId']) {
                    return parsedSession['clientId']; // Return the clientId
                }
            }
        } catch (error) {
            console.error("Error retrieving user session:", error);
        }
        return null; // Return null if clientId is not available
    }












    // ---------------------------------------------------------------------

    function handleBackButtonClick() {
        // Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        //     {
        //       text: 'Cancel',
        //       onPress: () => null,
        //       style: 'cancel',
        //     },
        //     {text: 'YES', onPress: () => BackHandler.exitApp()},
        //   ]);
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);


    const Logout = async () => {
        await Keychain.resetGenericPassword();
        // const socket = getSocket();
        // socket.disconnect();
        navigation.navigate('Screen_Login');
        setUserId({userId: '', mongoId: ''})

    }

    const handleNotification = () => {

        // PushNotification.cancelAllLocalNotifications(); //previous notifs will be cancelled

        console.log("notif clicked")

        PushNotification.localNotification({
            channelId: "test-channel",
            channelName: "Test Channel",
            title: "You clicked on test notif button",
            message: "Message",
            bigText: "Yuhu is name of the famous chinese dish",
            foreground: true,
            showWhen: true,
            color: 'red'
        })

        PushNotification.localNotificationSchedule({
            channelId: "test-channel",
            channelName: "Test Channel",
            title: "delayed one",
            message: "you have been here for 10 secs",
            date: new Date(Date.now() + (10 * 1000)),
            allowWhileIdle: true,
        })
    }


    const FirebaseNotif_Screen = async () => {
        navigation.navigate('Screen_FirebaseNotif')
    }



    const NextScreen = async () => {
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
            {/* <ScrollView> */}

            <View style={styles.body}>

                <Text style={{ textAlign: 'left', color: '#0662bf', fontSize: responsiveFontSize(4), fontWeight: '900', margin: responsiveWidth(3) }}>Aurora</Text>


                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(4) }}>

                    {/* <Text style={[styles.text, GlobalStyle.CustomFont]}>Welcome to home screen</Text> */}

                    <View style={{ marginTop: responsiveHeight(10), marginBottom:responsiveHeight(3) , width: responsiveWidth(55), height: responsiveHeight(6), justifyContent: 'center', alignItems: 'center', backgroundColor: isConnected ? 'green' : 'red' }}>
                        <Text style={{ color: 'white' }}>{isConnected ? 'You are connected to the internet' : 'No Internet'}</Text>
                    </View>

                    <Pressable onPress={Logout} style={{ backgroundColor: 'orange' }}>
                        <Text style={(styles.text, { margin: 10 })}>Logout</Text>
                    </Pressable>

                    <Pressable onPress={NextScreen} style={{ backgroundColor: 'orange', marginTop: 30 }}>
                        <Text style={(styles.text, { margin: 10 })}>Next Screen</Text>
                    </Pressable>

                    <Pressable onPress={handleNotification} style={{ backgroundColor: 'red', marginTop: 30 }}>
                        <Text style={(styles.text, { margin: 10 })}>Testing notif</Text>
                    </Pressable>

                    <Pressable onPress={FirebaseNotif_Screen} style={{ backgroundColor: 'red', marginTop: 30 }}>
                        <Text style={(styles.text, { margin: 10 })}>Go to firebase notifs screen</Text>
                    </Pressable>

               


                    <View style={{ justifyContent: 'center', alignItems: 'center', width: responsiveWidth(55), height: responsiveHeight(10), marginTop: 10 }}>
                        {/* Display online users list */}
                        <Text style={{ color: 'black', fontSize: 15 }}>Online Users: {onlineUsersCount}</Text>
                    </View>

           
                </View>

            </View>


            {/* </ScrollView> */}
        </>
    )

}



const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    text: {
        margin: 10,
        fontSize: 20,
        // fontWeight: '600',
        color: 'black',
        textAlign: 'left'
    },

});




























// const realtimeRef = useRef(null); // Ref to store the realtime instance

// let isAblyConnected = false;
// useEffect(() => {

//     async function initializeRealtime() {
//         const clientId = await retrieveUserSession(); // Retrieve clientId
//         if (!clientId) {
//             console.error("Client ID not available.");
//             return;
//         }

//         try {
//             // realtime = new Ably.Realtime.Promise({
//             //     key: ably_api_key,
//             //     clientId: clientId,
//             // });

//              const realtime = await initialRealtime(ably_api_key, clientId);

//             realtimeRef.current = realtime;

//             await realtime.connection.once('connected');
//             console.log('Connected to Ably!');
//             isAblyConnected= true;

//             const channel = realtime.channels.get('chatroom');
//             await channel.attach();
//             await channel.presence.enter();

//             await channel.presence.subscribe((presenceMessage) => {
//                 const { action, clientId } = presenceMessage;
//                 if (action === 'enter' || action === 'leave') {
//                     channel.presence.get((err, members) => {
//                         if (err) {
//                             console.error(`Error retrieving presence data: ${err}`);
//                             return;
//                         }
//                         setOnlineUsersCount(members.length);
//                         setpresentMembers(members)
//                         console.log(members)
//                     });
//                 }
//             });
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     initializeRealtime();
//     // fetchOnlineUsersCount()

//     return () => {
//         // if (realtime) {
//         //     realtime.close();
//         //     console.log('Closed the connection to Ably.');
//         // }
//         closeRealtimeConnection()
//     };
// }, []);
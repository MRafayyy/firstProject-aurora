import React, { useState, PropsWithChildren, useEffect } from "react";

import GlobalStyle from "../utils/GlobalStyle";

// import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    BackHandler,
    Alert,
    ScrollView
} from 'react-native';
import ip from './IPaddress'
import * as Keychain from 'react-native-keychain';
import PushNotification from "react-native-push-notification";
// import NetInfo from "@react-native-community/netinfo";
// import { addEventListener } from "@react-native-community/netinfo";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useConnectionStatus } from "../components/NoInternet";
import * as Ably from 'ably';



export default function Screen_Home({ navigation, route}) {

    const {userId} = route.params.userId;
    const isConnected = useConnectionStatus();
    
    // ---------------------------------------------------------------------

const [userOnline, setuserOnline] = useState([])

const ably_api_key = 'uJbUAQ.WtYOKg:hFNNjiNKqYkls6docSNQIVfusAl1c-hy7O6pMHu6Cac'
// const {userId} = route.params;
const userIds = '45'
// const randomId = Math.random().toString(36).slice(-10); 
const randomId = userIds 
const realtime = new Ably.Realtime.Promise({
  key: ably_api_key,
  clientId: randomId, // Your ID in the presence set
});


useEffect(() => {

  async function doPresence() {
      // Connect to Ably
    await realtime.connection.once("connected");
    console.log("Connected to Ably!");
    // Your code goes here
  }
  doPresence();
     

  async function demn(){

    try {
        
        
        // Attach to the "chatroom" channel
        const channel = realtime.channels.get("chatroom");
        await channel.attach();
        
        // Enter the presence set of the "chatroom" channel
        await channel.presence.enter("hello");
        
    } catch (error) {

        console.log("demn error"+error)
    }
  }
  demn();

const subscribing = async()=>{

    try {
        
        
        const channel = realtime.channels.get("chatroom");
        // Subscribe to the presence set to receive updates
        await channel.presence.subscribe((presenceMessage) => {
    const { action, clientId } = presenceMessage;
    console.log("Presence update:", action, "from:", clientId);


     // Update the list of channel members when the presence set changes
  channel.presence.get((err, members) => {
    if (err) {
      return console.error(`Error retrieving presence data: ${err}`);
    }
    // document.getElementById("presence-set").innerHTML = members
    //   .map((member) => {
    //     return `<li>${member.clientId}</li>`;
    //   })
    //   .join("");
    console.log('----------------------------')
    console.log(members)
  });
});
} catch (error) {
console.log("error in subscribing ....."+error)
}
  
}
subscribing()

      return () => {
        realtime.close();
        console.log('Closed the connection to Ably.');
      };
    }, []); // Empty dependency array to run this effect only once




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



    const sendFCMNotifs = async () => {

        try {
            let url = `${ip}/sendFCM`
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify
            })
            // response = response.json();
            // console.log(response)
        } catch (error) {

        }


     
    }

    const onPressHandler = () => {
        navigation.navigate('Screen_B');
    }

    const Logout = async () => {
        await Keychain.resetGenericPassword();
        navigation.navigate('Screen_Login');
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
        <ScrollView>

            <View style={styles.body}>
                <Text style={[styles.text, GlobalStyle.CustomFont]}>Welcome to home screen</Text>
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

                <View style={{ width: responsiveWidth(55), height: responsiveHeight(10), position: 'absolute', top: 100 , bottom: 50, justifyContent: 'center', alignItems: 'center', backgroundColor:  isConnected? 'green' : 'red' }}>
                    <Text style={{ color: 'white' }}>{isConnected? 'You are connected to the internet' : 'No Internet'}</Text>
                </View>
                {/* <Pressable onPress={sendFCMNotifs} style={{ backgroundColor: 'red',  marginTop: 30  }}>
                    <Text style={(styles.text, {margin: 10 })}>Go to firebase notifs screen</Text>
                </Pressable> */}

            </View>
</ScrollView>
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
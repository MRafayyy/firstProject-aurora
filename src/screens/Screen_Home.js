import React, { useState, PropsWithChildren } from "react";

import GlobalStyle from "../utils/GlobalStyle";

// import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import ip from './IPaddress'
import * as Keychain from 'react-native-keychain';
import PushNotification from "react-native-push-notification";

export default function Screen_Home({ navigation, route }) {

    const sendFCMNotifs = async () => {

try {
    let url = `${ip}/sendFCM`
    let response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // response = response.json();
    // console.log(response)
} catch (error) {
    
}


    //     try {
            
           
    //         // POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1
    //         let url = 'https://fcm.googleapis.com/fcm/send'
    //         let response = await fetch(url, {
    //             method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer AAAADz1-KfI:APA91bGJ-sKa3F15DexhEXHxHp_XWl4dEoC6HChxD6cJF42ad9RzvTj0K0KfxwCLLeAA54nWSGHwxN8ZYd2EIbBHztsXGu57ZG7jt-QKT8peIQYvyhMEWj03oX1kO2I0AYR8KVbs09gO'
    //         },
    //         body: JSON.stringify({
              
    //             "data": {},
    //             "notification": {
    //                 "body": "This is an FCM notification message!",
    //                 "title": "FCM Message"
    //             },
    //             "to": "c8KHnyMrRTyXNXB9tVglFM:APA91bGVoYH4vYpKUsETdY_RxbAMZ3vXe2u4wLWhDFrya87IyuTyyStgiaypiOCfZgO5HLuMSpnIvZ4LL7gcFzWfk5_zZbT-hodd-D6RMvtkJPKaSIytPKowKcI5HgO3viZWtHFNBlOX",
    //         }
            
    //         )
    //     })
    //     response  = response.json()
    // } catch (error) {
    //     console.log(error)
    // }
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
            <View style={styles.body}>
                <Text style={[styles.text, GlobalStyle.CustomFont]}>Welcome to home screen</Text>
                <Pressable onPress={Logout} style={{ backgroundColor: 'orange' }}>
                    <Text style={styles.text}>Logout</Text>
                </Pressable>
                <Pressable onPress={NextScreen} style={{ backgroundColor: 'orange' }}>
                    <Text style={styles.text}>Next Screen</Text>
                </Pressable>
                <Pressable onPress={handleNotification} style={{ backgroundColor: 'orange' }}>
                    <Text style={(styles.text, { marginTop: 30 })}>Testing notif</Text>
                </Pressable>
                <Pressable onPress={sendFCMNotifs} style={{ backgroundColor: 'orange' }}>
                    <Text style={(styles.text, { marginTop: 30 })}>send firebase notifs</Text>
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
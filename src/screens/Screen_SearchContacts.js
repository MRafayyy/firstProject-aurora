import React, { useEffect, useRef, useState } from "react";

import { View, Pressable, ScrollView, Text, StyleSheet, BackHandler, TextInput, Keyboard, FlatList, RefreshControl, Refreshing, VirtualizedList } from 'react-native'

import EncryptedStorage from 'react-native-encrypted-storage'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import * as Keychain from 'react-native-keychain';
import ip from './IPaddress'

// import {getSocket} from '../components/sockets'
import UserDisplay from "../components/UserDisplay";




export default function Screen_SearchContacts({ navigation }) {


    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    // const [msgContent, setmsgContent] = useState([])
    // const [MsgContentSender, setMsgContentSender] = useState([])
    // const [CombinedMessages, setCombinedMessages] = useState([])
const [AllUsers, setAllUsers] = useState([]);

useEffect(()=>{

    
    const fetchUsers = async()=>{
        try {
            
            let credentials = await Keychain.getGenericPassword()
            let response = await fetch(`${ip}/users/${credentials.username}`,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            // console.log(response)
            response = await response.json();
            setAllUsers(response)
            // console.log(AllUsers)
            
        } catch (error) {
            console.log(error)
        }
    }

    fetchUsers()
    
},[])


// useEffect(()=>{
//     const socket = getSocket();

//     const getOnlineUserCount = async()=>{
//         socket.on('getOnlineUsers',(data)=>{
//             console.log(data.userId+" is online")
//             setOnlineUsersCount(data.count)
//         })
        
//         socket.on('getOfflineUsers',(data)=>{
//             console.log(data.userId+" is offline")
//             setOnlineUsersCount(data.count)
//         })
//     }

//     getOnlineUserCount();
// },[])


    function handleBackButtonClick() {
        navigation.navigate('Screen_Home');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);





    return (
        <>
            <ScrollView contentContainerStyle={styles.body}>
            {/* <ScrollView contentContainerStyle={styles.body}> */}

            {/* <View style={styles.body}> */}

                <View style={{ justifyContent: 'center', alignItems: 'center', width: responsiveWidth(55), height: responsiveHeight(10), marginTop: 10 }}>
                    {/* Display online users list */}
                    <Text style={{ color: 'black', fontSize: 15 }}>Online Users: {onlineUsersCount}</Text>
                </View>

                {/* <Pressable onPress={fetchOnlineUsersCount} style={{ backgroundColor: 'red', marginTop: 30 }}>
                    <Text style={(styles.text, { margin: 10 })}> Refresh online users</Text>
                </Pressable> */}

                {/* <TextInput value={SendMyMessage} onChangeText={(value) => setSendMyMessage(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='Send message' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss}  ></TextInput> */}

                {/* <Pressable onPress={OnlyMessage} style={{ backgroundColor: 'red', marginTop: 30, marginBottom: 5 }}>
                    <Text style={(styles.text, { margin: 10 })}> Publish</Text>
                </Pressable> */}

                <View style={{ justifyContent: 'center', alignItems: 'center',width: responsiveWidth(95) }}>
                    {/* <Text style={{color: 'red'}}>Hey</Text>  */}
                    { 

                    AllUsers.map((obj, index) => {return  (
                        <UserDisplay key={index} item={obj} />
                        // <Text key={index} style={{ color: 'black', margin: 4, fontSize: responsiveFontSize(2) }}>
                        //     {obj.userId}
                        //     </Text>
                        )
                    }) 
                        
                    }
                </View>

                {/* <VirtualizedList> */}

                {/* <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={AllUsers}

                    renderItem={({ item }) => (
                        <View style={{ width: '100%', justifyContent: 'flex-startand', alignItems: 'flex-start' }}>
                            <Text style={styles.text}>{item.userId}</Text>
                        </View>
                    )}

                    refreshControl={
                        <RefreshControl refreshing={Refreshing}
                        // onRefresh={onRefreshHandler}
                        />
                    }>


                </FlatList> */}
                {/* </VirtualizedList> */}




            {/* </View > */}
            </ScrollView>
            {/* </ScrollView> */}
        </>
    )
}


const styles = StyleSheet.create({
    body: {
        // flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        margin: 5,
        fontSize: 15,
        // fontWeight: '600',
        color: 'black',
        textAlign: 'left'
    },

    UsernameInputBox: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
    },

});










































// const [Messages, setMessages] = useState([])
// let arr = []
// const [presentMembers, setpresentMembers] = useState([])
// const [SendMyMessage, setSendMyMessage] = useState('')

// const ably_api_key = 'uJbUAQ.WtYOKg:hFNNjiNKqYkls6docSNQIVfusAl1c-hy7O6pMHu6Cac'
// const realtimeRef = useRef(null); // Ref to store the realtime instance
// const channelRef = useRef(null)



// async function retrieveUserSession() {
//     try {
//         const session = await EncryptedStorage.getItem("user_session");

//         if (session !== undefined) {
//             const parsedSession = JSON.parse(session);
//             if (parsedSession['clientId']) {
//                 return parsedSession['clientId']; // Return the clientId
//             }
//         }
//     } catch (error) {
//         console.error("Error retrieving user session:", error);
//     }
//     return null; // Return null if clientId is not available
// }

// useEffect(() => {
//     const realtime = getRealInstance();
//     realtimeRef.current = realtime;

//     // const channel = realtime.channels.get('some-other-channel');

//     // Your Realtime logic here for the other screen

//     // subscribeAndMessage()
//     subscribeAndMessage();
//     fetchOnlineUsersCount()

//     return () => {
//        channel = channelRef.current
//        channel.unsubscribe()
//     };
// }, []);




// async function fetchOnlineUsersCount() {
//     try {
//         const realtimeInstance = realtimeRef.current;
//         if (!realtimeInstance) {
//             console.error("Realtime instance not initialized.");
//             return;
//         }

//         const channel = realtimeInstance.channels.get('chatroom');
//         if (!channel) {
//             console.error("Channel not available.");
//             return;
//         }

//         channel.presence.get((err, members) => {
//             if (err) {
//                 console.error(`Error retrieving presence data: ${err}`);
//                 return;
//             }
//             setOnlineUsersCount(members.length);
//             console.log('Updated online users count:', members.length);
//         });
//     } catch (error) {
//         console.error('Error fetching online users count:', error);
//     }
// }





// const subscribeAndMessage = async () => {

//     try {
//         // const clientId = await retrieveUserSession(); // Retrieve clientId
//         const realtimeInstance = realtimeRef.current;
//         if (!realtimeInstance) {
//             console.error("Realtime instance not initialized.");
//             return;
//         }
//         const channel = realtimeInstance.channels.get('aurora');
//         channelRef.current = channel
//         if (!channel) {
//             console.error("Channel not available.");
//             return;
//         }

//         await channel.subscribe((msg) => {

//             console.log(msg);
      
//             // const dataArray = JSON.stringify(msg.data);
//             // const sender = dataArray.idss; 
//             // const message = dataArray.mesg; 

//             // console.log('Sender:', sender);
//             // console.log('Message:', message);
//             // const a = {JSON.stringify(msg.data.mesg) , JSON.stringify(msg.data.idss) ]

//             // const a  = {
//             //     sender: JSON.stringify(msg.clientId),
//             //     receiver: JSON.stringify(msg.data.mesg)
//             // }
//             setMessages([...Messages, msg.data])
//             console.log(msg.data)
//             // arr.push(a)
//             // setMessages(arr)
//             // setMessages([
//             //     ...Messages,
//             //     { sender: sender, message: message },
//             // ]);


//         });

//     } catch (error) {

//     }
// }


// const OnlyMessage = async () => {

//     setSendMyMessage('')
//     const clientId = await retrieveUserSession(); // Retrieve clientId
//     const channel = channelRef.current
//     if (SendMyMessage.trim().length === 0) {
//         return
//     }
//     else {

//         // await channel.publish("update", [{clientId: `${clientId}`}, {Content : `Man United by wuhu`}] );
//         await channel.publish("update", { idss: clientId, mesg: SendMyMessage });
//     }
// }
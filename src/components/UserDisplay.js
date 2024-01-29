import { useContext, useEffect, useState } from 'react';
import React from "react";

import { Text, View, Pressable, Image, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import UserIdContext from '../UserIdContext';
import ip from '../screens/IPaddress';



const UsersShow = ({ item, requestSent, setrequestSent }) => {

    const [disableNow, setdisableNow] = useState(false)
    const { userId } = useContext(UserIdContext)
    let sel = item._id
    // const [requestSent, setrequestSent] = useState({sel: false})


    const sendFriendRequest = async (currentUserId, selectedUserId) => {
        try {

            let response = await fetch(`${ip}/friend-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentUserId, selectedUserId })
            })

            // response = await response.json()
            if (response.ok) {

                setrequestSent({...requestSent,[selectedUserId]: true})
                setdisableNow(true)
            }
        } catch (error) {
            console.log("error here")
            console.log(error)
        }
    }

    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(2), paddingHorizontal: responsiveWidth(5)}}>

            <View>
                <Image style={{ width: responsiveWidth(14), height: responsiveHeight(7), resizeMode: 'cover' }} source={require('../../assets/images/womenAvatar.jpg')} /
                >
            </View>

            <View style={{ marginLeft: responsiveWidth(5), flex: 1 }}>
                <Text style={{ textAlign: 'left', color: 'black', fontSize: responsiveFontSize(2) }} >{item.name}</Text>
                {/* <Text style={{ textAlign: 'left', color: 'gray', fontSize: responsiveFontSize(2) }} >{item.userId}</Text> */}
            </View>


            <Pressable disabled={disableNow} onPress={() => sendFriendRequest(userId.mongoId, item._id)} style={{borderColor: '#0662bf',borderWidth:1, padding: responsiveWidth(2), borderRadius: responsiveWidth(2), width: responsiveWidth(30) }}>
                <Text style={{ textAlign: 'center', color: '#0662bf', fontSize: responsiveFontSize(2) }}>{requestSent[item._id] ? 'Sent Request' : 'Add Friend'}</Text>
            </Pressable>
            {/* backgroundColor: '#567189' */}

        </Pressable>
    )
}


export default UsersShow;

const styles = StyleSheet.create({})
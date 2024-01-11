import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const FriendRequests = ({ item, friendRequests, setFriendRequests }) => {
    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: responsiveHeight(5) }}>

            <Image style={{ width: responsiveWidth(10), height: responsiveHeight(7), borderRadius: 25 }} source={require('../../assets/images/nadraV.jpg')} />

           <Text style={{textAlign: 'left' , fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(5), flex: 1 }}>{item?.name} sent you a friend request</Text>

            <Pressable style={{ backgroundColor: 'blue', padding: 10, borderRadius: 6 }}><Text style={{ textAlign: 'center', color: 'white' }}>Accept</Text></Pressable>
        </Pressable>
    )
}

export default FriendRequests

const styles = StyleSheet.create({})
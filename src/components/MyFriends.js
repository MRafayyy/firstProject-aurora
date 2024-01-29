import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import ip from '../screens/IPaddress'
import UserIdContext from '../UserIdContext'

const MyFriends = ({ item, friends, setFriends }) => {
    

    const {userId} = useContext(UserIdContext)



    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: responsiveHeight(1), backgroundColor: 'white' }}>

            <Image style={{ width: responsiveWidth(14), height: responsiveWidth(14), borderRadius: 30 }} source={require('../../assets/images/womenAvatar.jpg')} resizeMode='cover' />

           <Text style={{textAlign: 'left' , fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(5), flex: 1, color: 'black' }}>{item?.name}</Text>

            {/* <Pressable onPress={()=>acceptRequest(item._id)} style={{ borderColor: '#0662bf',borderWidth:1, padding: responsiveWidth(2), borderRadius: responsiveWidth(2), width: responsiveWidth(20) }}><Text style={{ textAlign: 'center', color: '#0662bf' }}>{Accepted? 'Accepted': 'Accept'}</Text></Pressable> */}
        </Pressable>
    )
}

export default MyFriends

const styles = StyleSheet.create({})
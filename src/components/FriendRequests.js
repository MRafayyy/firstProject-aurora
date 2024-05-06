import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import ip from '../screens/IPaddress'
import UserIdContext from '../UserIdContext'
import fontFamily from '../../assets/fontFamily/fontFamily'

const FriendRequests = ({ item, friendRequests, setFriendRequests, Accepted, setAccepted }) => {
    // const [Accepted, setAccepted] = useState(false)

    const {userId} = useContext(UserIdContext)

const acceptRequest = async(friendRequestSenderId)=>{
    const mongoId = userId.mongoId;
try {
    let response = await fetch(`${ip}/friend-request/accept`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            senderId: friendRequestSenderId,
            recepientId: mongoId
        })
    })

    if(response.ok){
        setFriendRequests(friendRequests.filter((requestID)=>{
            return requestID._id !== friendRequestSenderId
        }))
        setAccepted({...Accepted, [friendRequestSenderId]: true})
        console.log("friend request accepted")
    }

} catch (error) {
    console.log("error accepting friend request:"+error);
}
}




    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: responsiveHeight(2), backgroundColor: 'white' }}>

            <Image style={{ width: responsiveWidth(14), height: responsiveWidth(14), borderRadius: 30 }} source={require('../../assets/images/womenavatar.jpg')} resizeMode='cover' />

           <Text style={{ fontFamily: fontFamily.Regular,textAlign: 'left' , fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(5), paddingRight: responsiveWidth(2), flex: 1, color: 'black' }}>{item?.name} sent you a friend request</Text>

            <Pressable onPress={()=>acceptRequest(item._id)} style={{ borderColor: '#0662bf',borderWidth:1, padding: responsiveWidth(2), borderRadius: responsiveWidth(2), width: responsiveWidth(20) }}><Text style={{ textAlign: 'center', color: '#0662bf' }}>{Accepted[item._id]? 'Accepted': 'Accept'}</Text></Pressable>
        </Pressable>
    )
}

export default FriendRequests

const styles = StyleSheet.create({})
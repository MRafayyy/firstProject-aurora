import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import ip from '../screens/IPaddress'
import UserIdContext from '../UserIdContext'

const FriendRequests = ({ item, friendRequests, setFriendRequests }) => {
    const [Accepted, setAccepted] = useState(false)

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
        setAccepted(true)
        console.log("friend request accepted")
    }

} catch (error) {
    console.log("error accepting friend request:"+error);
}
}




    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: responsiveHeight(5) }}>

            <Image style={{ width: responsiveWidth(10), height: responsiveHeight(7), borderRadius: 25 }} source={require('../../assets/images/nadraV.jpg')} />

           <Text style={{textAlign: 'left' , fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(5), flex: 1 }}>{item?.name} sent you a friend request</Text>

            <Pressable onPress={()=>acceptRequest(item._id)} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 6 }}><Text style={{ textAlign: 'center', color: 'white' }}>{Accepted? 'Accepted': 'Accept'}</Text></Pressable>
        </Pressable>
    )
}

export default FriendRequests

const styles = StyleSheet.create({})
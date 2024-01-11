import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ip from "./IPaddress";
import UserIdContext from "../UserIdContext";
import FriendRequests from "../components/FriendRequests";

export default function Screen_Friends() {

    const { userId } = useContext(UserIdContext)
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(() => {
        fetchFriendRequests();
    }, [])


    const fetchFriendRequests = async () => {
        try {
            const mongoId = userId.mongoId;
            let response = await fetch(`${ip}/friend-request/${mongoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                response = await response.json()
                // console.log(response)

                const friendRequestsData = response.map((friendRequest) => ({

                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email
                })
                )

                setFriendRequests(friendRequestsData)
            }


        } catch (error) {
            console.log("error message: " + error)
        }
    }


    // console.log(friendRequests[0].name)
    return (
        <View style={{padding: 10, marginHorizontal: 12}} >
           {friendRequests.length > 0?  
            friendRequests.map((item,index)=>(
            <FriendRequests key={index} item={item} friendRequests={friendRequests} setFriendRequests={setFriendRequests}/>
           )) : null }
        </View>
    );
}


const styles = StyleSheet.create({})
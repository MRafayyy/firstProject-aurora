import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ip from "./IPaddress";
import UserIdContext from "../UserIdContext";


export default function Screen_Friends() {

    const { userId } = useContext(UserIdContext)
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(() => {
        fetchFriendRequests();
    }, [])


    const fetchFriendRequests = async () => {
        try {

            let response = await fetch(`${ip}/friend-request/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                response = await response.json()
                console.log(response)

                const friendRequestsData = response.map((friendRequest) => ({

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


    console.log(friendRequests)
    return (
        <></>
    );
}


const styles = StyleSheet.create({})
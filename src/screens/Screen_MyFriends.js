import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    RefreshControl,
    FlatList,
} from 'react-native';
import ip from "./IPaddress";
import UserIdContext from "../UserIdContext";
import FriendRequests from "../components/FriendRequests";
import { responsiveWidth } from "react-native-responsive-dimensions";
import MyFriends from "../components/MyFriends";
import NothinToShow from "../components/NothinToShow";

export default function Screen_MyFriends({navigation}) {

    const { userId } = useContext(UserIdContext)
    const [friends, setFriends] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [friendRemoved, setfriendRemoved] = useState({})

    useEffect(() => {
        fetchFriends();
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        fetchFriends()

    }, []);


    const fetchFriends = async () => {
        try {
            const mongoId = userId.mongoId;
            let response = await fetch(`${ip}/my-friends/${mongoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                response = await response.json()

                if (response.status === "empty") {
                    console.log("no friends found")
                }
                else {
                    // console.log(response)


                    const friendsData = response.map((friend) => ({

                        _id: friend._id,
                        name: friend.name,
                        email: friend.email
                    })
                    )

                    setFriends(friendsData)

                }
            }

            else if (response.status == 500) {
                console.log("demn")
            }


        } catch (error) {
            console.log("error message: " + error)
        }
    }


    // console.log(friendRequests[0].name)
    return (
        <View style={{ flex: 1, padding: responsiveWidth(5), backgroundColor: 'white' }} >
            {friends.length > 0 ?


                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    data={friends}
                    renderItem={({ item }) => {
                        return (
                            <MyFriends navigation={navigation} item={item} friendRemoved={friendRemoved} setfriendRemoved={setfriendRemoved} />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />

                : 
                <NothinToShow msg={'No Friends'}/>
                }
        </View>
    );
}


const styles = StyleSheet.create({})
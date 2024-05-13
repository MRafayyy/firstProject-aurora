
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
import MyAddedContactsComponent from "../components/MyAddedContactsComponent";

export default function Screen_ShowMyAddedContacts({ navigation }) {

    const { userId } = useContext(UserIdContext)
    const [contacts, setContacts] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [contactRemoved, setContactRemoved] = useState({})

    useEffect(() => {
        fetchContacts();
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        fetchFriends()

    }, []);


    const fetchContacts = async () => {
        try {
            const mongoId = userId.mongoId;
            let response = await fetch(`${ip}/women/show-my-added-contacts/${mongoId}`, {
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


                    const contactsData = response.map((contact) => ({

                        _id: contact._id,
                        name: contact.name,
                        email: contact.email
                    })
                    )

                    setContacts(contactsData)

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
            {contacts.length > 0 ?


                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    data={contacts}
                    renderItem={({ item }) => {
                        return (
                            <MyAddedContactsComponent navigation={navigation} item={item} contactRemoved={contactRemoved} setContactRemoved={setContactRemoved} />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />

                :
             
                <NothinToShow msg={'No Contacts'} />
            }
        </View>
    );
}


const styles = StyleSheet.create({})
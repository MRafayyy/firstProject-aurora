import React, { useEffect, useState, useContext, useCallback } from "react";

import { View, Pressable, Text, StyleSheet, BackHandler, FlatList, RefreshControl, refreshing, TextInput } from 'react-native'

// import EncryptedStorage from 'react-native-encrypted-storage'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
// import * as Keychain from 'react-native-keychain';
import ip from './IPaddress'

// import {getSocket} from '../components/sockets'
import UserDisplay from "../components/UserDisplay";
import UserIdContext from "../UserIdContext";




export default function Screen_SearchContacts({ navigation }) {

    const { userId } = useContext(UserIdContext)
    // const navigation = useNavigation();
const [searchText, setSearchText] = useState('')
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const [AllUsers, setAllUsers] = useState([]);
    const [requestSent, setrequestSent] = useState({})



    const fetchUsers = async () => {
        try {

            const mongoId = userId.mongoId;

            let response = await fetch(`${ip}/users/${mongoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            response = await response.json();
            setAllUsers(response)


        } catch (error) {
            console.log("error here ")
            console.log(error)
        }
    }



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', (e) => {
            fetchUsers()
        });

        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        fetchUsers()
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        fetchUsers()

    }, []);

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


    const handleOnChangeText = (text)=>{
setSearchText(text)
    }





    return (
        <>

            <View style={styles.body}>


<View style={{justifyContent: 'center', alignItems: 'center'}}>
<Pressable style={{width: responsiveWidth(80), height: responsiveHeight(6), borderWidth:1, paddingHorizontal: responsiveWidth(4) , borderColor: 'gray',borderRadius: 30}}><TextInput  value={searchText} onChangeText={(text)=>{handleOnChangeText(text)}} placeholder="search"></TextInput></Pressable>
</View>


                {/* <View style={{ justifyContent: 'center', alignItems: 'center',width: responsiveWidth(95) }}> */}


                {
                    <FlatList style={{ paddingTop: responsiveHeight(4), marginBottom: responsiveHeight(15) }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={AllUsers}
                        renderItem={({ item }) => {
                            return (
                                <UserDisplay item={item} requestSent={requestSent} setrequestSent={setrequestSent} />
                            )
                        }}
                        keyExtractor={(item, index) => index}
                    />

                }
                {/* </View> */}

            </View >

            {/* </ScrollView> */}
        </>
    )
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'flex-start'
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








































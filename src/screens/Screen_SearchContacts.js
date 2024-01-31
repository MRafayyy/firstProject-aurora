import React, { useEffect, useState, useContext, useCallback } from "react";

import { View, Pressable, StyleSheet, BackHandler, FlatList, RefreshControl, refreshing, TextInput, Image } from 'react-native'

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
    const [AllUsers2, setAllUsers2] = useState([]);
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
            setAllUsers2(response)


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


    const handleOnChangeText = (text) => {
        setSearchText(text)
    }


    const onSearch = (text)=>{


        const searchText = text.trim().toLowerCase();

    // Debugging: Log the search text
    // console.log("Search text:", searchText);

    if (searchText === '') {
        // If the search text is empty, reset to the original list
        setAllUsers(AllUsers2);
    } else {
        
        let tempList = AllUsers2.filter((item) => {
            if (item.name && typeof item.name === 'string') {
                return item.name.toLowerCase().startsWith(searchText);
                // return item.name.toLowerCase().includes(searchText);
                            // return (item.name.toLowerCase()).indexOf(text.trim().toLowerCase()) > -1;
            }
            return false;
        });

        // Debugging: Log the filtered list
        // console.log("Filtered list:", tempList);

        setAllUsers(tempList);
    }
    // ------------------------------------

        // let tempList = AllUsers.filter((item)=>{
        //     const searchText = text.trim().toLowerCase();
        //     // if(item.name!==undefined){

        //         // return (item.name.toLowerCase()).indexOf(text.trim().toLowerCase()) > -1;
        //         if (item.name && typeof item.name === 'string') {
        //     return item.name.toLowerCase().includes(searchText);
        // }
        //     // }
        // })
        // setAllUsers(tempList)

        // if(text.trim()===''){
        //     setAllUsers(AllUsers2)
        // }



    }




    return (
        <>

            <View style={styles.body}>


                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(3) }}>
                    <Pressable style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' ,width: responsiveWidth(89), height: responsiveHeight(6), borderWidth: 1, paddingHorizontal: responsiveWidth(3), borderColor: 'gray', borderRadius: 20 }}><Image source={require('../../assets/images/icons8-search-50.png')} style={{marginRight: responsiveWidth(1) ,width:responsiveWidth(6), height: responsiveWidth(6)}} /><TextInput style={{color: 'black', fontSize: responsiveFontSize(2)}} value={searchText} onChangeText={(text) => { handleOnChangeText(text); onSearch(text) }} placeholder="search name here..."></TextInput></Pressable>
                </View>


                {/* <View style={{ justifyContent: 'center', alignItems: 'center',width: responsiveWidth(95) }}> */}


                {
                    <FlatList style={{ marginTop: responsiveHeight(4), paddingBottom: responsiveHeight(10) }}
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








































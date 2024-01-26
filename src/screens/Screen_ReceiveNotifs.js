import React, { useEffect, useState } from 'react';
import { useBackHandler } from '@react-native-community/hooks'


const moment = require('moment-timezone');
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Button,
    PermissionsAndroid,
    Platform,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Keyboard,
    BackHandler,
    RefreshControl,
    FlatList
} from 'react-native';


import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import ip from './IPaddress';


export default function Screen_ReceiveNotifs({ navigation }) {


    const [Notifs, setNotifs] = useState([])
    const [NoAlerts, setNoAlerts] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    function handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }




    useEffect(() => {
        fetchNotifs()
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        fetchNotifs()

    }, []);



    const fetchNotifs = async () => {
        setNoAlerts(false)
        try {
            let response = await fetch(`${ip}/get-notifs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            response = await response.json();
            // console.log(response)
            if (response.length === 0) {
                setNoAlerts(true)
                return
            }
            else {
                setNotifs(response.reverse())
            }

        } catch (error) {
            console.log(error)
        }
    }




    const checking = (fetchedDate, fetchedTime) => {
      


        const parsedDate = moment.tz(fetchedDate, 'Asia/Karachi');

        // Function to format the date
        function formatDate(date) {
            const today = moment().tz('Asia/Karachi');
            console.log(today)
            const yesterday = moment().tz('Asia/Karachi').subtract(1, 'day');
        
            const dateFormatOptions = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            };
        
            if (date.isSame(today, 'day')) {
                return 'Today';
            } else if (date.isSame(yesterday, 'day')) {
                return 'Yesterday';
            } else {
                console.log(date.format('Do MMMM YYYY'))
                return date.format('Do MMMM YYYY');
            }
        }
        
        // Function to format the time
        function formatTime(time) {
            return time;
        }
        
        // Format the parsed date and time
        const formattedDate = formatDate(parsedDate);
        const formattedTime = formatTime(fetchedTime);


        // const parsedDate = new Date(fetchedDate);

     
        // function formatDate(date) {
        //     const today = new Date();
        //     const yesterday = new Date(today);
        //     yesterday.setDate(yesterday.getDate() - 1);

        //     const dateFormatOptions = {
        //         year: 'numeric',
        //         month: '2-digit',
        //         day: '2-digit'
        //     };
        //     console.log(date.toDateString())
        //     if (date.toDateString() === today.toDateString()) {
        //         return 'Today';
        //     } else if (date.toDateString() === yesterday.toDateString()) {
        //         return 'Yesterday';
        //     } else {
        //         return date.toLocaleDateString('en-US', dateFormatOptions);
        //     }
        // }

    
        // function formatTime(time) {
        //     return time;
        // }

        // const formattedDate = formatDate(parsedDate);
        // const formattedTime = formatTime(fetchedTime);

      

  

        if (formattedDate === "Yesterday") {
            return "Yesterday"
        }
        else if (formattedDate === "Today") {
            return fetchedTime
        }
        else {
            return formattedDate
        }

    }





    return (
        <>

            <View style={styles.body}>


                {/* <ScrollView
        contentContainerStyle={styles.body}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}


                <Text style={{ backgroundColor: '#0662bf', color: 'white', fontSize: responsiveFontSize(2.3), padding: responsiveWidth(5), borderBottomWidth: 1,fontWeight: '700' , borderColor: 'transparent', paddingLeft: responsiveWidth(12) }}>Notifications</Text>


                {NoAlerts ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: responsiveFontSize(2.3), color: 'black' }}>No alerts to show</Text></View>
                    :


                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={Notifs}
                        renderItem={({ item }) => {
                            return (
                                <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingTop: responsiveHeight(3), paddingBottom: responsiveHeight(3), paddingHorizontal: responsiveWidth(5), borderBottomWidth: 1, borderColor: 'gray', marginVertical: responsiveHeight(0) }}>

                                    <Image style={{ alignSelf: 'flex-start', width: responsiveWidth(14), height: responsiveHeight(6.5), resizeMode: 'cover', borderRadius: responsiveWidth(30) }} source={require('../../assets/images/speakerw1.jpeg')} /
                                    >

                                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: responsiveWidth(78) }}>

                                        <View style={{ flexDirection: 'row', marginBottom: responsiveHeight(0.4) }}>
                                            <Text style={{ flex: 1, fontSize: responsiveFontSize(2), textAlign: 'left', fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(4), color: '#0a0a0a' }}>{item.title}</Text>
                                            <Text style={{ fontSize: responsiveFontSize(1.3), paddingHorizontal: 10, paddingTop: responsiveHeight(0.4), textAlign: 'right', color: '#7a7a7a', marginLeft: responsiveWidth(4), marginRight: responsiveWidth(2) }}>{checking(item.date, item.time)}</Text>
                                        </View>

                                        <Text style={{ paddingRight: responsiveWidth(4), fontSize: responsiveFontSize(1.8), textAlign: 'left', marginLeft: responsiveWidth(4), color: '#7a7a7a' }}>{item.body}</Text>

                                    </View>

                                </Pressable>
                            )
                        }}
                        keyExtractor={(item, index) => index}
                    />
                }






                {/* </ScrollView> */}
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',

    }
})
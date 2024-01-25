import React, { useEffect, useState } from 'react';
import { useBackHandler } from '@react-native-community/hooks'


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
                setNotifs(response)
            }

        } catch (error) {
            console.log(error)
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


                <Text style={{ backgroundColor: '#0662bf', color: 'white', fontSize: responsiveFontSize(2.3), padding: responsiveWidth(5), borderBottomWidth: 1, borderColor: 'transparent', paddingLeft: responsiveWidth(12) }}>Notifications</Text>


                {NoAlerts ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: responsiveFontSize(2.3), color: 'black' }}>No alerts to show</Text></View>
                    :


                    <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                        data={Notifs}
                        renderItem={({ item }) => {
                            return (
                                <Pressable  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingTop: responsiveHeight(2), paddingBottom: responsiveHeight(2), paddingHorizontal: responsiveWidth(5), borderBottomWidth: 1, borderColor: 'gray' }}>

                                    <Image style={{ alignSelf: 'flex-start', width: responsiveWidth(16), height: responsiveHeight(9.5), resizeMode: 'cover', borderRadius: responsiveWidth(30) }} source={require('../../assets/images/womenAvatar.jpg')} /
                                    >

                                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: responsiveWidth(78) }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ flex: 1, fontSize: responsiveFontSize(2), textAlign: 'left', fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(4), fontWeight: '600', color: '#666666' }}>{item.title}</Text>
                                            <Text style={{ fontSize: responsiveFontSize(1.3), paddingHorizontal: 10, paddingTop: responsiveHeight(0.4), textAlign: 'right', color: '#7a7a7a', marginLeft: responsiveWidth(4), marginRight: responsiveWidth(2) }}>{item.time}</Text>
                                        </View>

                                        <Text style={{paddingRight: responsiveWidth(4), fontSize: responsiveFontSize(2), textAlign: 'left', fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(4), color: '#7a7a7a' }}>{item.body}</Text>

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
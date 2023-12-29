import React, { useState, useEffect } from 'react';


import NetInfo from "@react-native-community/netinfo";
import { addEventListener } from "@react-native-community/netinfo";

import { Stylesheet, Text, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// export default function NoInternet(){

export const useConnectionStatus = () => {
    const [isConnected, setisConnected] = useState(false);

    useEffect(() => {

        const unsubscribe = NetInfo.addEventListener((state) => {
            // console.log(state);
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setisConnected(state.isConnected)
        });
        return () => {
            unsubscribe();
        };

    }, [])

    // export isConnected
    return isConnected
    //         <>
    //         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>

    // <View style={{width: responsiveWidth(50), height: responsiveHeight(15),justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}> 

    //             <Text style={{color: 'white'}}>No Internet</Text>
    // </View>
    //         </View>
    //         </>

}
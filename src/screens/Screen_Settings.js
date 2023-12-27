
import React, {useEffect} from "react";

import { BackHandler } from "react-native";

export default function Screen_Settings({navigation}){


    function handleBackButtonClick() {
        navigation.navigate('Home');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);




    return(
        <>
        
        </>
    )
}
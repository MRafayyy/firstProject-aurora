import React, { useState, useEffect, useRef, PropsWithChildren } from "react";

import GlobalStyle from "../utils/GlobalStyle";

// import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Camera } from "react-native-vision-camera";
import { ActivityIndicator } from "react-native-paper";

export default function Screen_Home({ navigation, route }) {


    const [ImageData, setImageData] = useState('');
    const [takePhotoClicked, settakePhotoClicked] = useState(false);



    const Logout = async () => {
        await Keychain.resetGenericPassword();
        navigation.navigate('Screen_Login');


    }

    const GoToHomePage = () => {

        navigation.navigate('Screen_Home');
    }

    const camera = useRef(null)
    const devices = Camera.getAvailableCameraDevices()
    const device = devices.find((d) => d.position === 'back')
    // const device = useCameraDevice('back');
    // const device = useCameraDevices
    // const device = devices.back;
    useEffect(() => {
        checkPermission();
    }, [])

    const checkPermission = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus()
        const microphonePermission = await Camera.getMicrophonePermissionStatus()
        console.log(cameraPermission)

        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()

    }

    const takePicture = async()=>{

        if(camera!= null){

            const photo = await camera.current.takePhoto({
            // flash: 'on' // 'auto' | 'off'
        })
        setImageData(photo.path);
        console.log(photo.path)
    }
    }


    if (device == null) return <ActivityIndicator />
    return (
        <>
            {/* <View style={styles.body}>
                <Text style={[styles.text, GlobalStyle.CustomFont]}>Wlcome to the screen after home screen</Text>
                <Pressable onPress={Logout} style={{ backgroundColor: 'orange' }}>
                    <Text style={styles.text}>Logout</Text>
                </Pressable>
                <Pressable onPress={GoToHomePage} style={{ backgroundColor: 'orange' }}>
                    <Text style={styles.text}>Go to Home Page</Text>
                </Pressable>
            </View> */}
            <View style={{ flex: 1 }}>
                {takePhotoClicked?(<View style={{flex:1}}>
                <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                ref={camera}
                photo={true}
                />
                <Pressable onPress={takePicture} style={{ width: 60, height: 60, position: 'absolute', backgroundColor: 'red', borderRadius: 30, bottom: 50, alignSelf: 'center' }}></Pressable>
                </View>):(
                    <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                        <Pressable style={{width:'90%', height: 50,borderWidth: 1, alignSelf:'center'}}>Click Photo</Pressable>
                    </View>
                )}

       
            </View>
        </>
    )
}




const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        margin: 10,
        fontSize: 20,
        // fontWeight: '600',
        color: 'black',
        textAlign: 'left'
    },

});
import React, { useState, useEffect, useRef, PropsWithChildren } from "react";

// import GlobalStyle from "../utils/GlobalStyle";

// import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    // TextInput,
    Image,
    BackHandler
} from 'react-native';
import Video from 'react-native-video'
import * as Keychain from 'react-native-keychain';
import { Camera, useCameraDevice, useCameraFormat } from "react-native-vision-camera";
import { ActivityIndicator } from "react-native-paper";
// import { Image } from "react-native-paper/lib/typescript/components/Avatar/Avatar";

export default function Screen_Home({ navigation, route }) {


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


    const [ImageData, setImageData] = useState('');
    const [takePhotoClicked, settakePhotoClicked] = useState(false);
    const [VideoData, setVideoData] = useState('');
    const [takeVideoClicked, settakeVideoClicked] = useState(false);



    const Logout = async () => {
        await Keychain.resetGenericPassword();
        navigation.navigate('Screen_Login');


    }

    const GoToHomePage = () => {

        navigation.navigate('Screen_Home');
    }

    const camera = useRef(null)
    // const devices = Camera.getAvailableCameraDevices()
    // const device = devices.find((d) => d.position === 'back')

    const device = useCameraDevice('back')
    const format = useCameraFormat(device, [
        { videoResolution: { width: 1280, height: 720 },
        // { videoResolution: { width: 3048, height: 2160 },
         pixelFormat: 'native' }, // if i dont specify vidresol then Error retrieving camcorder profile params
        { fps: 30 }
        ])


    // width: 3048, height: 2160
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

    const takePicture = async () => {

        if (camera != null) {

            const photo = await camera.current.takePhoto({
                
            })
            setImageData(photo.path);
            settakePhotoClicked(false)
            console.log(photo.path)
        }
    }

    const startRecording = () => {

        console.log("start recording clicked")
          camera.current.startRecording({
            onRecordingFinished: (video) => {console.log(video); setVideoData(video.path)},
            onRecordingError: (error) => console.error(error)
          });
       

        // camera.current.startRecording({
        //     flash: 'on',
        //     onRecordingFinished: (video) => console.log(video),
        //     onRecordingError: (error) => console.error(error),
            
        // })
    }
    const stopRecording = async () => {
try {
    
    settakePhotoClicked(false)
    await camera.current.stopRecording()
} catch (error) {
    console.log(error)
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
            <View style={{ flex: 1, justifyContent: 'center'}}>
                {takePhotoClicked ? (<View style={{ flex: 1}}>
                    <Camera
                    onInitialized={()=>console.log("initialized cam")}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={true}
                        ref={camera}
                        photo={true}
                        video={true}
                        audio={true}
                        format={format}
                        // videoStabilizationMode='cinematic'
                    />

                    <Pressable onPress={takePicture} style={{ width: 60, height: 60, position: 'absolute', backgroundColor: 'red', borderRadius: 30, bottom: 50, alignSelf: 'center' }}></Pressable>
                    <Pressable onPress={startRecording} style={{ width: 60, height: 60, position: 'absolute', backgroundColor: 'blue', borderRadius: 30, bottom: 50, alignSelf: 'flex-start' }}></Pressable>
                    <Pressable onPress={stopRecording} style={{ width: 60, height: 60, position: 'absolute', backgroundColor: 'yellow', borderRadius: 30, bottom: 50, alignSelf: 'flex-end' }}></Pressable>
                </View>) : (
                    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                        {ImageData !== '' && <Image source={{ uri: 'file://' + ImageData }} style={{width: '90%', height: '10%' }} />}
                        {VideoData !== '' && <Video resizeMode={'cover'} source={{ uri: 'file://' + VideoData }} style={{ borderWidth: 0, borderColor:'red', width: "100%", height: "90%" }} />}
                        <Pressable onPress={() => settakePhotoClicked(true)} style={{ width: '90%', height: 50, borderWidth: 1, alignSelf: 'center', justifyContent: 'center' }}><Text style={{color: 'black'}}>Click Photo </Text></Pressable>
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
import React, { useState, useEffect, useRef, PropsWithChildren, useContext } from "react";

// import GlobalStyle from "../utils/GlobalStyle";

// import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    PermissionsAndroid,
    // TextInput,
    Image,
    BackHandler,
    Platform,
    Alert
} from 'react-native';
import * as Progress from 'react-native-progress';
import Video from 'react-native-video'
import * as Keychain from 'react-native-keychain';
import { Camera, useCameraDevice, useCameraFormat } from "react-native-vision-camera";
import { ActivityIndicator } from "react-native-paper";
import storage from '@react-native-firebase/storage';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import UserIdContext from "../UserIdContext";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import ip from "./IPaddress";
// import { Image } from "react-native-paper/lib/typescript/components/Avatar/Avatar";

export default function Screen_Home({ navigation, route }) {


    const { userId } = useContext(UserIdContext)

    function handleBackButtonClick() {
        navigation.navigate('Screen_Home');
        return true;
    }

    useEffect(() => {
        console.log("Screen_Home2 rendered");
        checkPermission();

        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };


       
    }, []);

    let intervalId;
    const [UploadStatus, setUploadStatus] = useState("Rescue")
    const [UploadinProgress, setUploadinProgress] = useState(false);
    const [progress, setProgress] = useState(0)
    const [hasInitialized, sethasInitialized] = useState(false)
    const [Counter, setCounter] = useState(0);
    const [ImageData, setImageData] = useState('');
    const [RescueButtonClicked, setRescueButtonClicked] = useState(false);
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
        {
            videoResolution: { width: 1280, height: 720 },
            // { videoResolution: { width: 3048, height: 2160 },
            pixelFormat: 'native'
        }, // if i dont specify vidresol then Error retrieving camcorder profile params
        { fps: 30 }
    ])


    // width: 3048, height: 2160
    // const device = useCameraDevice('back');
    // const device = useCameraDevices
    // const device = devices.back;

    // useEffect(() => {
    //     checkPermission();
    //     console.log("Screen_Home2 rendered");
    //     // hasAndroidPermission();
    // }, [])


    async function hasAndroidPermission() {
        const getCheckPermissionPromise = () => {

            if (Platform.Version >= 33) {
                return Promise.all([
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
                ]).then(
                    ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
                        hasReadMediaImagesPermission && hasReadMediaVideoPermission,
                );
            } else {
                return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            }
        };

        const hasPermission = await getCheckPermissionPromise();
        if (hasPermission) {
            return true;
        }
        const getRequestPermissionPromise = async () => {
            if (Platform.Version >= 33) {
                return PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                ]).then(
                    (statuses) =>
                        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                        PermissionsAndroid.RESULTS.GRANTED,
                );
            } else {
                return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
            }
        };

        return await getRequestPermissionPromise();
    }

    async function savePicture() {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
        }

        CameraRoll.saveAsset(tag, { type, album })
    };

    const checkPermission = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus()
        const microphonePermission = await Camera.getMicrophonePermissionStatus()
        console.log(cameraPermission)


        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()


        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            // console.log(await hasAndroidPermission())
            console.log("Permission not granted")
            
        }
    }




    const takePicture = async () => {

        if (camera != null) {

            const photo = await camera.current.takePhoto({

            })
            setImageData(photo.path);
            setRescueButtonClicked(false)
            console.log(photo.path)
        }
    }

    const startRecording = () => {

        if (!hasInitialized) {
            setProgress(0)
            console.log("start recording clicked")
            camera.current.startRecording({
                onRecordingFinished: async (video) => {
                    console.log(video);
                    setVideoData(video.path);
                    uploadVideo(video.path)
                    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
                        console.log(await hasAndroidPermission())
                        return;
                    }
                    await CameraRoll.saveAsset(`file://${video.path}`, {
                        type: 'video',
                    })
                },
                onRecordingError: (error) => console.error(error)
            });
            sethasInitialized(true)
        }

        // camera.current.startRecording({
        //     flash: 'on',
        //     onRecordingFinished: (video) => console.log(video),
        //     onRecordingError: (error) => console.error(error),

        // })
    }

    const uploadVideo = async (vpath) => {
        setUploadStatus("Uploading video...")
        setUploadinProgress(true)
        const timestamp = Date.now();
        const date = new Date(timestamp);

        // Get hours and minutes
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12 || 12;

        // Format the date as a string
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

        const reference = storage().ref(`${userId.userId}/video-${formattedDate}.mov`);

        const pathToFile = `file://${vpath}`;
        console.log(pathToFile)
        // uploads file
        const task = reference.putFile(pathToFile);
        console.log("upload vid response: " + task)
        let a = 0
        task.on('state_changed', taskSnapshot => {
            a = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
            // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            // console.log(a);
            setProgress(a)
            setUploadStatus("Uploading video...")

        });

        task.then(async () => {
            try {
                
                console.log('Video uploaded to the bucket!');
                console.log(reference)
                const url = await reference.getDownloadURL();
                console.log("donwload url is: "+url)
                let response = await fetch(`${ip}/save-download-url/${userId.mongoId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({downloadUrl: url})
            })
            response =await response.json();
            if(response.success===true){
                console.log("saved to db")
            }

            Alert.alert("Upload successful", "Video recording has been sent")
            setUploadStatus("Rescue")
            setUploadinProgress(false)
            console.log(url)
        } catch (error) {
            console.log(error)
            Alert.alert("Upload not successful", error.message)
            setUploadStatus("Rescue")
            setUploadinProgress(false)
        }
        });


    }



    const stopRecording = async () => {
        console.log("stop recording clicked")
        try {
            sethasInitialized(false)
            clearInterval(intervalId);
            await camera.current.stopRecording()
            setRescueButtonClicked(false)

            // uploadVideo()
        } catch (error) {
            console.log(error)
        }
    }


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };


    const RecordingInitiation = () => {
        setRescueButtonClicked(true)

        // const intervalId = setInterval(() => {
        //     setCounter(Counter + 1);
        // }, 1000)

    }


    if (device == null) return <ActivityIndicator />
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
                {RescueButtonClicked ? (<View style={{ flex: 1 }}>
                    <Camera
                        onInitialized={() => {
                            console.log("initialized cam"); startRecording();
                            const intervalId = setInterval(() => {
                                // setCounter(Counter++);
                                setCounter((prevCounter) => prevCounter + 1);
                            }, 1000)
                        }}
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
                    {/* <Pressable onPress={takePicture} style={{ width: 60, height: 60, position: 'absolute', backgroundColor: 'red', borderRadius: 30, bottom: 50, alignSelf: 'center' }}></Pressable> */}
                    {/* <Pressable onPress={startRecording} style={{ width: 60, height: 60, position: 'absolute', backgroundColor: 'blue', borderRadius: 30, bottom: 50, alignSelf: 'flex-start' }}></Pressable> */}
                    {/* <Text style={{ textAlign: 'center' }}>Duration: {Counter}</Text> */}
                    <Pressable onPress={() => { console.log("stop recording clicked here"); stopRecording() }} style={({ pressed }) => [pressed ? { opacity: 0.8 } : { width: 60, height: 70, position: 'absolute', backgroundColor: 'yellow', borderRadius: 30, bottom: 25, alignSelf: 'center', justifyContent: 'center' }]}></Pressable>
                </View>) : (
                    <View style={{ flex: 1, justifyContent: 'flex-start', gap: responsiveHeight(3), alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(5), fontWeight: '900', marginTop: responsiveHeight(4), color: 'black' }}>Rescue Button</Text>
                        <Text style={{ textAlign: 'left', fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(10), color: 'black' }}>Tap the Rescue Button when you need urgent help.
                            {'\n'}
                            {'\n'}
                            Here's what it does:
                            {'\n'}
                            {'\n'}
                            - Record Video & Sound:
                            {'\n'}
                            Starts recording what's happening around you.
                            {'\n'}
                            {'\n'}
                            - Share Your Location:
                            {'\n'}
                            Sends your location to security agencies and trusted contacts.
                            {'\n'}
                            {'\n'}
                            - Emergency Alert:
                            {'\n'}
                            Notifies nearby security agencies with your situation details.
                            {'\n'}
                            {'\n'}
                            - Alerts Close Contacts:
                            {'\n'}
                            Tells your close contacts about the emergency and where you are.
                            {'\n'}
                            {'\n'}
                            - Stay Connected:
                            {'\n'}
                            Keeps sharing updates until you confirm you're safe.</Text>
                       {/* <Video resizeMode={'cover'} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/aurora-51db1.appspot.com/o/Rafay%2Fvideo-2024-01-29%2009%3A16%20AM.mov?alt=media&token=57793d02-6512-4eec-a440-772e37917d9c'}} style={{ borderWidth: 0, borderColor: 'red', width: "100%", height: "30%" }} /> */}
                        <Progress.Bar progress={progress} width={200} />
                        {/* {ImageData !== '' && <Image source={{ uri: 'file://' + ImageData }} style={{ width: '90%', height: '10%' }} />} */}
                       {/* <Video resizeMode={'cover'} source={{ uri: 'file://' + VideoData }} style={{ borderWidth: 0, borderColor: 'red', width: "100%", height: "90%" }} /> */}
                        <Pressable onPress={() => {
                            RecordingInitiation();
                        }
                        } disabled={UploadinProgress} style={{ width: '75%', height: 50, backgroundColor: '#0662bf', borderWidth: 1, marginTop: responsiveHeight(1), borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}><Text style={{ fontSize: responsiveFontSize(2.2), color: 'white', textAlign: 'center' }}>{UploadStatus}</Text></Pressable>
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
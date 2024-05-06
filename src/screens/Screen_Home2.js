import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  // TextInput,
  Image,
  BackHandler,
  Platform,
  Alert,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {ActivityIndicator} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import UserIdContext, {LocationsContext} from '../UserIdContext';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ip from './IPaddress';
import useLocationUpdates from '../components/useLocationUpdates';
import CustomModalComponent from '../components/CustomModalComponent';
import imageNames from '../../assets/imageNames/imageNames';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';

export default function Screen_Home({navigation, route}) {
  const {userId, setUserId} = useContext(UserIdContext);

  let intervalId;
  const [UploadStatus, setUploadStatus] = useState('Rescue');
  const [UploadinProgress, setUploadinProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasInitialized, sethasInitialized] = useState(false);
  const [Counter, setCounter] = useState(0);
  const [ImageData, setImageData] = useState('');
  const [RescueButtonClicked, setRescueButtonClicked] = useState(false);
  const [VideoData, setVideoData] = useState('');
  const [takeVideoClicked, settakeVideoClicked] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [wantToAdd, setWantToAdd] = useState(false);
  const [Done, setDone] = useState(true);

  const {
    myLocation,
    error,
    isActive,
    startLocationUpdates,
    stopLocationUpdates,
  } = useLocationUpdates();

  console.log('Screen_Home2 rendered');

  const StartMyLocation = async () => {
    startLocationUpdates();

    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {formattedTime, formattedDay} = getFormattedTimeandDay();

          const object = {
            timeWhenRescueButtonPressed: formattedTime,
            dateWhenRescueButtonPressed: formattedDay,
            locationWhereRescuePressed: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            safeButtonPressed: false,
          };

          let response = await fetch(
            `${ip}/pressedRescueButton/${userId.mongoId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(object),
            },
          );

          response = await response.json();
          console.log('api working' + response);
        } catch (error) {
          console.log('api error');
          // Alert.alert("api error", error.message)
          console.log(error);
        }
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );

    console.log('Home2: Start location clicked');
  };
  // , [startLocationUpdates]);

  const StopMyLocation = useCallback(async () => {
    stopLocationUpdates();

    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {formattedTime, formattedDay} = getFormattedTimeandDay();
          const object = {
            safeButtonPressed: true,
            timeWhenSafeButtonPressed: formattedTime,
            dateWhenSafeButtonPressed: formattedDay,
            locationWhereSafeButtonPressed: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };

          let response = await fetch(
            `${ip}/pressedSafeButton/${userId.mongoId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(object),
            },
          );

          response = await response.json();
          console.log('api working' + response);
        } catch (error) {
          console.log(error);
        }
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
      },
    );

    console.log('Home2: Stop location clicked');
  }, [stopLocationUpdates]);

  const getFormattedTimeandDay = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;

    const formattedDay = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return {formattedTime, formattedDay};
  };

  const getAllpermissions = async () => {
    await requestLocationPermission();
    await checkPermission();
  };

  function handleBackButtonClick() {
    navigation.navigate('Screen_Home');
    return true;
  }

  useEffect(() => {
    getAllpermissions();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [navigation]);

  // -----------------------------------------location Permission start
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Please allow location permissions to continue...',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // -----------------------------------------location Permission end

  // -----------------------------------------------------------

  const camera = useRef(null);
  // const devices = Camera.getAvailableCameraDevices()
  // const device = devices.find((d) => d.position === 'back')

  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [
    {
      videoResolution: {width: 1280, height: 720},
      // { videoResolution: { width: 3048, height: 2160 },
      pixelFormat: 'native',
    }, // if i dont specify vidresol then Error retrieving camcorder profile params
    {fps: 30},
  ]);

  // width: 3048, height: 2160
  // const device = useCameraDevice('back');
  // const device = useCameraDevices
  // const device = devices.back;

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
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
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.saveAsset(tag, {type, album});
  }

  const checkPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
    console.log(cameraPermission);

    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();

    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      // console.log(await hasAndroidPermission())
      console.log('Permission not granted');
    }
  };

  const takePicture = async () => {
    if (camera != null) {
      const photo = await camera.current.takePhoto({});
      setImageData(photo.path);
      setRescueButtonClicked(false);
      console.log(photo.path);
    }
  };

  const startRecording = () => {
    if (!hasInitialized) {
      setProgress(0);
      console.log('start recording clicked');
      camera.current.startRecording({
        onRecordingFinished: async video => {
          console.log(video);
          setVideoData(video.path);
          uploadVideo(video.path);
          if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
            console.log(await hasAndroidPermission());
            return;
          }
          await CameraRoll.saveAsset(`file://${video.path}`, {
            type: 'video',
          });
        },
        onRecordingError: error => console.error(error),
      });
      sethasInitialized(true);
    }

    // camera.current.startRecording({
    //     flash: 'on',
    //     onRecordingFinished: (video) => console.log(video),
    //     onRecordingError: (error) => console.error(error),

    // })
  };

  const uploadVideo = async vpath => {
    setUploadStatus('Uploading video...');
    setUploadinProgress(true);
    const timestamp = Date.now();
    const date = new Date(timestamp);

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format the date as a string
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    const reference = storage().ref(
      `${userId.userId}/video-${formattedDate}.mov`,
    );

    const pathToFile = `file://${vpath}`;
    console.log(pathToFile);
    // uploads file
    const task = reference.putFile(pathToFile);
    console.log('upload vid response: ' + task);
    let a = 0;
    task.on('state_changed', taskSnapshot => {
      a = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      // console.log(a);
      setProgress(a);
      setUploadStatus('Uploading video...');
    });

    task.then(async () => {
      try {
        console.log('Video uploaded to the bucket!');
        console.log(reference);
        const url = await reference.getDownloadURL();
        console.log('donwload url is: ' + url);
        let response = await fetch(
          `${ip}/save-download-url/${userId.mongoId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({downloadUrl: url}),
          },
        );
        response = await response.json();
        if (response.success === true) {
          console.log('saved to db');
        }

        Alert.alert('Upload successful', 'Video recording has been sent');
        setUploadStatus('Rescue');
        setUploadinProgress(false);
        console.log(url);
      } catch (error) {
        console.log(error);
        Alert.alert('Upload not successful', error.message);
        setUploadStatus('Rescue');
        setUploadinProgress(false);
      }
    });
  };

  const stopRecording = async () => {
    console.log('stop recording clicked');
    try {
      sethasInitialized(false);
      clearInterval(intervalId);
      await camera.current.stopRecording();
      setRescueButtonClicked(false);

      // uploadVideo()
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  const RecordingInitiation = () => {
    setRescueButtonClicked(true);
  };

  if (device == null) return <ActivityIndicator />;
  return (
    <>
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        {RescueButtonClicked ? (
          <View style={{flex: 1}}>
            <Camera
              onInitialized={() => {
                console.log('initialized cam');
                startRecording();
              }}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              ref={camera}
              photo={true}
              video={true}
              audio={true}
              format={format}
            />

            <TouchableOpacity
              onPress={() => {
                console.log('stop recording clicked here');
                stopRecording();
              }}
              style={styles.stopRecordingBtn}></TouchableOpacity>
          </View>
        ) : (
          <>
            <CustomModalComponent
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              wantToAdd={wantToAdd}
              setWantToAdd={setWantToAdd}
              submissionDataTitle={'You cannot access google maps!'}
              submissionDataBody={`Map will be accessible after enabling location updates via rescue button`}
              submissionDataImage={imageNames.blackError}
              oneBtnOnly={true}
            />

            <View style={styles.customHeaderStyle}>
              <TouchableOpacity onPress={() => {}} style={styles.openmapBtn}>
                <MaterialCommunityIcons
                  name="map"
                  size={32}
                  color={isActive === false ? 'red' : 'green'}
                  onPress={() => {
                    if (isActive === true) {
                      navigation.navigate('Screen_Maps');
                    } else {
                      setModalVisible(true);
                    }
                  }}
                />
              </TouchableOpacity>

              <Text style={styles.guidelineText}>
                Tap the Rescue Button when you need urgent help.
                {'\n'}
                {'\n'}
                Here's what it does:
                {'\n'}
                {'\n'}- Record Video & Sound:
                {'\n'}
                Starts recording what's happening around you.
                {'\n'}
                {'\n'}- Share Your Location:
                {'\n'}
                Sends your location to security agencies and trusted contacts.
                {'\n'}
                {'\n'}- Alerts Close Contacts:
                {'\n'}
                Tells your close contacts about the emergency and where you are.
                {'\n'}
                {'\n'}- Stay Connected:
                {'\n'}
                Keeps sharing updates until you confirm you're safe.
              </Text>
              {/* <Video resizeMode={'cover'} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/aurora-51db1.appspot.com/o/Rafay%2Fvideo-2024-01-29%2009%3A16%20AM.mov?alt=media&token=57793d02-6512-4eec-a440-772e37917d9c'}} style={{ borderWidth: 0, borderColor: 'red', width: "100%", height: "30%" }} /> */}
              <Progress.Bar progress={progress} width={200} />
              {/* {ImageData !== '' && <Image source={{ uri: 'file://' + ImageData }} style={{ width: '90%', height: '10%' }} />} */}
              {/* <Video resizeMode={'cover'} source={{ uri: 'file://' + VideoData }} style={{ borderWidth: 0, borderColor: 'red', width: "100%", height: "90%" }} /> */}
              <TouchableOpacity
                onPress={async () => {
                  setDone(true);
                  await StartMyLocation();
                  // RecordingInitiation();
                }}
                disabled={
                  isActive === true
                    ? true
                    : UploadinProgress === true
                    ? true
                    : false
                }
                style={[
                  {
                    backgroundColor:
                      isActive === false ? colors.red : colors.green,
                  },
                  styles.rescueBtn,
                ]}>
                <Text style={styles.rescueBtnText}>{UploadStatus}</Text>
              </TouchableOpacity>
              {/* -----------------another btn--------------- */}

              <TouchableOpacity
                onPress={() => {
                  StopMyLocation();
                }}
                disabled={!isActive}
                // disabled={UploadinProgress}
                style={[
                  {
                    backgroundColor:
                      isActive === true ? colors.red : colors.green,
                  },
                  styles.rescueBtn,
                ]}>
                <Text style={styles.rescueBtnText}>I am Safe</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
  },
  stopRecordingBtn: {
    width: responsiveWidth(20),
    height: responsiveHeight(20 / 2),
    position: 'absolute',
    backgroundColor: 'yellow',
    borderRadius: 100,
    bottom: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  customHeaderStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: responsiveHeight(3),
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  openmapBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: responsiveScreenWidth(4),
    paddingHorizontal: 9,
  },
  guidelineText: {
    textAlign: 'left',
    fontSize: responsiveFontSize(2.1),
    paddingHorizontal: responsiveWidth(8),
    fontFamily: fontFamily.Regular,
    color: 'black',
  },
  rescueBtn: {
    width: '75%',
    height: 50,
    borderWidth: 1,
    marginTop: responsiveHeight(1),
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  rescueBtnText: {
    fontSize: responsiveFontSize(2.1),
    color: 'white',
    textAlign: 'center',
    fontFamily: fontFamily.SemiBold,
    lineHeight: responsiveHeight(3),
  },
});

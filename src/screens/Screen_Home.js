import React, {useState, useEffect, useContext, useRef} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView,
  FlatList,
  RefreshControl,
  Refreshing,
  onRefreshHandler,
  AppState,
} from 'react-native';
import ip from './IPaddress';
import BackgroundService from 'react-native-background-actions';

import PushNotification from 'react-native-push-notification';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useConnectionStatus} from '../components/NoInternet';
import EncryptedStorage from 'react-native-encrypted-storage';
import UserIdContext from '../UserIdContext';
import Geolocation from 'react-native-geolocation-service';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

export default function Screen_Home({navigation, route}) {
  console.log('Screen_Home rendered');
  const isConnected = useConnectionStatus();
  const {userId, setUserId} = useContext(UserIdContext);
  const [seeColor, setSeeColor] = useState('red');

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

//   useEffect(()=>{
//     for (let i = 0; i<1000000; i++) {
//                     console.log(i)
//                   }
//   },[])

//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', nextAppState => {
//       if (
//         appState.current.match(/inactive|background/) &&
//         nextAppState === 'active'
//       ) {
//         console.log('App has come to the foreground!');
//         setSeeColor('green');
//       }else{

//           for (let i = 0; i<10000; i++) {
//             console.log(i)
//           }
          
//     }
//       appState.current = nextAppState;
//       setAppStateVisible(appState.current);
//       console.log('AppState', appState.current);
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);


  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            // console.log(i)
            Geolocation.getCurrentPosition(
                async position => {
          console.log(position.coords.latitude+"  "+ position.coords.longitude)
          await BackgroundService.updateNotification({
                    taskDesc: 'New ExampleTask description ' + position.coords.latitude,
                  });
          
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
        await sleep(delay);
        
    }
    //   const id = Geolocation.watchPosition(
    //     async position => {
    //       console.log(position.coords);
    //       await BackgroundService.updateNotification({
    //         taskDesc: 'New ExampleTask description ' + position.coords.latitude,
    //       });
    //       //   setmyLocation(position.coords);
    //       //   setmLocation({loc: position.coords});

    //       //   console.log('i AM THE HOOK');

    //       //   socket.emit('shareCoordinates', {
    //       //     userId: UID,
    //       //     mongoId: MID,
    //       //     Location: position.coords,
    //       //   });
    //     },
    //     error => {
    //       console.log(error);
    //     },
    //     {
    //       enableHighAccuracy: false,
    //       timeout: 5000,
    //       maximumAge: 0,
    //       interval: 1000,
    //       // distanceFilter: 5,
    //       // Other options as needed
    //     },
    //   );
      await sleep(delay);
      //   }
    });
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 5000,
    },
  };

  const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    // await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
  };

  const stopBackgroiundService = async () => {
    await BackgroundService.stop();
  };

  //   async function retrieveUserSession() {
  //     try {
  //       const session = await EncryptedStorage.getItem('user_session');

  //       if (session !== undefined) {
  //         const parsedSession = JSON.parse(session);
  //         if (parsedSession['clientId']) {
  //           return parsedSession['clientId']; // Return the clientId
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving user session:', error);
  //     }
  //     return null; // Return null if clientId is not available
  //   }

  // ---------------------------------------------------------------------

  function handleBackButtonClick() {
    // Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
    //     {
    //       text: 'Cancel',
    //       onPress: () => null,
    //       style: 'cancel',
    //     },
    //     {text: 'YES', onPress: () => BackHandler.exitApp()},
    //   ]);
    BackHandler.exitApp();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleNotification = () => {
    // PushNotification.cancelAllLocalNotifications(); //previous notifs will be cancelled

    console.log('notif clicked');

    PushNotification.localNotification({
      channelId: 'test-channel',
      channelName: 'Test Channel',
      title: 'You clicked on test notif button',
      message: 'Message',
      bigText: 'Yuhu is name of the famous chinese dish',
      foreground: true,
      showWhen: true,
      color: 'red',
      largeIconUrl:
        'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    });

    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      channelName: 'Test Channel',
      title: 'delayed one',
      message: 'you have been here for 10 secs',
      date: new Date(Date.now() + 10 * 1000),
      allowWhileIdle: true,
    });
  };

  // const NextScreen = async () => {
  //     try {
  //         let url = `${ip}/verifyToken`
  //         const credentials = await Keychain.getGenericPassword();
  //         let response = await fetch(url, {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': "application/json"
  //             },
  //             body: JSON.stringify(credentials)
  //         })
  //         response = await response.json();
  //         if (response.success === true) {
  //             console.log("hurrah token validated")
  //             navigation.navigate('Screen_Home2');
  //         }
  //         else if (response.success === false) {
  //             navigation.navigate('Screen_Login')
  //             console.log("oh oh token expired so go back to login page")
  //         }

  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <>
      {/* <ScrollView> */}

      <View style={styles.body}>
        <Text
          style={{
            textAlign: 'left',
            color: '#0662bf',
            fontSize: responsiveFontSize(4),
            fontWeight: '900',
            margin: responsiveWidth(3),
          }}>
          Aurora
        </Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(4),
          }}>
          <View
            style={{
              marginTop: responsiveHeight(10),
              marginBottom: responsiveHeight(3),
              width: responsiveWidth(55),
              height: responsiveHeight(6),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isConnected ? 'green' : 'red',
            }}>
            <Text style={{color: 'white'}}>
              {isConnected
                ? 'You are connected to the internet'
                : 'No Internet'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={async () => await startBackgroundService()}
            style={{backgroundColor: 'orange', marginTop: 30}}>
            <Text style={(styles.text, {margin: 10})}>Start bgs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={stopBackgroiundService}
            style={{backgroundColor: 'orange', marginTop: 30}}>
            <Text style={(styles.text, {margin: 10})}>Stop bg</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: 'orange', marginTop: 30}}>
            <Text style={(styles.text, {margin: 10})}>{seeColor}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: 'orange', marginTop: 30}}>
            <Text style={(styles.text, {margin: 10})}>{appStateVisible}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  text: {
    margin: 10,
    fontSize: 20,
    // fontWeight: '600',
    color: 'black',
    textAlign: 'left',
  },
});

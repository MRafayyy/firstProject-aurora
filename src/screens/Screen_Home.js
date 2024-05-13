import React, { useState, useEffect, useContext, useRef } from 'react';

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
import { useConnectionStatus } from '../components/NoInternet';
import UserIdContext from '../UserIdContext';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontFamily from '../../assets/fontFamily/fontFamily';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

export default function Screen_Home({ navigation, route }) {
  console.log('Screen_Home rendered');
  const isConnected = useConnectionStatus();
  const [seeColor, setSeeColor] = useState('red');

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [userInfo, setUserInfo] = useState('')


  useEffect(() => {

    const getUserInfo = async () => {
      const info = await AsyncStorage.getItem('userInfo')
      setUserInfo(JSON.parse(info));
    }

    getUserInfo();
  }, [])



  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        // console.log(i)
        Geolocation.getCurrentPosition(
          async position => {
            console.log(
              position.coords.latitude + '  ' + position.coords.longitude,
            );
            await BackgroundService.updateNotification({
              taskDesc:
                'New ExampleTask description ' + position.coords.latitude,
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

  return (
    <>
      {/* <ScrollView> */}

      <View style={styles.body}>
        <Text
          style={{
            textAlign: 'left',
            color: '#0662bf',
            fontSize: responsiveFontSize(4),
            margin: responsiveWidth(3),
            fontFamily: fontFamily.Bold
          }}>
          Aurora
        </Text>

        <Text style={{
          textAlign: 'center',
          color: '#0662bf',
          fontSize: responsiveFontSize(3),
          margin: responsiveWidth(3),
          fontFamily: fontFamily.Regular
        }}>Welcome {userInfo.name}</Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(1),
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
            <Text style={{ color: 'white' }}>
              {isConnected
                ? 'You are connected to the internet'
                : 'No Internet'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={async () => await startBackgroundService()}
            style={{ backgroundColor: 'orange', marginTop: 30 }}>
            <Text style={(styles.text, { margin: 10 })}>Start bgs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={stopBackgroiundService}
            style={{ backgroundColor: 'orange', marginTop: 30 }}>
            <Text style={(styles.text, { margin: 10 })}>Stop bg</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'orange', marginTop: 30 }}>
            <Text style={(styles.text, { margin: 10 })}>{seeColor}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'orange', marginTop: 30 }}>
            <Text style={(styles.text, { margin: 10 })}>{appStateVisible}</Text>
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

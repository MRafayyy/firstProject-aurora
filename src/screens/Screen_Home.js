import React, { useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  BackHandler,
} from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useConnectionStatus } from '../components/NoInternet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontFamily from '../../assets/fontFamily/fontFamily';


export default function Screen_Home({ navigation, route }) {


  console.log('Screen_Home rendered');
  const isConnected = useConnectionStatus();
  const [userInfo, setUserInfo] = useState('')


  useEffect(() => {

    const getUserInfo = async () => {
      const info = await AsyncStorage.getItem('userInfo')
      setUserInfo(JSON.parse(info));
    }

    getUserInfo();
  }, [])

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

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    margin: 10,
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
  },
});

import React, { useContext, useEffect } from 'react';

import {
  BackHandler,
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import socket from '../components/SocketService2';
import SettingsComponent from '../components/SettingsComponent';
import imageNames from '../../assets/imageNames/imageNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTypeContext } from '../UserIdContext';


export default function Settingss({ navigation }) {

  const {setUserType} = useContext(UserTypeContext);

  function handleBackButtonClick() {
    navigation.navigate('ContactScreen_Home');
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

  const Logout = async () => {
    await Keychain.resetGenericPassword();
    // await AsyncStorage.removeItem('userType')
    await AsyncStorage.clear();
    setUserType(null)
    // const socket = getSocket();
    // socket.disconnect();
    socket.emit('Iamloggingout');

    navigation.navigate('ContactScreen_Login');
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
        <View style={{ alignItems: 'center', marginTop: responsiveHeight(5) }}>
          <Image
            style={{
              width: responsiveWidth(80),
              height: responsiveHeight(30),
              resizeMode: 'cover',
            }}
            source={imageNames.womenavatar}
          />
        </View>

        <SettingsComponent title={'My Profile'} />
        <SettingsComponent title={'Help & support'} />
        <SettingsComponent title={'Settings and privacy'} />
        <SettingsComponent title={'Log out'} onPress={Logout} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});



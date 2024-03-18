import React, {useEffect} from 'react';

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
import socket from '../components/SocketService';

export default function Screen_Settings({navigation}) {
  function handleBackButtonClick() {
    navigation.navigate('Screen_Home');
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
    // const socket = getSocket();
    // socket.disconnect();
    socket.emit('Iamloggingout');

    navigation.navigate('Screen_Login');
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
        <View style={{alignItems: 'center', marginTop: responsiveHeight(5)}}>
          <Image
            style={{
              width: responsiveWidth(80),
              height: responsiveHeight(30),
              resizeMode: 'cover',
            }}
            source={require('../../assets/images/womenAvatar.jpg')}
          />
        </View>

        <Pressable
          style={{
            backgroundColor: 'white',
            borderColor: '#0662bf',
            borderTopWidth: 0,
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              margin: responsiveHeight(3),
              fontSize: responsiveFontSize(2),
              color: '#0662bf',
            }}>
            My profile
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: 'white',
            borderColor: '#0662bf',
            borderTopWidth: 0,
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              margin: responsiveHeight(3),
              fontSize: responsiveFontSize(2),
              color: '#0662bf',
            }}>
            History
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: 'white',
            borderColor: '#0662bf',
            borderTopWidth: 0,
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              margin: responsiveHeight(3),
              fontSize: responsiveFontSize(2),
              color: '#0662bf',
            }}>
            Help & support
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: 'white',
            borderColor: '#0662bf',
            borderTopWidth: 0,
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              margin: responsiveHeight(3),
              fontSize: responsiveFontSize(2),
              color: '#0662bf',
            }}>
            Settings and privacy
          </Text>
        </Pressable>

        <Pressable
          onPress={Logout}
          style={{
            backgroundColor: 'white',
            borderColor: '#0662bf',
            borderTopWidth: 0,
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              margin: responsiveHeight(3),
              fontSize: responsiveFontSize(2),
              color: '#0662bf',
            }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});

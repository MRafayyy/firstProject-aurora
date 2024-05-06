

import React, {useEffect} from 'react';

import {
  BackHandler,
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import socket from '../components/SocketService';
import MyProfileComponent from '../components/MyProfileComponent';
import colors from '../utils/color';
import fontFamily from '../../assets/fontFamily/fontFamily';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function SettingsComponent(props) {
  return (
    <TouchableOpacity
    onPress={props.onPress}
    style={{
      backgroundColor: 'white',
      borderColor: '#0662bf',
      borderTopWidth: 0,
      borderBottomWidth: 1,
      paddingHorizontal: responsiveWidth(5),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
    <Text
      style={{
        marginVertical: responsiveHeight(3),
        fontSize: responsiveFontSize(2),
        color: colors.blue,
        fontFamily: fontFamily.Regular
      }}>
      {props.title}
    </Text>
    <Ionicons name="chevron-forward-outline" color={colors.darksilver} size={25}/>
  </TouchableOpacity>
  )
}
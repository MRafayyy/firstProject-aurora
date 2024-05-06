import { View, Text } from 'react-native'
import React from 'react'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import colors from '../utils/color';
import fontFamily from '../../assets/fontFamily/fontFamily';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function NothinToShow(props) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        top: -40,
      }}>
      <Ionicons name="alert-circle" size={30} color={colors.darksilver} />
      <Text
        style={{
          color: colors.darksilver,
          fontFamily: fontFamily.Regular,
          fontSize: responsiveFontSize(3),
          lineHeight: responsiveHeight(4),
        }}>
        {props.msg || 'No Friend Requests'}
      </Text>
    </View>
  </View>
  )
}
import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../utils/color';
import fontFamily from '../../assets/fontFamily/fontFamily';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function NothinToShow(props) {
  const [step, setStep] = useState(1);

  setTimeout(() => {
    setStep(2);
  }, 2000)

  if (step === 1) {

    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color={colors.blue} size={'large'} />
      </View>
    )
  }
  else



    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
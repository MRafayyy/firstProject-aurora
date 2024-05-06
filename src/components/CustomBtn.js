import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';

export default function CustomBtn(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        styles.rescueBtn,
        {backgroundColor: props.bgColor},
        props.btnStyle,
      ]}>
      <Text style={styles.rescueBtnText}>{props.btnText || 'Login'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rescueBtn: {
    backgroundColor: colors.blue,
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
    color: colors.white,
    textAlign: 'center',
    fontFamily: fontFamily.SemiBold,
    lineHeight: responsiveHeight(3),
  },
});

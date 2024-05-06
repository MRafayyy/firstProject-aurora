import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from './color';

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  text: {
    fontSize: responsiveFontSize(1.5),
    color: 'black',
    textAlign: 'left',
    fontFamily: fontFamily.Regular,
  },
  linkbeforetext: {
    margin: 0,
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
  },

  errorFont: {
    fontSize: responsiveFontSize(1.2),
  },
  TextInputBelowErrorTextStyle: {
    color: 'red',
    marginTop: 2,
    fontFamily: fontFamily.Regular,
  },

  normalFont: {
    fontSize: responsiveFontSize(2),
  },

  btntext: {
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    color: 'white',
    // textAlign: 'left',
    // backgroundColor
    fontFamily: fontFamily.SemiBold,
    textAlign: 'center'
  },

  UserPassInputBoxView: {
    marginBottom: responsiveHeight(4),
  },

  UserPasswInputBox: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    color: 'black',
    fontFamily: fontFamily.Regular,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 3,
  },

  loginBtn: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    color: 'white',
    backgroundColor: colors.blue,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7',
  },

  bottomText: {
    marginTop: responsiveHeight(15),
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
    // position: 'absolute',
    bottom: 12,
  },
  linkColor: {
    color: 'red',
    fontSize: responsiveFontSize(1.5),
    fontFamily: fontFamily.Regular,
  },
});

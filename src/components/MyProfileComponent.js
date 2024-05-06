import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GlobalStyles from '../utils/GlobalStyles';

import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';
import imageNames from '../../assets/imageNames/imageNames';

export default function MyProfileComponent(props) {
  return (
      <View style={[styles.flexContainer]}>
        <View style={styles.flexContainer2}>
          <Image
            style={[
              styles.groupImage,
              {
                width: responsiveWidth(10),
                height: responsiveHeight(5),
              },
            ]}
            resizeMode="contain"
            source={imageNames.safety}
          />
          <View>
            <Text
              style={[
                // GlobalStyles.heading,
                {
                    color: colors.blue,
                  fontSize: responsiveFontSize(2),
                  textAlign: 'left',
                  fontFamily: fontFamily.SemiBold,
                },
              ]}>
              {props.title}
            </Text>
            <Text style={[
                // GlobalStyles.subheading,
                 {      color: colors.blue,
                    fontSize: responsiveFontSize(1.7),
                    textAlign: 'left',
                    fontFamily: fontFamily.Regular,}]}>
              {props.body}
            </Text>

            <View style={styles.flexContainer3}></View>
          </View>
        </View>

        {/* {props.twobtns === undefined && (
          <MoreCustomBtn
            imagePosition={props.imagePosition}
            backgroundColor={props.btnBg}
            width={
              props.moreWidth !== undefined
                ? props.moreWidth
                : responsiveWidth(5)
            }
            family={fontFamily.Regular}
            MarginTop={0}
            imageSource={props.imageSource}
            onPressHandler={props.onPressHandler}
            // borderColor={colors.yellow}
            // borderWidth={4}
            textSize={responsiveFontSize(1.5)}
            textBody={props.btnBody}
            color={colors.white}

            // imgWidth={responsiveWidth(4)}
            // imgHeight={responsiveHeight(4)}
          />
        )} */}


      </View>
   
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    justifyContent: 'center',
    gap: responsiveWidth(2),
    alignItems: 'center',
    flexDirection: 'row',
  },

  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingLeft: responsiveWidth(7),
    paddingRight: responsiveWidth(2),
    borderColor: colors.blue,
    // gap: responsiveWidth(10),
    // borderWidth:1,
    marginBottom: responsiveHeight(1)
  },
  flexContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    // borderWidth:1,
    borderColor: colors.green,
  },
  flexContainer3: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: responsiveWidth(2),
    // paddingVertical: responsiveHeight(1),
    // paddingHorizontal: responsiveWidth(4),
    // borderWidth:1,
    borderColor: colors.green,
  },
  flexContainer4: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: responsiveWidth(2),
    // paddingVertical: responsiveHeight(1),
    // paddingHorizontal: responsiveWidth(4),
    // borderWidth:1,
    borderColor: colors.green,
  },

  flexContainer5: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: responsiveWidth(30),
    marginTop: responsiveHeight(2),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    // borderWidth:1,
    borderColor: colors.green,
  },

  groupImage: {
    // borderWidth:1,
    borderColor: colors.green,
    borderRadius: 100,
  },
  userImage: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
  },
  avatarImages: {
    width: responsiveWidth(12.5),
    height: responsiveHeight(6),
    borderRadius: 100,
    position: 'absolute',
    left: 0,
  },
});

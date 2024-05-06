import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, { useMemo } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';

 function NotifComponent(props) {
  const {item, checking} = props;

  return (
    <Pressable style={styles.notifContainer}>
      <Image
        style={styles.notifIcon}
        source={require('../../assets/images/speakerw1.jpeg')}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: responsiveWidth(78),
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: responsiveHeight(0.4),
          }}>
          <Text style={styles.notifHeadingText}>{item.title}</Text>
          <Text style={styles.dateTimeText}>
            {checking(item.date, item.time)}
          </Text>
        </View>

        <Text style={styles.notifBodyText}>{item.body}</Text>
      </View>
    </Pressable>
  );
}

export default useMemo(NotifComponent)

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  notifType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifEach: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: fontFamily.SemiBold,
    padding: responsiveWidth(5),
    width: responsiveWidth(44),
    // borderBottomWidth: 1,
    textAlign: 'center',
    // color: colors.black,
    borderBottomColor: colors.blue,
  },
  notifContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(4.5),
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: responsiveHeight(0),
  },
  notifIcon: {
    alignSelf: 'flex-start',
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    resizeMode: 'cover',
    borderRadius: responsiveWidth(100),
  },
  pageHeadingText: {
    fontFamily: fontFamily.Bold,
    backgroundColor: colors.blue,
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    padding: responsiveWidth(5),
    borderBottomWidth: 1,
    borderColor: 'transparent',
    paddingLeft: responsiveWidth(12),
  },
  notifCategoryTitleTextStyle: {},

  notifHeadingText: {
    flex: 1,
    fontSize: responsiveFontSize(2),
    textAlign: 'left',
    marginLeft: responsiveWidth(4),
    color: colors.black,
    fontFamily: fontFamily.Regular,
  },

  notifBodyText: {
    paddingRight: responsiveWidth(4),
    fontSize: responsiveFontSize(1.8),
    textAlign: 'left',
    marginLeft: responsiveWidth(4),
    color: '#7a7a7a',
    fontFamily: fontFamily.Regular,
  },
  dateTimeText: {
    textAlign: 'right',
    fontSize: responsiveFontSize(1.3),
    fontFamily: fontFamily.Regular,
    paddingHorizontal: 0,
    paddingTop: responsiveHeight(0.4),
    textAlign: 'right',
    color: '#7a7a7a',
    marginLeft: responsiveWidth(0),
    marginRight: responsiveWidth(0),
  },
});

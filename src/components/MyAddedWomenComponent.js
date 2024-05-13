
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ip from '../screens/IPaddress';
import UserIdContext from '../UserIdContext';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';

const MyAddedWomenComponent = ({item, womenRemoved, setWomenRemoved, navigation}) => {

  const GoToContactProfilePage = () => {
    navigation.navigate('ContactScreen_WomenProfile', {item: item});
  };

  const {userId} = useContext(UserIdContext);

  const removeWomen = async (currentUserId, selectedUserId) => {
    try {
      let response = await fetch(`${ip}/contacts/remove-women`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({currentUserId, selectedUserId}),
      });

      // response = await response.json()
      if (response.ok) {
        setWomenRemoved({...womenRemoved, [selectedUserId]: true});
        // setdisableNow(true)
      }
    } catch (error) {
      console.log('error removing contact');
      console.log(error);
    }
  };

  return (
    <Pressable onPress={GoToContactProfilePage} style={styles.container}>
      <Image
        style={styles.womenIcon}
        source={require('../../assets/images/womenavatar.jpg')}
        resizeMode="cover"
      />

      <Text
        style={styles.nameStyle}>
        {item?.name}
      </Text>

      <Pressable
        onPress={() => removeWomen(userId.mongoId, item._id)}
        style={styles.btn}>
        <Text
          style={styles.btnText}>
          {womenRemoved[item._id] ? 'Removed' : 'Remove'}
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default MyAddedWomenComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveHeight(1),
    backgroundColor: colors.white,
  },
  womenIcon: {
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: 30,
  },
  nameStyle: {
    fontFamily: fontFamily.Regular,
    textAlign: 'left',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(5),
    flex: 1,
    color: colors.black,
  },
  btn: {
    borderColor: '#0662bf',
    borderWidth: 1,
    padding: responsiveWidth(2),
    borderRadius: responsiveWidth(2),
    width: responsiveWidth(33),
  },
  btnText: {
    fontFamily: fontFamily.Regular,
    textAlign: 'center',
    color: colors.blue,
    fontSize: responsiveFontSize(1.8),
  },
});

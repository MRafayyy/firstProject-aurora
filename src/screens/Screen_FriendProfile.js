import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ip from './IPaddress';
import fontFamily from '../../assets/fontFamily/fontFamily';
import CustomBtn from '../components/CustomBtn';
import colors from '../utils/color';

export default function Screen_FriendProfile({navigation, route}) {
  const item = route.params.item;

  const [tracking, setTracking] = useState(false);
  const [receivedLocation, setReceivedLocation] = useState();

  const getRescueStatus = async () => {
    let response = await fetch(`${ip}/getRescueButtonStatus/${item._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response = await response.json();

    if (response.status === true) {
      setTracking(true);
      setReceivedLocation(response.location);
    }
  };

  useEffect(() => {
    getRescueStatus();
  }, []);

  console.log(item);
  // console.log(item.is_online)
  const GoToTrackingPage = () => {
    navigation.navigate('Screen_MapTracking', {
      item: item._id,
      receivedLocation: receivedLocation,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Name</Text>
        <Text style={styles.fieldValue}>{item.name}</Text>
      </View>

      <CustomBtn
        onPress={() => {
          GoToTrackingPage();
        }}
        btnText={tracking? 'Track': 'No Tracking Available'}
        btnStyle={{
          backgroundColor: tracking ? 'green' : 'orange',
          borderWidth: 0,
        }}
        disabled={!tracking}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  fieldContainer: {
    // width: responsiveWidth(40),
    paddingHorizontal: responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  fieldLabel: {
    fontFamily: fontFamily.SemiBold,
    fontSize: responsiveFontSize(2),
    //   marginBottom: 5,
  },
  fieldValue: {
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.Regular,
  },
});

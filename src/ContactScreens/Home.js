import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import fontFamily from '../../assets/fontFamily/fontFamily';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {

    const getUserInfo = async () => {
      const info = await AsyncStorage.getItem('userInfo')
      setUserInfo(JSON.parse(info));
    }

    getUserInfo();
  }, [])

  return (
    <View style={styles.body}>
      <Text
        style={{
          textAlign: 'left',
          color: '#0662bf',
          fontSize: responsiveFontSize(4),
          margin: responsiveWidth(3),
          fontFamily: fontFamily.Bold
        }}>
        Aurora
      </Text>

      <Text style={{
        textAlign: 'center',
        color: '#0662bf',
        fontSize: responsiveFontSize(3),
        margin: responsiveWidth(3),
        fontFamily: fontFamily.Regular
      }}>Welcome {userInfo.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  text: {
    margin: 10,
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
  },
});
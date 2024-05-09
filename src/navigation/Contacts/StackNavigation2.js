/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'; //no needed only npm se krna tha
import React, {useContext, useRef} from 'react';

import {TransitionPresets} from '@react-navigation/stack';

import {Header, createStackNavigator} from '@react-navigation/stack';


import fontFamily from '../../../assets/fontFamily/fontFamily';

import SignUp from '../../ContactScreens/SignUp';


const Stack = createStackNavigator();

export default function StackNavigation2() {
  return (
    <Stack.Navigator
    initialRouteName="SignUp"
    screenOptions={{
      headerTitleStyle: {fontFamily: fontFamily.Regular},
      // headerBackTitleStyle: {fontFamily: fontFamily.Regular} ,
      animationEnabled: true,
      animationTypeForReplace: 'push',
      ...TransitionPresets.RevealFromBottomAndroid,
    }}>

    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{headerShown: false}}
    />

    </Stack.Navigator>
  )
}


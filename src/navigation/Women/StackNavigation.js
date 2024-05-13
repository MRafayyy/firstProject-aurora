/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'; //no needed only npm se krna tha
import React, { useContext, useRef } from 'react';
import { useEffect, useState } from 'react';
// import { Icon } from 'react-native-vector-icons/Icon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import messaging from '@react-native-firebase/messaging';
import { TransitionPresets } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header, createStackNavigator } from '@react-navigation/stack';
import Screen_Login from '../../screens/Screen_Login';
import Screen_NadraVerification from '../../screens/Screen_NadraVerification';
import Screen_Registration from '../../screens/Screen_Registration';
import Screen_Splash from '../../screens/Screen_Splash';
import Screen_ForgotPassword from '../../screens/Screen_ForgotPassword';
import Screen_Decider from '../../screens/Screen_Decider';
import UserIdContext, { UserIdProvider, UserTypeContext } from '../../UserIdContext';

import { navigationRef } from '../../RootNavigation'
import UserScreenNavigation from './MaterialBottomTabsNavigation';

import Screen_MapTracking from '../../screens/Screen_MapTracking';
import Screen_FriendProfile from '../../screens/Screen_FriendProfile';
import Screen_Maps from '../../screens/Screen_Maps';
import Screen_MyFriends from '../../screens/Screen_MyFriends';
import Screen_Friends from '../../screens/Screen_Friends';
import fontFamily from '../../../assets/fontFamily/fontFamily';
import colors from '../../utils/color';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import SignUp from '../../ContactScreens/SignUp';
import Login from '../../ContactScreens/Login';
import NadraVerify from '../../ContactScreens/NadraVerify';
import BottomTabs from '../Contacts/BottomTabs';
import Screen_ShowContactsOnly from '../../screens/Screen_ShowContactsOnly';
import Screen_ShowMyContacts from '../../screens/Screen_ShowMyAddedContacts';
import Screen_ShowMyAddedContacts from '../../screens/Screen_ShowMyAddedContacts';
import WomenProfile from '../../ContactScreens/WomenProfile';
import TrackAddedWomen from '../../ContactScreens/TrackAddedWomen';


const Stack = createStackNavigator();

export default function StackNavigation() {

  const { userType } = useContext(UserTypeContext);


  useEffect(() => {

  }, [userType])

  return (
    <Stack.Navigator
      initialRouteName="Screen_Splash"
      screenOptions={{
        headerTitleStyle: { fontFamily: fontFamily.Regular },
        // headerBackTitleStyle: {fontFamily: fontFamily.Regular} ,
        animationEnabled: true,
        animationTypeForReplace: 'push',
        ...TransitionPresets.RevealFromBottomAndroid,
      }}>

      <Stack.Screen
        name="Screen_Splash"
        component={Screen_Splash}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Screen_Decider"
        component={Screen_Decider}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Screen_Login"
        component={Screen_Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Screen_NadraVerification"
        component={Screen_NadraVerification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Screen_Registration"
        component={Screen_Registration}
        options={{
          headerShown: false,
          // ...TransitionPresets.RevealFromBottomAndroid
        }}
      />
      <Stack.Screen
        name="Screen_ForgotPassword"
        component={Screen_ForgotPassword}
        options={{ headerShown: false }}
      />


      {/* ------------------------------------ */}


      <Stack.Screen
        name="ContactScreen_SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ContactScreen_Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ContactScreen_NadraVerify"
        component={NadraVerify}
        options={{ headerShown: false }}
      />


      {userType === 'Contact' &&
        <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomTabs"
          component={BottomTabs}
        />
       
        <Stack.Screen
          options={{ headerShown: true, title: 'Profile' }}
          name="ContactScreen_WomenProfile"
          component={WomenProfile}
        />
       
        <Stack.Screen
          options={{ headerShown: false, title: 'Profile' }}
          name="ContactScreen_TrackAddedWomen"
          component={TrackAddedWomen}
        />
        </>
      }

      {userType === 'Women' &&
        <>


          <Stack.Screen
            name="Screen_Friends"
            component={Screen_Friends}
            options={{
              headerShown: true,
              headerTitle: 'Friend Requests',
            }}
          />

          <Stack.Screen
            name="Screen_MyFriends"
            component={Screen_MyFriends}
            options={{
              headerShown: true,
              headerTitle: 'Friends',
            }}
          />

          <Stack.Screen
            name="Screen_FriendProfile"
            component={Screen_FriendProfile}
            options={{
              headerShown: true,
              headerTitle: 'Info',
            }}
          />

          <Stack.Screen
            name="Screen_MapTracking"
            component={Screen_MapTracking}
            options={{
              headerShown: false,
              headerTitle: '',
            }}
          />

          <Stack.Screen
            name="Screen_Maps"
            component={Screen_Maps}
            options={{
              headerShown: false,
              headerTitle: 'Maps',
            }}
          />



<Stack.Screen
  name="Screen_ShowContactsOnly"
  component={Screen_ShowContactsOnly}
  options={{
    headerShown: true,
    headerTitle: 'People You May Know',
  }}
/>

<Stack.Screen
  name="Screen_ShowMyAddedContacts"
  component={Screen_ShowMyAddedContacts}
  options={{
    headerShown: true,
    headerTitle: 'My Contacts',
  }}
/>


<Stack.Screen
  options={{ headerShown: false }}
  name="UserScreenNavigation"
  component={UserScreenNavigation}
/>

        </>
      }


    </Stack.Navigator>
  )
}
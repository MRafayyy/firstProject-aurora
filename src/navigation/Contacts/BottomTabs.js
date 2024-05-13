import { View, Text, Settings, Dimensions } from 'react-native';
import React from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../utils/color';
import Home from '../../ContactScreens/Home';
import Settingss from '../../ContactScreens/Settingss';
import ShowMyAddedWomen from '../../ContactScreens/ShowMyAddedWomen';
import AllNotifications from '../../ContactScreens/AllNotifications';
// import Settings from '../../ContactScreens/Settings'

const Tab = createMaterialTopTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      // initialRouteName="Screen_Home"
      //  sceneAnimationEnabled
      tabBarPosition="bottom"
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        // tabBarLabelStyle: {fontSize: 10},
        tabBarShowIcon: true,
        swipeEnabled: true,
        tabBarActiveTintColor: '#007cff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderWidth: 0,
          borderColor: colors.red,
          justifyContent: 'space-evenly',
          padding: 0,
          paddingVertical:2
        },
        tabBarIconStyle: { height: responsiveHeight(4), width: 'auto' },
        tabBarIndicator: () => null,
      })}>

      <Tab.Screen
        name="ContactScreen_Home"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: 'Home',

          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={30} />
          ),
        })}
      />

      <Tab.Screen
        name="AllNotifications"
        component={AllNotifications}
        options={{
          tabBarLabel: 'AllNotifications',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="notifications-circle-outline"
              color={color}
              size={33}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ContactScreen_Home2"
        component={Home}
        options={({ navigation }) => ({
          tabBarLabel: 'Rescue',
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield-half-outline" color={color} size={30} />
          ),
        })}
      />

      <Tab.Screen
        name="ContactScreen_ShowMyAddedWomen"
        component={ShowMyAddedWomen}
        onPress={({ navigation }) => {
          // navigation.navigate(Screen_SearchContacts);
        }}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="ContactScreen_Settings"
        component={Settingss}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

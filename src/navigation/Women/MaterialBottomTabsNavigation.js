import { View, Text, Settings, Dimensions } from 'react-native';
import React from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Screen_Home from '../../screens/Screen_Home';
import Screen_Home2 from '../../screens/Screen_Home2';
import Screen_ReceiveNotifs from '../../screens/Screen_ReceiveNotifs';

import Screen_SearchContacts from '../../screens/Screen_SearchContacts';

import Screen_Settings from '../../screens/Screen_Settings';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../utils/color';

const Tab = createMaterialTopTabNavigator();

export default function UserScreenNavigation() {
  return (
    <Tab.Navigator
       initialRouteName="Screen_Home2"
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

      {/* <Tab.Screen
        name="Screen_Home"
        component={Screen_Home}
        options={({ route }) => ({
          tabBarLabel: 'Home',

          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={30} />
          ),
        })}
      /> */}

      <Tab.Screen
        name="Screen_ReceiveNotifs"
        component={Screen_ReceiveNotifs}
        options={{
          tabBarLabel: 'Notifs',
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
            name="Screen_Home2"
            component={Screen_Home2}
            options={({ navigation }) => ({
              tabBarLabel: 'Rescue',
              tabBarIcon: ({ color }) => (
                <Ionicons name="shield-half-outline" color={color} size={30} />
              ),
            })}
          />

      <Tab.Screen
        name="Screen_SearchContacts"
        component={Screen_SearchContacts}
        onPress={({ navigation }) => {
          navigation.navigate(Screen_SearchContacts);
        }}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Screen_Settings}
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

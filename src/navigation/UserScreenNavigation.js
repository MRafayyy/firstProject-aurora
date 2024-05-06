import {View, Text, Settings, Dimensions} from 'react-native';
import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header, createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RootNavigation';
import Screen_Home from '../screens/Screen_Home';
import Screen_Home2 from '../screens/Screen_Home2';
import Screen_ReceiveNotifs from '../screens/Screen_ReceiveNotifs';
import Screen_FirebaseNotif from '../screens/Screen_FirebaseNotif';
import Screen_SearchContacts from '../screens/Screen_SearchContacts';
import Screen_FriendProfile from '../screens/Screen_FriendProfile';
import Screen_MapTracking from '../screens/Screen_MapTracking';
import Screen_MyFriends from '../screens/Screen_MyFriends';
import Screen_Friends from '../screens/Screen_Friends';
import Screen_Maps from '../screens/Screen_Maps';
import Screen_Settings from '../screens/Screen_Settings';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function UserScreenNavigation() {
  return (
    
      <Tab.Navigator
        // initialRouteName="Screen_Home"
        //  sceneAnimationEnabled
        tabBarPosition="bottom"
        initialLayout={{
          width: Dimensions.get('window').width,
        }}
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarLabelStyle: {fontSize: 10},
          tabBarShowIcon: true,
          swipeEnabled: true,
          tabBarActiveTintColor: '#007cff',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Screen_Home"
          component={Screen_Home}
          options={({route}) => ({
            tabBarLabel: 'Home',

            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={25} />
            ),
            // tabBarStyle: {display:'none'}
          })}
        />

        <Tab.Screen
          name="Screen_ReceiveNotifs"
          component={Screen_ReceiveNotifs}
          options={{
            // tabBarBadge:()=> { return (  <Text>3</Text> ) },
            tabBarLabel: 'Notifs',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="bell-outline"
                color={color}
                size={25}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Screen_FirebaseNotif"
          component={Screen_FirebaseNotif}
          options={{
            tabBarLabel: 'Notifs',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="bell-outline"
                color={color}
                size={25}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Screen_Home2"
          component={Screen_Home2}
          options={({navigation}) => ({
            tabBarLabel: 'Rescue',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="security" color={color} size={25} />
            ),
          })}
        />

        <Tab.Screen
          name="Screen_SearchContacts"
          component={Screen_SearchContacts}
          onPress={({navigation}) => {
            navigation.navigate(Screen_SearchContacts);
          }}
          options={{
            tabBarLabel: 'Contacts',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="magnify" color={color} size={25} />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={Screen_Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="tune" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

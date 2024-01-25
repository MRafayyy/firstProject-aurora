import React, { createContext, useContext } from 'react';

import { Dimensions } from 'react-native';

import Screen_Home from './screens/Screen_Home';
import Screen_Home2 from './screens/Screen_Home2';
import Screen_FirebaseNotif from './screens/Screen_FirebaseNotif';
import PushNotification from "react-native-push-notification";
import { default as Settings } from './screens/Screen_Settings'
import Screen_SearchContacts, { default as Contacts } from './screens/Screen_SearchContacts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import FriendTabs from './FriendTabs';
import Screen_ReceiveNotifs from './screens/Screen_ReceiveNotifs';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserIdContext from './UserIdContext';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs({ navigation, route }) {

  const { userId } = useContext(UserIdContext);
  // const route = useRoute()
  // const { userId } = route.params;
  // const {userId} = route.params
  console.log(userId)
  return (
    <>
      {/* <NavigationContainer> */}
      <Tab.Navigator initialRouteName='Screen_Home'

        //  activeColor="#007cff"
        //  inactiveColor="gray"
        //  shifting={true}
        //  barStyle={{ backgroundColor: '#fff' }}
        //  sceneAnimationEnabled
        tabBarPosition='bottom'
        initialLayout={{
          width: Dimensions.get('window').width
        }}
        


        screenOptions={ ({ route }) => (
          {
            headerShown: true,
            tabBarShowLabel: false,
            tabBarLabelStyle: { fontSize: 10 },
            tabBarShowIcon: true,
            swipeEnabled: true,
            tabBarActiveTintColor: '#007cff',
            tabBarInactiveTintColor: 'gray'
          }
        )}>

        <Tab.Screen
          name='Screen_Home'
          component={Screen_Home}
          initialParams={userId}
          options={({ route }) => ({
            headerShown: false,
            // header: ()=>null,
            // hey: route.params,
            tabBarLabel: 'Home',

            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={25} />

            ),
            // tabBarStyle: {display:'none'}
          })}
        />

        <Tab.Screen
          name='Screen_ReceiveNotifs'
          component={Screen_ReceiveNotifs}
          
          options={{
            lazy: true,
            tabBarLabel: 'Notifs',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell-outline" color={color} size={25} />
            ),
          }}
        />
    
        <Tab.Screen
          name='Screen_FirebaseNotif'
          component={Screen_FirebaseNotif}
          options={{
            tabBarLabel: 'Notifs',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell-outline" color={color} size={25} />
            ),
          }}
        />

        <Tab.Screen
          name='Screen_Home2'
          component={Screen_Home2}
          options={{
            tabBarLabel: 'Rescue',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="security" color={color} size={25} />
            ),
          }}
        />

        {/* <Tab.Screen
          name='Contacts'
          component={Contacts}
          options={{
            tabBarLabel: 'Contacts',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={25} />
            ),
          }}
        /> */}

        <Tab.Screen
          name='FriendTabs'
          
          component={FriendTabs}
          onPress={({navigation})=>{
            navigation.navigate(FriendTabs, {screen:  Screen_SearchContacts})
          }}
          options={{
            tabBarLabel: 'Contacts',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={25} />
            ),
            
          }}
        />

        <Tab.Screen
          name='Settings'
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="tune" color={color} size={25} />
            ),
          }}
        />



      </Tab.Navigator>

      {/* </NavigationContainer> */}
    </>
  );
}
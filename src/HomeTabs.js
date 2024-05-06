// import React, {createContext, useContext} from 'react';
// import {Dimensions, Text} from 'react-native';
// import Screen_Home from './screens/Screen_Home';
// import Screen_Home2 from './screens/Screen_Home2';
// import Screen_FirebaseNotif from './screens/Screen_FirebaseNotif';

// import {default as Settings} from './screens/Screen_Settings';
// import Screen_SearchContacts, {
//   default as Contacts,
// } from './screens/Screen_SearchContacts';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FriendTabs from './FriendTabs';
// import Screen_ReceiveNotifs from './screens/Screen_ReceiveNotifs';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import UserIdContext from './UserIdContext';

// const Tab = createMaterialTopTabNavigator();

// export default function HomeTabs({navigation, route}) {

//   return (
//     <>

//       <Tab.Navigator
//         // initialRouteName="Screen_Home"
//         //  sceneAnimationEnabled
//         tabBarPosition="bottom"
//         initialLayout={{
//           width: Dimensions.get('window').width,
//         }}
//         screenOptions={({route}) => ({
//           tabBarShowLabel: false,
//           tabBarLabelStyle: {fontSize: 10},
//           tabBarShowIcon: true,
//           swipeEnabled: true,
//           tabBarActiveTintColor: '#007cff',
//           tabBarInactiveTintColor: 'gray',
//         })}>
//         <Tab.Screen
//           name="Screen_Home"
//           component={Screen_Home}
//           options={({route}) => ({
//             tabBarLabel: 'Home',

//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons name="home" color={color} size={25} />
//             ),
//             // tabBarStyle: {display:'none'}
//           })}
//         />

//         <Tab.Screen
//           name="Screen_ReceiveNotifs"
//           component={Screen_ReceiveNotifs}
//           options={{
//             // tabBarBadge:()=> { return (  <Text>3</Text> ) },

//             lazy: true,
//             tabBarLabel: 'Notifs',
//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons
//                 name="bell-outline"
//                 color={color}
//                 size={25}
//               />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Screen_FirebaseNotif"
//           component={Screen_FirebaseNotif}
//           options={{
//             tabBarLabel: 'Notifs',
//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons
//                 name="bell-outline"
//                 color={color}
//                 size={25}
//               />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Screen_Home2"
//           component={Screen_Home2}
//           options={({navigation}) => ({
//             tabBarLabel: 'Rescue',
//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons name="security" color={color} size={25} />
//             ),
//           })}
//         />


//         <Tab.Screen
//           name="Screen_SearchContacts"
//           component={Screen_SearchContacts}
//           onPress={({navigation}) => {
//             navigation.navigate(Screen_SearchContacts);
//           }}
//           options={{
//             tabBarLabel: 'Contacts',
//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons name="magnify" color={color} size={25} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Settings"
//           component={Settings}
//           options={{
//             tabBarLabel: 'Settings',
//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons name="tune" color={color} size={25} />
//             ),
//           }}
//         />
//       </Tab.Navigator>

//       {/* </NavigationContainer> */}
//     </>
//   );
// }

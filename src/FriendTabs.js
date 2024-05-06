// import React, {createContext, useContext} from 'react';
// import {Dimensions, Button, Pressable, Text, View} from 'react-native';
// import {TransitionPresets} from '@react-navigation/stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Header, createStackNavigator} from '@react-navigation/stack';
// import Screen_SearchContacts from './screens/Screen_SearchContacts';
// import {responsiveScreenWidth} from 'react-native-responsive-dimensions';

// const Stack = createStackNavigator();

// export default function FriendTabs() {
//   return (
//     <>
//       <Stack.Navigator
//         initialRouteName="Screen_SearchContacts"
//         screenOptions={{
//           animationEnabled: true,
//           animationTypeForReplace: 'push',
//           ...TransitionPresets.RevealFromBottomAndroid,
//         }}>
//         <Stack.Screen
//           name="Screen_SearchContacts"
//           component={Screen_SearchContacts}
//           options={({navigation}) => ({
//             headerShown: true,
//             title: 'My Contacts',
//             headerRight: () => (
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: responsiveScreenWidth(4),
//                   paddingHorizontal: 9,
//                 }}>
//                 <Ionicons
//                   name="chatbox-ellipses-outline"
//                   size={24}
//                   color={'black'}
//                   onPress={() => navigation.navigate('Screen_MyFriends')}
//                 />
//                 <MaterialCommunityIcons
//                   name="account-multiple"
//                   size={28}
//                   color={'black'}
//                   onPress={() => navigation.navigate('Screen_Friends')}
//                 />
//               </View>
//             ),
//             headerLeft: () => null,
//           })}
//         />

        
//       </Stack.Navigator>
//     </>
//   );
// }

import React, { createContext, useContext } from 'react';

import { Dimensions, Button, Pressable, Text, View } from 'react-native';
import { TransitionSpecs } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import Screen_Home from './screens/Screen_Home';
import Screen_Home2 from './screens/Screen_Home2';
import Screen_FirebaseNotif from './screens/Screen_FirebaseNotif';
import PushNotification from "react-native-push-notification";
import { default as Settings } from './screens/Screen_Settings'
import { default as Contacts } from './screens/Screen_SearchContacts';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserIdContext from './UserIdContext';
import { UserIdProvider } from './UserIdContext'
import Screen_Friends from './screens/Screen_Friends';
import Screen_SearchContacts from './screens/Screen_SearchContacts';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import Screen_MyFriends from './screens/Screen_MyFriends';


export default function FriendTabs() {




    return (
        <>
            <Stack.Navigator initialRouteName='Screen_SearchContacts' screenOptions={{ animationEnabled: true, animationTypeForReplace: 'push', ...TransitionPresets.RevealFromBottomAndroid }}  >
                <Stack.Screen name="Screen_SearchContacts" component={Screen_SearchContacts} options={({ navigation }) => ({
                    headerShown: true,
                    title: 'My Contacts',
                    headerRight: () => (

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveScreenWidth(4), paddingHorizontal: 9 }}>
                            <Ionicons name='chatbox-ellipses-outline' size={24} color={'black'} onPress={() => navigation.navigate('Screen_MyFriends')} />
                            <MaterialCommunityIcons name='account-multiple' size={28} color={'black'}
                                onPress={() => navigation.navigate('Screen_Friends')}
                            />
                        </View>
                        // <Pressable
                        //   onPress={() => alert('This is a button!')}
                        //   title="Info"
                        //   color="#000"
                        //   style={{marginRight: 10, backgroundColor: '#000' }}
                        // >
                        //     <Text style={{color: 'white'}}>hey</Text>
                        //      </Pressable> 
                    ),
                    headerLeft: () => null,

                })} />


                <Stack.Screen name="Screen_Friends" component={Screen_Friends} options={{
                    headerShown: true,
                    headerTitle: 'Friend Requests'
                }} />
              
                <Stack.Screen name="Screen_MyFriends" component={Screen_MyFriends} options={{
                    headerShown: true,
                    headerTitle: 'Friends'
                }} />
                
            </Stack.Navigator>
        </>
    )
}
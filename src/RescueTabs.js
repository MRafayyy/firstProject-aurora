import React, { createContext, useContext } from 'react';

import { View } from 'react-native';

import { TransitionPresets } from '@react-navigation/stack';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Header, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

import UserIdContext from './UserIdContext';
import { UserIdProvider } from './UserIdContext'


import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import {default as Screen_Home2} from './screens/Screen_Home2';
import Screen_Maps from './screens/Screen_Maps';


export default function RescueTabs() {




    return (
        <>
            <Stack.Navigator initialRouteName='Screen_Home2' screenOptions={{ animationEnabled: true, animationTypeForReplace: 'push', ...TransitionPresets.RevealFromBottomAndroid }}  >
                <Stack.Screen name="Screen_Home2" component={Screen_Home2} options={({ navigation }) => ({
                    headerShown: true,
                    title: 'Rescue',
                    headerRight: () => (

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveScreenWidth(4), paddingHorizontal: 9 }}>
                            {/* <Ionicons name='chatbox-ellipses-outline' size={24} color={'black'} onPress={() => navigation.navigate('Screen_MyFriends')} /> */}
                            <MaterialCommunityIcons name='map' size={28} color={'black'}
                                onPress={() => navigation.navigate('Screen_Maps')}
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


           
              
                <Stack.Screen name="Screen_Maps" component={Screen_Maps} options={{
                    headerShown: false,
                    headerTitle: 'Maps'
                }} />
                
            </Stack.Navigator>
        </>
    )
}
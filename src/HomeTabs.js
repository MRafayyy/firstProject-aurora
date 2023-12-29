import React from 'react';

// import App from './App';
import { Dimensions } from 'react-native';

// import Screen_Login from './screens/Screen_Login';
// import Screen_NadraVerification from './screens/Screen_NadraVerification';
// import Screen_Registration from './screens/Screen_Registration';
// import { default as Home } from './screens/Screen_Home';
import Screen_Home from './screens/Screen_Home';
// import Screen_Splash from './screens/Screen_Splash';
import Screen_Home2 from './screens/Screen_Home2';
// import Screen_ForgotPassword from './screens/Screen_ForgotPassword';
import Screen_FirebaseNotif from './screens/Screen_FirebaseNotif';
import PushNotification from "react-native-push-notification";
// import Screen_Decider from './screens/Screen_Decider';
import {default as Settings} from './screens/Screen_Settings'
import {default as Contacts} from './screens/Screen_SearchContacts';

// import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs({navigation, route}) {
  const {userId} = route.params.userId;
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

screenOptions={({route})=>(
  {
  // tabBarActiveBackgroundColor: 'white',
    // tabBarInactiveBackgroundColor: 'white',
    // tabBarItemStyle: { width: 100 },
    tabBarShowLabel: false,
    tabBarLabelStyle:{fontSize: 10},
    tabBarShowIcon: true,
    swipeEnabled: true,  
    tabBarActiveTintColor: '#007cff',
    tabBarInactiveTintColor: 'gray'
  
// }}
 

// screenOptions={({route})=>(
  // {
  //   tabBarIcon: ({focused, color})=>{

  //     let iconName='';
 
  //     if(route.name==='Home'){
  //       iconName = 'home';
  //       // size=26
  //       color=focused? '#007cff':'gray';
  //     }
  //     else if(route.name==='Screen_Home2'){
  //       iconName = 'alert-sharp';
  //       // size=26
  //       color=focused? '#007cff':'gray';
  //     }
  //     else if(route.name==='Screen_ForgotPassword'){
  //       iconName = 'car';
  //       // size=26
  //       color=focused? '#007cff':'gray';
  //     }
  //     else if(route.name==='Screen_FirebaseNotif'){
  //       iconName = 'car';
  //       // size=26
  //       color=focused? '#007cff':'gray';
  //     }
  //     else if(route.name==='Settings'){
  //       iconName = 'cog';
  //       // size=26
  //       color=focused? '#007cff':'gray';
  //     }
   
  //     else if(route.name==='Contacts'){
  //       iconName = 'search';
  //       // size=26
  //       color=focused? '#007cff':'gray';
  //     }

  //     return(
  //     //  <FontAwesome5 
  //     //  name={iconName}
  //     //  size={size} 
  //     //  color={color}
  //     // />
  //     <Ionicons name={iconName}  color={color} />
  //     );
  // },
 

    // }}
  }
  )}
>

{/* 

  <Tab.Screen
  name='Screen_Splash'
  component={Screen_Splash}
  options={{
    tabBarActiveTintColor: 'black',
    tabBarLabel: 'Splash',
    // header: ()=>null,
    // tabBarButton: ()=>null,
    tabBarStyle: {display:'none'},
    // tabBarShowIcon: false,
    // tabBarShowLabel: false
  
  }}
  /> 
  
  <Tab.Screen
  name='Screen_Decider'
  component={Screen_Decider}
  options={{
    // header: ()=>null,
    // tabBarButton: ()=>null,
    tabBarStyle: {display:'none'}
  }}
  />

<Tab.Screen
name='Screen_Registration'
component={Screen_Registration}
options={{
  // header: ()=>null,
  // tabBarButton: ()=>null,

  // tabBarStyle: {display:'none'},
//   tabBarIcon: ({ color }) => (
//   <MaterialCommunityIcons name="login" color={color} size={26} />
// ),
tabBarIconStyle: {display: 'none'}, 
tabBarScrollEnabled: false,
tabBarShowLabel: false,
tabBarShowIcon: false,


tabBarLabelStyle: { display: 'none' },
tabBarItemStyle:{ display: 'none' },
tabBarStyle:  { display: 'none' }, 
}}
/>


<Tab.Screen
name='Screen_NadraVerification'
component={Screen_NadraVerification}
options={{
  // tabBarLabel: 'Login',
  // header: ()=>null,
  // tabBarButton: ()=>null,
  tabBarStyle: {display:'none'}
}}
/>


<Tab.Screen
name='Screen_ForgotPassword'
component={Screen_ForgotPassword}
options={{
  // header: ()=>null,
  // tabBarActiveTintColor: 'black',
  // tabBarButton: ()=>null,
  tabBarStyle: {display:'none'}
}}
/>

<Tab.Screen
name='Screen_Login'
component={Screen_Login}
options={{
  // header: ()=>null,
  // tabBarButton: ()=>null,
  
  tabBarLabel: 'Login',
  tabBarStyle: {display:'none'},
// tabBarIcon: ({ color }) => (
//   <MaterialCommunityIcons name="login" color={color} size={26} />
// ),
}}
/> */}

<Tab.Screen
name='Screen_Home'
component={Screen_Home}

options={{
// header: ()=>null,
  tabBarLabel: 'Home',
  tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons name="home" color={color} size={25} />
    
  ),
  // tabBarStyle: {display:'none'}
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

<Tab.Screen
name='Contacts'
component={Contacts}
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
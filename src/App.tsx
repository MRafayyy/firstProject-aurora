/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import 'react-native-gesture-handler'; --no needed only npm se krna tha
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
// import { Icon } from 'react-native-vector-icons/Icon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import NetInfo from "@react-native-community/netinfo";
import { addEventListener } from "@react-native-community/netinfo";

import messaging from '@react-native-firebase/messaging'
import { TransitionSpecs } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';


import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  useColorScheme,
  Dimensions
} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Keychain from 'react-native-keychain';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { Header, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()
// const Tab = createBottomTabNavigator();
// const Drawer  = createDrawerNavigator();
// const Tab = createMaterialBottomTabNavigator();
import { TabView, SceneMap } from 'react-native-tab-view';



import Screen_Login from './screens/Screen_Login';
import Screen_NadraVerification from './screens/Screen_NadraVerification';
import Screen_Registration from './screens/Screen_Registration';
// import { default as Home } from './screens/Screen_Home';
import Screen_Splash from './screens/Screen_Splash';
import Screen_Home2 from './screens/Screen_Home2';
import Screen_ForgotPassword from './screens/Screen_ForgotPassword';
import Screen_FirebaseNotif from './screens/Screen_FirebaseNotif';
import PushNotification from "react-native-push-notification";
import Screen_Decider from './screens/Screen_Decider';
import {default as Settings} from './screens/Screen_Settings'
import {default as Contacts} from './screens/Screen_SearchContacts';
import HomeTabs from './HomeTabs';
import { RevealFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import { LogLevel, OneSignal } from 'react-native-onesignal';

// import PushNotification from 'react-native-push-notification';

// import NoInternet from './components/NoInternet';
import {useConnectionStatus} from './components/NoInternet'

import SocketIOClient from 'socket.io-client'
import { io } from 'socket.io-client';
import ip from './screens/IPaddress';
import UserIdContext, { UserIdProvider } from './UserIdContext'


const demnit = ()=>{
  //  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  //  OneSignal.initialize('a24118e0-d18b-4834-9dce-adba4b8a03d3');
  //  // OneSignal.Notifications.requestPermission(true);

  //  OneSignal.Notifications.requestPermission(true);

  // // Method for listening for notification clicks
  // OneSignal.Notifications.addEventListener('click', (event) => {
  //   console.log('OneSignal: notification clicked:', event);
  // });
}

function App() {

  // const {setUserId} = useContext(UserIdContext)

const [isLoggedIn, setisLoggedIn] = useState(false)

    // const [isConnected, setisConnected] = useState(false)
    const isConnected = useConnectionStatus();
    
useEffect(()=>{
demnit();
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  // OneSignal.initialize('a24118e0-d18b-4834-9dce-adba4b8a03d3');
  // OneSignal.Notifications.requestPermission(true);
  // OneSignal.initialize("a24118e0-d18b-4834-9dce-adba4b8a03d3");
  
},[])


    // useEffect(() => {
   
    //     const unsubscribe = NetInfo.addEventListener((state) => {
    //       // console.log(state);
    //       console.log("Connection type", state.type);
    //       console.log("Is connected?", state.isConnected);
    //       setisConnected(state.isConnected)
    //     });
    //     return () => {
    //       unsubscribe();
    //     };

    // }, [])


  useEffect(()=>{
    getDeviceToken()
  },[])
  
  const getDeviceToken =async() =>{

    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    let serverKey = 'AAAADz1-KfI:APA91bGJ-sKa3F15DexhEXHxHp_XWl4dEoC6HChxD6cJF42ad9RzvTj0K0KfxwCLLeAA54nWSGHwxN8ZYd2EIbBHztsXGu57ZG7jt-QKT8peIQYvyhMEWj03oX1kO2I0AYR8KVbs09gO'
    let dvT = 'c8KHnyMrRTyXNXB9tVglFM:APA91bGVoYH4vYpKUsETdY_RxbAMZ3vXe2u4wLWhDFrya87IyuTyyStgiaypiOCfZgO5HLuMSpnIvZ4LL7gcFzWfk5_zZbT-hodd-D6RMvtkJPKaSIytPKowKcI5HgO3viZWtHFNBlOX'
  }



useEffect(() => {


    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // setUserId({notificationArrived: true})
      PushNotification.localNotification({
        ticker: "My Notification Ticker",
        channelId: "test-channel",
        channelName: "Test Channel",
        // title: remoteMessage.notification?.title,
        title: remoteMessage.notification?.title,
        // message: remoteMessage.notification?.body,
        message: remoteMessage.notification?.body,
        // bigText: "Yuhu is name of the famous chinese dish",
        // foreground: true,
        showWhen: true,
        color: 'red'
    })
    });

    return unsubscribe;
  }, []);


  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };


  return (
    <>

    {/* {isConnectedtoSocket? <Text>hey</Text>:  */}
    <UserIdProvider>

         <NavigationContainer>
        <Stack.Navigator initialRouteName='Screen_Splash' screenOptions={{ animationEnabled: true, animationTypeForReplace: 'push', ...TransitionPresets.RevealFromBottomAndroid }}  >
          <Stack.Screen name="Screen_Splash" component={Screen_Splash} options={{headerShown: false}}/>
          <Stack.Screen name="Screen_Decider" component={Screen_Decider} options={{headerShown: false}} />
          <Stack.Screen name="Screen_Login" component={Screen_Login} options={{ headerShown: false
            //  ...TransitionPresets.RevealFromBottomAndroid
    // transitionSpec: {
    //   open: TransitionSpecs.BottomSheetSlideInSpec,
    //   close: TransitionSpecs.ScaleFromCenterAndroidSpec,
    // },
  }} />
          <Stack.Screen name="Screen_NadraVerification" component={Screen_NadraVerification} options={{headerShown: false}} />
          <Stack.Screen name="Screen_Registration" component={Screen_Registration} options={{headerShown: false
            // ...TransitionPresets.RevealFromBottomAndroid
          }} />
          <Stack.Screen name="Screen_ForgotPassword" component={Screen_ForgotPassword} options={{headerShown: false}} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{
            headerShown: false
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
          </UserIdProvider>

           {/* }  */}
</>
           
)}

const styles = StyleSheet.create({
  body: {
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center'
          // marginBottom: "13%"
        },
  text: {
          margin: 10,
          fontSize: 25,
          fontWeight: '600',
          color: 'white',
          // marginBottom: 20
        }
 
});

export default App;









































// <View style={styles.body}>

// <View style={styles.container1}>
//   <View style={styles.view1}>
//     <Text style={styles.text}>1</Text>
//   </View>
//   <View style={styles.view2}>
//     <Text style={styles.text}>2</Text>
//   </View>
//   <View style={styles.view3}>
//     <Text style={styles.text}>3</Text>
//   </View>
// </View>

// <View style={styles.container2}>
//   <View style={styles.view4}>
//     <Text style={styles.text}>4</Text>
//   </View>
//   <View style={styles.view5}>
//     <Text style={styles.text}>5</Text>
//   </View>
// </View>

// <View style={styles.container3}>
//   <View style={styles.view7}>
//     <Text style={styles.text}>7</Text>
//   </View>
//   <View style={styles.view8}>
//     <Text style={styles.text}>8</Text>
//   </View>
// </View>

// </View>
// </>
// );
// }

// const styles = StyleSheet.create({

// body: {
// flex: 1,
// backgroundColor: 'orange',
// // alignItems: 'center',
// // justifyContent: 'center'
// // marginBottom: "13%"
// },
// container1: {
// flex: 1,
// flexDirection: 'row',
// },
// view1: {
// flex: 1,
// justifyContent: 'center',
// alignItems: 'center',
// backgroundColor: 'lightblue',

// },
// view2: {
// flex: 2,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'pink',
// },
// view3: {
// flex: 3,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'yellow',
// },
// container2: {
// flex: 2,
// alignItems: 'stretch',
// justifyContent: 'center',
// },
// view4: {
// flex: 1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'red'
// },
// view5: {
// flex: 1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'green'
// },

// container3: {
// flex: 3,
// flexDirection: 'row',
// },
// view7: {
// flex: 1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'white',
// color: 'black',
// },
// view8: {
// flex: 1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'darkblue'
// },
// text: {
// fontSize: 30,
// fontWeight: '600',
// color: 'black',
// // marginBottom: 20
// }

// });

// export default App;
































// const [Items, setItems] = useState([
//   { name: 'Item-1' },
//   { name: 'Item-2' },
//   { name: 'Item-3' },
//   { name: 'Item-4' },
//   { name: 'Item-5' },
//   { name: 'Item-6' },
//   { name: 'Item-7' },
//   { name: 'Item-8' },
//   { name: 'Item-9' },
//   { name: 'Item-10' },
//   { name: 'Item-11' },
//   { name: 'Item-12' },
//   { name: 'Item-13' },
// ])

// // const [Data,setData]= useState([
// //   {title}
// // ])

// const [DATA, setDATA] = useState([
//   {
//     title: 'title-1',
//     data: ['item 1-1', 'item 1-2']
//   },
//   // {
//   //   title: 'title-2',
//   //   data: ['item-1', 'item-2', 'item-3', 'item-4']
//   // },
//   // {
//     //   title: 'title-3',
//   //   data: ['item-1', 'item-2']
//   // },
//   // {
//   //   title: 'title-4',
//   //   data: ['item-1', 'item-2']
//   // },
// ]);
// const [Refreshing, setRefreshing] = useState(false)
// const [keyNo, setkeyNo] = useState(2);

// // let keyNo = 20;
// const onRefreshHandler = () => {

//   setkeyNo(keyNo + 1);
//   setDATA([...DATA,{
//     title: `title-${keyNo}`,
//     data: [`item ${keyNo}-1`, `item ${keyNo}-2`]
//   }])
  
//   setRefreshing(false);
//   // keyNo = keyNo+1; 
//   // setItems([...Items, { name: `Item-${keyNo}` }]);
//   // keyNo++;
// }

// return (
//   <>
//     <SectionList
//       keyExtractor={(item, index) => index.toString()}
//       sections={DATA}

//       renderItem={({item})=>(
//         // <View style={styles.view1}>
//         <Text style={styles.text}>{item}</Text>
//       // </View>
//   )}
//       refreshControl={
//         <RefreshControl refreshing={Refreshing}
//           onRefresh={onRefreshHandler}
//         />
//       }
      
//       renderSectionHeader={({section})=>(
//         <View style={styles.view1}>
//         <Text style={styles.text}>{section.title}</Text>
//       </View>
//       )}
//       />


//     {/* <FlatList style={styles.body} 
//     keyExtractor={(item, index)=> index.toString()}
//     data={Items}

//     renderItem={({item})=>(
//       <View style={styles.view1}>
//       <Text style={styles.text}>{item.name}</Text>
//     </View>
// )}

//     refreshControl={
//     <RefreshControl refreshing={Refreshing}
//     onRefresh={onRefreshHandler}
//     />
//     }>


//     </FlatList> */}
//   </>
// );
// }

// const styles = StyleSheet.create({

// body: {
//   flex: 1,
//   backgroundColor: 'black',
//   // alignItems: 'center',
//   // justifyContent: 'center'
//   // marginBottom: "13%"
// },

// view1: {
//   // flex: 1,
//   width: '100%',
//   height: 100,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'cyan',
//   margin: 10

// },


// text: {
//   fontSize: 30,
//   fontWeight: '600',
//   color: 'black',
//   // marginBottom: 20
// }

// });

// export default App;


























// function App() {

//   const [submitted, setSubmitted] = useState(false)
//   const [text, setText] = useState('')
  
//   const DisplayImg = ()=>{
//     if(text.length > 5){
  
//       setSubmitted(true)
//       Keyboard.dismiss();
//     }
//     else{
//       setSubmitted(false)
//       Keyboard.dismiss();
  
//     }
//   }
  
  
//     return (
//       <>
   
  
//     <ImageBackground
//     source={{uri: 'https://w0.peakpx.com/wallpaper/287/741/HD-wallpaper-gradient-background-gradient-background-blue-lockscreen.jpg'}}
//     style={styles.body}>
  
//   <Text style={styles.text}>What is your name?</Text>
//   <TextInput style={[styles.input,{color: 'white'}]} editable placeholder='e.g: Harry' placeholderTextColor={'white'} onChangeText={(value)=>setText(value)}></TextInput>
   
//    <MashButton displayImg={DisplayImg} style={{marginTop: 20}} bgcolor={'red'} />
//    <MashButton displayImg={DisplayImg} style={{margin: 30 }} bgcolor={'green'}/>
  
//     {submitted? 
//   <View>
//     <Text style={styles.text}>Good</Text>
//     <Image resizeMode='center' style={styles.image} source={{uri: 'https://images.pexels.com/photos/1102912/pexels-photo-1102912.jpeg?cs=srgb&dl=pexels-johannes-plenio-1102912.jpg&fm=jpg'}}></Image>
//   </View>  
//   :
//   <View>
//     <Text style={styles.text}>bad</Text>
//     <Image resizeMode='stretch' style={styles.image} source={{uri: 'https://themepack.me/i/c/749x467/media/g/679/dark-theme-np17.jpg'}}></Image>
//   </View> 
//   }
//     </ImageBackground>
  
  
//       </>
//     );
//   }
  
//   const styles = StyleSheet.create({
  
//     body: {
//       flex: 1,
//       backgroundColor: 'black',
//       alignItems: 'center',
//       // justifyContent: 'center'
//       // marginBottom: "13%"
//     },
//     image: {
//       width: 400,
//       height: 400
//     },
  
//     input:{
//       width: '80%',
//       height: 50,
//       borderWidth: 2,
//       borderColor: 'red',
//       color: 'white',
//       fontSize: 25,
//       textAlign: 'center',
//     },
  
//     view1: {
//       // flex: 1,
//       width: '100%',
//       height: 100,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'cyan',
//       margin: 10
  
//     },
  
  
//     text: {
//       margin: 10,
//       fontSize: 25,
//       fontWeight: '600',
//       color: 'white',
//       // marginBottom: 20
//     }
  
//   });
  
//   export default App;
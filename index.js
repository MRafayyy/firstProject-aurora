/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
// import HomeTabs from './src/HomeTabs';
import {name as appName} from './app.json';

import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import { LogLevel, OneSignal } from 'react-native-onesignal';



import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

// import HomeTabs from './src/HomeTabs';
// import { PushNotification } from 'react-native';
// import { MD3LightTheme as DefaultTheme, PaperProvider  } from 'react-native-paper';

PushNotification.configure({
  
  // (required) Called when a remote is received or opened, or local notification is opened
onNotification: function (notification) {
console.log("NOTIFICATION:", notification);

// process the notification

// (required) Called when a remote is received or opened, or local notification is opened
// notification.finish(PushNotificationIOS.FetchResult.NoData);
},

//   * - if you are not using remote notification or do not have Firebase installed, use this:
  requestPermissions: Platform.OS === 'ios'
})



// Register background handler



// messaging().getInitialNotification(async remoteMessage => {


// //     PushNotification.localNotificationSchedule(
    
// //     {
// //     channelId: "test-channel",
// //     channelName: "Test Channel",
// //     title: remoteMessage.data.title,
// //     message: remoteMessage.data.body,
// //     // bigText: "Yuhu is name of the famous chinese dish",
// //     foreground: true,
// //     showWhen: true,
// //     color: 'red',
// //     date: new Date(Date.now()),
// //     allowWhileIdle: true,
// // })
//   console.log('Message handled in kill mode!', remoteMessage);
// })


messaging().getInitialNotification(async remoteMessage => {
  console.log('Message handled in kill mode!', remoteMessage);
})



messaging().setBackgroundMessageHandler(async remoteMessage => {
//   PushNotification.localNotification({
//     // largeIconUrl: "https://www.example.tld/picture.jpg",
//     channelId: "test-channel",
//     channelName: "Test Channel",
//     // title: remoteMessage.notification?.title,
//     title: remoteMessage.notification?.title,
//     // message: remoteMessage.notification?.body,
//     message: remoteMessage.notification?.body,
//     // bigText: "Yuhu is name of the famous chinese dish",
//     // foreground: true,
//     showWhen: true,
//     color: 'red'
// })
  });







 
AppRegistry.registerComponent(appName, () => App);

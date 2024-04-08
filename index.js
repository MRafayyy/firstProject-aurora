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
console.log("NOTIFICATION:::::", notification);

PushNotification.localNotification({
  largeIconUrl: notification.data.icon,
  channelId: "test-channel",
  channelName: "Test Channel",
  title: notification.data.title,
  // message: remoteMessage.notification?.body,
  message: notification.data.body,
  // bigText: "well well famous chinese dish",
  foreground: true,
  showWhen: true,
  color: 'red',
  smallIcon: notification.data.imageUrl,
  priority: 'max',
  usesChronometer: true,
  
})



// process the notification

// (required) Called when a remote is received or opened, or local notification is opened
// notification.finish(PushNotificationIOS.FetchResult.NoData);
},


 // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
 onAction: function (notification) {
  console.log("ACTION:", notification.action);
  console.log("NOTIFICATION: actionnn");

  // process the action
},


//   * - if you are not using remote notification or do not have Firebase installed, use this:
  requestPermissions: Platform.OS === 'ios'
})

// const hey = async()=>{

//   PushNotification.localNotification({
//     channelId: "test-channel2",
//     channelName: "Test Channel2",
//     title: "You clicked on test notif button",
//     message: "remoteMessage",
//     bigText: "Yuhu is name of the famous chinese dish",
//     foreground: true,
//     showWhen: true,
//     color: 'red',
//     largeIconUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
// })
// }



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


// messaging().getInitialNotification(hey)
messaging().getInitialNotification(async remoteMessage => {
  console.log('Message handled in kill mode!', remoteMessage);
})


//local notif work if data only message and app running in background
messaging().setBackgroundMessageHandler(
  async remoteMessage => {console.log("background here")
    console.log(remoteMessage.data);
//   PushNotification.localNotification({
//     largeIconUrl: "https://www.example.tld/picture.jpg",
//     channelId: "test-channel",
//     channelName: "Test Channel",
//     title: remoteMessage.data.title,
//     // message: remoteMessage.notification?.body,
//     message: remoteMessage.data.body,
//     // bigText: "well well famous chinese dish",
//     foreground: true,
//     showWhen: true,
//     color: 'red',
//     smallIcon: remoteMessage.data.imageUrl
// })
  }
  );







 
AppRegistry.registerComponent(appName, () => App);

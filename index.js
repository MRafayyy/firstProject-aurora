/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
// import HomeTabs from './src/HomeTabs';
import {name as appName} from './app.json';

import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {LogLevel, OneSignal} from 'react-native-onesignal';

import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import imageNames from './assets/imageNames/imageNames';

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION when arrive:::::', notification);

    PushNotification.localNotification({
      largeIconUrl: notification.data.icon, //displated on the right side and when notif pops
      bigLargeIconUrl: notification.data.topRightPicUrl, //display on top right when notif arrow down
      channelId: 'test-channel',
      channelName: 'Test Channel',
      title: notification.data.title,
      visibility: 'public',
      userInfo: notification.data,
      // message: remoteMessage.notification?.body,
      message: notification.data.body,
      // bigText: "well well famous chinese dish",
      foreground: true,
      showWhen: true,
      when: new Date().getTime(),
      color: 'red',
      allowWhileIdle: true,
      // smallIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqz60t_G-CME75wZtq5x3iXR3-5BtNgJ1C6Vxrm30riQ&s',
      priority: 'max',
      smallIcon: 100,
      picture: notification.data.imageUrl, //displayed below message
    });

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    // console.log('ACTION:', notification.action);
    console.log('NOTIFICATION: actionnn');

    // process the action
  },

  //   * - if you are not using remote notification or do not have Firebase installed, use this:
  requestPermissions: Platform.OS === 'ios',
});



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
});

//local notif work if data only message and app running in background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('background here');
  // console.log(remoteMessage.data);
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
});

AppRegistry.registerComponent(appName, () => App);

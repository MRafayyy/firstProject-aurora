/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import PushNotification from "react-native-push-notification";
// import { PushNotification } from 'react-native';

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

AppRegistry.registerComponent(appName, () => App);

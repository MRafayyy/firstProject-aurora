import React, {useState, PropsWithChildren, useEffect, useContext} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
  PermissionsAndroid,
  Platform,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  BackHandler,
  Alert,
} from 'react-native';
import HomeTabs from '../HomeTabs';
import Screen_Home from './Screen_Home';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from 'react-native-keychain';
import ip from './IPaddress';
import {useConnectionStatus} from '../components/NoInternet';
import UserIdContext from '../UserIdContext';
import {connectToSocket} from '../components/SocketService';
import fontFamily from '../../assets/fontFamily/fontFamily';
import GlobalStyles from '../utils/GlobalStyles';
import colors from '../utils/color';
import UserScreenNavigation from '../navigation/Women/MaterialBottomTabsNavigation';

export default function Screen_Login({navigation, route}) {
  const {userId, setUserId} = useContext(UserIdContext);
  const isConnected = useConnectionStatus();

  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const [UsernameText, setUsernameText] = useState('');
  const [PasswordText, setPasswordText] = useState('');
  const [Loader, setLoader] = useState(false);
  const [UsernameError_msg, setUsernameError_msg] = useState(['']);
  const [PasswordError_msg, setPasswordError_msg] = useState(['']);

  const onHandleUsernameChange = value => {
    setUsernameText(value);
  };
  const onHandlePasswordChange = value => {
    setPasswordText(value);
  };

  const goToForgotPasswordScreen = () => {
    navigation.navigate('Screen_ForgotPassword');
  };
  const GoToRegistrationPage = () => {
    navigation.navigate('Screen_Registration');
  };

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: 'Test Channel',
      },
      created => console.log('channel created'),
    );
  };

  const NotificationPermission = () => {
    //this func is for requesting notification permission from user
    const checkApplicationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } catch (error) {}
      }
    };
    checkApplicationPermission();
  };

  let arr = [];

  const Login = async () => {
    !isConnected
      ? Alert.alert('No Internet', 'Please connect to the internet')
      : // Keyboard.dismiss();
        (arr = []);

    if (UsernameText.trim().length === 0 && PasswordText.trim().length === 0) {
      setUsernameError_msg(['User Id field cannot be empty']);
      setPasswordError_msg(['Password field cannot be empty']);
      return;
    } else if (UsernameText.trim().length === 0) {
      setUsernameError_msg(['User Id field cannot be empty']);
      setPasswordError_msg([]);
      return;
    } else if (PasswordText.trim().length === 0) {
      setPasswordError_msg(['Password field cannot be empty']);
      setUsernameError_msg([]);
      return;
    } else {
      setUsernameError_msg([]);
      setPasswordError_msg([]);
    }

    try {
      // try {
      setLoader(true);
      await messaging().registerDeviceForRemoteMessages();
      const FcmDeviceToken = await messaging().getToken();
      // FcmDeviceToken = token
      // let url = 'http://192.168.0.103:3000/login'
      let url = `${ip}/login`;
      console.log(FcmDeviceToken);

      const LoginData = {
        userId: UsernameText.trim(),
        password: PasswordText.trim(),
        FcmDeviceToken: FcmDeviceToken,
      };
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(LoginData),
      });

      console.log('response before jsoning : ' + response);
      response = await response.json();
      console.log('response after jsoning : ' + response);
      // } catch (error) {
      //     setLoader(false)
      //     Alert.alert("Could not get device token Error", 'Error may be generated if you are not connected to the internet', [{ style: 'cancel' }])
      // }

      if (response.success === true) {
        setLoader(true);
        try {
          const username = UsernameText.trim();
          const password = response.token.toString();
          console.info('token is:' + response.token);
          // await AsyncStorage.setItem('Token', response.token)
          await Keychain.setGenericPassword(username, password);
        } catch (error) {
          setLoader(false);
          console.info('ggggggggggggggggggggggggggaaaaaaaaaaaa' + error);
          Alert.alert('Keychain Error', error.message, [{style: 'cancel'}]);
        }

        try {
          await EncryptedStorage.setItem(
            'user_session',

            response.mongoId,
          );

          // Congrats! You've just stored your first value!
        } catch (error) {
          console.log('Encryptes storage error: ' + error);
          // There was an error on the native side
        }
        setUserId({userId: UsernameText.trim(), mongoId: response.mongoId});
        // navigation.navigate(Screen_Home,
        //    {userId: UsernameText.trim()
        // });
        // navigation.navigate(HomeTabs, {
        //   screen: Screen_Home,
        //   params: {userId: UsernameText.trim()},
        // });
        navigation.navigate(UserScreenNavigation, {
          screen: Screen_Home,
          params: {userId: UsernameText.trim()},
        });
        setUsernameText('');
        setPasswordText('');
        setUsernameError_msg([]);
        setPasswordError_msg([]);
        setLoader(false);
        const socket = connectToSocket(UsernameText.trim(), response.mongoId);
        socket.emit('LoggedIn', {
          userId: UsernameText.trim(),
          mongoId: response.mongoId,
        });
      } else if (response.success === false) {
        Alert.alert('Invalid Error', response.reason, [{style: 'cancel'}]);
        setLoader(false);
      } else if (response.success === 'FCMTokenError') {
        Alert.alert(response.success, response.reason, [{style: 'cancel'}]);
        setLoader(false);
      } else if (response.success === 'SomeError') {
        Alert.alert(response.success, response.reason, [{style: 'cancel'}]);
        setLoader(false);
      }

      // console.log(response);
    } catch (error) {
      Alert.alert('System Error', error.message, [{style: 'cancel'}]);
      setLoader(false);
      console.info('gggggggggggggggggggggggggg' + error);
    }
  };

  useEffect(() => {
    NotificationPermission();
    createChannels();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
        style={{flex: 1}}>
        {/* <ScrollView> */}
        <View style={GlobalStyles.body}>
          <Image
            source={require('../../assets/images/login.jpg')}
            style={[
              {
                width: responsiveWidth(100),
                height: responsiveHeight(40),
                resizeMode: 'cover',
                marginBottom: responsiveHeight(6),
              },
            ]}
          />

          <View style={GlobalStyles.UserPassInputBoxView}>
            <TextInput
              editable={!Loader}
              value={UsernameText}
              onChangeText={value => onHandleUsernameChange(value)}
              style={[GlobalStyles.UserPasswInputBox]}
              placeholder="User Id"
              placeholderTextColor={'black'}
              onSubmitEditing={Keyboard.dismiss}></TextInput>
            {UsernameError_msg.map((value, index) => (
              <Text
                style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]}
                key={index}>
                {value}
              </Text>
            ))}
          </View>

          <View style={GlobalStyles.UserPassInputBoxView}>
            <TextInput
              editable={!Loader}
              value={PasswordText}
              onChangeText={value => onHandlePasswordChange(value)}
              style={[GlobalStyles.UserPasswInputBox]}
              placeholder="Password"
              placeholderTextColor={'black'}
              onSubmitEditing={Keyboard.dismiss}></TextInput>
            {PasswordError_msg.map((value, index) => (
              <Text
                style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]}
                key={index}>
                {value}
              </Text>
            ))}
            <Pressable
              onPress={goToForgotPasswordScreen}
              style={{marginTop: 10}}>
              <Text style={[GlobalStyles.text, {textAlign: 'right'}]}>
                Forgot password?
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={Login}
            style={({pressed}) => [
              pressed ? {opacity: 0.8} : {},
              GlobalStyles.loginBtn,
              
              
            ]}
            disabled={Loader}>
            {Loader ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={[GlobalStyles.btntext]}>
                {' '}
                Login
              </Text>
            )}
          </Pressable>

          <View style={GlobalStyles.bottomText}>
            <Text
              style={[
                {
                  color: 'black',
                  fontSize: responsiveFontSize(1.5),
                  fontFamily: fontFamily.Regular,
                },
              ]}>
              Don't have an account?
            </Text>
            <Pressable onPress={GoToRegistrationPage}>
              <Text style={GlobalStyles.linkColor}>Create an account</Text>
            </Pressable>
          </View>
        </View>

        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({

});

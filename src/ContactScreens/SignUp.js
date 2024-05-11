import React, {useState, PropsWithChildren, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import ip from '../screens/IPaddress';
import { useConnectionStatus } from '../components/NoInternet';
import GlobalStyles from '../utils/GlobalStyles';

export default function SignUp({navigation, route}) {

  const isConnected = useConnectionStatus();

  function handleBackButtonClick() {
    navigation.navigate('ContactScreen_Login');
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

  let regex_email = /^[^\s@]+(?:@[^\s@]+(?:\.[^\s@]+)*)?$/;
  let regex_specialchar = /(?=.*?[.#?!@$%^&*-])/;
  let regex_numbers = /(?=.*?[0-9])/;
  let regex_CapAlphabet = /(?=.*?[A-Z])/;
  let regex_SmallAlphabet = /(?=.*?[a-z])/;

  const GoToLoginPage = () => {
    setEmailText();
    setUsernameText();
    setPasswordText();
    setCPasswordText();

    setUsernameError_msg([]);
    setEmailError_msg([]);
    setPasswordError_msg([]);
    setCPasswordError_msg([]);
    navigation.navigate('ContactScreen_Login');
  };


  const [EmailText, setEmailText] = useState('');
  const [UsernameText, setUsernameText] = useState('');

  const [PasswordText, setPasswordText] = useState('');
  const [CPasswordText, setCPasswordText] = useState('');

  const [Loader, setLoader] = useState(false);

  const [EmailError_msg, setEmailError_msg] = useState(['']);
  const [UsernameError_msg, setUsernameError_msg] = useState(['']);
  const [PasswordError_msg, setPasswordError_msg] = useState(['']);
  const [CPasswordError_msg, setCPasswordError_msg] = useState(['']);

  const [isClicked, setisClicked] = useState(false);



  const onHandleEmailChange = value => {
    setEmailText(value);
  };

  const onHandleUsernameChange = value => {
    setUsernameText(value);
  };

  const onHandlePasswordChange = value => {
    setPasswordText(value);
  };
  const onHandleCPasswordChange = value => {
    setCPasswordText(value);
  };

  const Register = () => {
    Keyboard.dismiss();
    !isConnected
      ? Alert.alert('No Internet', 'Please connect to the internet')
      : setisClicked(true);


    if (
      EmailError_msg.length === 0 &&
      UsernameError_msg.length === 0 &&
      PasswordError_msg.length === 0 &&
      CPasswordError_msg.length === 0
    ) {
      let url = `${ip}/contacts/register`;
      setLoader(true);

      const SendRegistrationInfo = async () => {
        try {
          const registrationData = {
            userId: UsernameText,
            email: EmailText,
            password: PasswordText,
            nadra_verified: 0,
          };
          console.log(registrationData);
          let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify(registrationData),
          });
        
          response = await response.json();
          console.log(response);

          if (response === true) {
            navigation.navigate('ContactScreen_NadraVerify', {
              userId: UsernameText,
            });
            setLoader(false);
          } else if (response === false) {
            setUsernameError_msg(['User Id or email already exists']);
            setLoader(false);
          }
        
        } catch (error) {
          Alert.alert('Error', error.message);
          setLoader(false);
          console.log(error);
        }
      };

      SendRegistrationInfo();
    }

  };
  useEffect(() => {
    let arr = [];

    const validateFields = () => {
      arr = [];


      if (!UsernameText || UsernameText.trim().length === 0) {
        setUsernameError_msg(['UserId cannot be empty']);
      } else {
        if (
          !UsernameText ||
          (UsernameText.trim().length < 3 && UsernameText.trim().length !== 0)
        ) {
          setUsernameError_msg(['length too short!']);
        } else {
          setUsernameError_msg([]);
        }
      }

      if (!EmailText || EmailText.trim().length === 0) {
        setEmailError_msg(['Email cannot be empty']);
      } else if (!EmailText || EmailText.trim().length > 0) {
        if (!EmailText.match(regex_email)) {
          setEmailError_msg(['Invalid email format']);
        } else {
          setEmailError_msg([]);
        }
      }

      setPasswordError_msg([]);

      if (!PasswordText || PasswordText.trim().length === 0) {
        arr.push('Password field cannot be empty');
        setPasswordError_msg(arr);
      } else if (!PasswordText || PasswordText.trim().length > 0) {
        if (!PasswordText.match(regex_numbers)) {
          // setPasswordError_msg([...PasswordError_msg, "should contain a number"]) //wont work this way, use array then state
          arr.push('must contain a number');
        }

        if (!PasswordText.match(regex_CapAlphabet)) {
          arr.push('must contain a capital letter');
        }
        if (!PasswordText.match(regex_SmallAlphabet)) {
          arr.push('must contain a small letter');
        }
        if (!PasswordText.match(regex_specialchar)) {
          arr.push('must contain a special character');
        }

        setPasswordError_msg(arr);
      }

      if (!CPasswordText || CPasswordText.trim() !== PasswordText.trim()) {
        setCPasswordError_msg(['Passwords do not match']);
      } else {
        setCPasswordError_msg([]);
      }
    };

    if (isClicked === true) {
      validateFields();
    }
  }, [UsernameText, EmailText, PasswordText, CPasswordText, isClicked]);

  return (
    <>
      {/* <ScrollView  showsVerticalScrollIndicator={true} style={{flex:1}}> */}
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
        style={{flex: 1}}>
        <View style={GlobalStyles.body}>
          <Image
            source={require('../../assets/images/cool_generated.jpg')}
            style={[
              {
                width: responsiveWidth(100),
                height: responsiveHeight(40),
                resizeMode: 'cover',
              },
            ]}
          />

          <View style={GlobalStyles.UserPassInputBoxView}>
            <TextInput
              onChangeText={value => onHandleUsernameChange(value)}
              style={[GlobalStyles.UserPasswInputBox]}
              editable
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
              onChangeText={value => onHandleEmailChange(value)}
              style={[GlobalStyles.UserPasswInputBox]}
              editable
              placeholder="Email"
              placeholderTextColor={'black'}
              onSubmitEditing={Keyboard.dismiss}></TextInput>
            {EmailError_msg.map((value, index) => (
              <Text
                style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]}
                key={index}>
                {value}
              </Text>
            ))}
          </View>

          <View style={[GlobalStyles.UserPassInputBoxView]}>
            <TextInput
              onChangeText={value => onHandlePasswordChange(value)}
              style={[GlobalStyles.UserPasswInputBox]}
              editable
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
          </View>

          <View style={[GlobalStyles.UserPassInputBoxView]}>
            <TextInput
              onChangeText={value => onHandleCPasswordChange(value)}
              style={[GlobalStyles.UserPasswInputBox]}
              editable
              placeholder="Confirm Password"
              placeholderTextColor={'black'}
              onSubmitEditing={Keyboard.dismiss}></TextInput>
            {CPasswordError_msg.map((value, index) => (
              <Text
                style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]}
                key={index}>
                {value}
              </Text>
            ))}
          </View>

          <Pressable
            onPress={Register}
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
                Register
              </Text>
            )}
          </Pressable>

          <View style={GlobalStyles.bottomText}>
            <Text style={[{color: 'black', fontSize: responsiveFontSize(1.5)}]}>
              Already have an account?
            </Text>
            <Pressable onPress={GoToLoginPage}>
              <Text style={GlobalStyles.linkColor}>Login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({

});

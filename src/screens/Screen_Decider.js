import React,{useEffect} from 'react';
import {useBackHandler} from '@react-native-community/hooks'


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
    BackHandler
} from 'react-native';


import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";


export default function Screen_Decider({navigation}){



    // useBackHandler(() => {
    //     // if (shouldBeHandledHere) {
    //      navigation.goBack();
    //       return true
    //     // }
    //     // let the default thing happen
    //     return false
    //   })

    function handleBackButtonClick() {
        navigation.goBack();
        return true;
      }
      
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
      }, []);
      


    const GoToLogin = () => {
        navigation.navigate('Screen_Login')
    }
    const GoToSignup = () => {
        navigation.navigate('Screen_Registration')
    }



    return(
    
        <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={{ flex: 1 }} >
          
            <View style={styles.body}>

                {/* <Image source={require('../../assets/images/forgotpassword.jpg')} style={[{ width: responsiveWidth(100), height: responsiveHeight(40), resizeMode: 'cover', marginBottom: responsiveHeight(6) }]} /> */}


                <Pressable onPress={GoToLogin} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100, marginBottom: responsiveHeight(4) }]} >

                    <Text style={[styles.btntext, { textAlign: 'center' }]}> Login</Text>
                </Pressable>


                <Pressable onPress={GoToSignup} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]}>

                    <Text style={[styles.btntext, { textAlign: 'center' }]}>Sign up</Text>
                </Pressable>



            </View>
           
        </KeyboardAvoidingView>
   
    )
}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontSize: responsiveFontSize(1.5),
        color: 'black',
        textAlign: 'left'
    },
    linkbeforetext: {
        margin: 0,
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        textAlign: 'left'
    },

    btntext: {
        fontSize: responsiveFontSize(2),
        fontWeight: '800',
        color: '#0662bf',
        // textAlign: 'left'
     
    },

    UsernameInputBoxView: {
        marginBottom: responsiveHeight(4),

    },
    PasswordInputBoxView: {
        marginBottom: responsiveHeight(4),
    },

    UsernameInputBox: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
    },
    PasswordInputBox: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
        // marginBottom: responsiveHeight(1),
    },

    loginBtn: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        color: 'white',
        // backgroundColor: '#0662bf',
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7',
        borderColor: '#0662bf',
        borderWidth: 2,
 
        // shadowOffset: 45,
        // shadowColor: 'red'
    
    },

    bottomText: {
        marginTop: responsiveHeight(15),
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        alignSelf: '',

    },
    linkColor: {
        color: 'red',
        fontSize: responsiveFontSize(1.5)
    }

});
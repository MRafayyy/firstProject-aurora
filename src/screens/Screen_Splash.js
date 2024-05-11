import React, { useState, useEffect, PropsWithChildren, useContext } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    BackHandler,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyles';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from './IPaddress';

import UserIdContext, { UserTypeContext } from '../UserIdContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import { connectToSocket, updateUserType } from '../components/SocketService';
import UserScreenNavigation from '../navigation/Women/MaterialBottomTabsNavigation';
import BottomTabs from '../navigation/Contacts/BottomTabs';
import { connectToContactSocket } from '../components/SocketService2';

export default function Screen_Splash({ navigation, route }) {
    const { userId, setUserId } = useContext(UserIdContext);
    const { userType, setUserType } = useContext(UserTypeContext);

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

    useEffect(() => {

        async function Logged2() {
            try {

                let url = `${ip}/contacts/verifyToken`;
                const credentials = await Keychain.getGenericPassword();
                // console.log(credentials);

                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                response = await response.json();
                // console.log(response)

                if (response.success === true) {
                    const mongoId = await EncryptedStorage.getItem('user_session');
                    setUserId({ userId: credentials.username, mongoId });
                    setUserType('contact')

                    navigation.navigate(BottomTabs, {
                        screen: 'ContactScreen_Home',
                        params: { userId: credentials.username },
                    });


                    const socket = connectToContactSocket(credentials.username, mongoId);
                    socket.emit('LoggedIn', {
                        userId: credentials.username,
                        mongoId: mongoId,
                    });

                } else if (response.success === false) {
                    setTimeout(() => {
                        navigation.navigate('Screen_Decider');
                    }, 2000);
                }
            } catch (error) {
                setTimeout(() => {
                    navigation.navigate('Screen_Decider');
                }, 1000);
            }
        }

        async function Logged() {
            try {
                let url = `${ip}/women/verifyToken`;
                const credentials = await Keychain.getGenericPassword();
                // console.log(credentials);

                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                response = await response.json();

                if (response.success === true) {
                    const mongoId = await EncryptedStorage.getItem('user_session');
                    // credentials = JSON.parse(credentials.username)
                    setUserId({ userId: credentials.username, mongoId });
                    setUserType('user')

                    navigation.navigate(UserScreenNavigation, {
                        screen: 'Screen_Home',
                        params: { userId: credentials.username },
                    });

                    const socket = connectToSocket(credentials.username, mongoId);
                    socket.emit('LoggedIn', {
                        userId: credentials.username,
                        mongoId: mongoId,
                    });

                } else if (response.success === false) {
                    setTimeout(() => {
                        navigation.navigate('Screen_Decider');
                    }, 2000);
                }
            } catch (error) {
                setTimeout(() => {
                    navigation.navigate('Screen_Decider');
                }, 1000);
            }
        }

        // Logged2();
        const func = async () => {

            const type = await AsyncStorage.getItem('userType');
            
            if (type === 'Contact') {
                Logged2()
            }
            else if (type === 'Women') {
                Logged();
            }
            else {
                setTimeout(() => {
                    navigation.navigate('Screen_Decider');
                }, 1000);
            }
        }

        func()

    }, []);

    return (
        <>
            <View style={styles.body}>
                <Text style={[styles.text, GlobalStyle.CustomFont]}>Aurora</Text>
                {/* <Pressable onPress={Logout} style={{backgroundColor: 'orange'}}>
        <Text style={styles.text}>Logout</Text>
    </Pressable> */}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        margin: 10,
        fontSize: 70,
        // fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
});

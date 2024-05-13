
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useBackHandler } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const moment = require('moment-timezone');
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    BackHandler,
    RefreshControl,
    FlatList,
} from 'react-native';

import { Dimensions } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ip from '../screens/IPaddress';
import messaging from '@react-native-firebase/messaging';
import UserIdContext from '../UserIdContext';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';
import NotifComponent from '../components/NotifComponent';
import NothinToShow from '../components/NothinToShow';

export default function AllNotifications() {

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'General' },
        { key: 'second', title: 'Mine' },
    ]);

    const navigation = useNavigation();
    const { userId } = useContext(UserIdContext);
    const [generalNotifs, setgeneralNotifs] = useState(true);
    const [myNotifs, setmyNotifs] = useState(false);
    const { width, height } = Dimensions.get('window');

    const [Notifs, setNotifs] = useState([]);
    const [Notifs2, setNotifs2] = useState([]);
    const [NoAlerts, setNoAlerts] = useState(false);
    const [NoAlerts2, setNoAlerts2] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    function handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // const UpdateNotifs = useCallback(() => {
            fetchNotifs();
            fetchMyNotifs();
            // }, []);
            // UpdateNotifs();
            navigation.setOptions({
                // tabBarBadge: () => { return (<Text>3</Text>) },
                tabBarBadge: () => {
                    return (
                        <Text
                            style={{
                                position: 'absolute',
                                top: height * 0.017, // 5% of screen height
                                left: width * -0.082, // 40% of screen width
                                minWidth: width * 0.02, // 5% of screen width
                                maxHeight: width * 0.02, // 5% of screen width
                                borderRadius: width * 0.035, // 3.5% of screen width
                                fontSize: width * 0.025, // 2.5% of screen width
                                lineHeight: width * 0.04, // 4% of screen width
                                alignSelf: undefined,
                                backgroundColor: 'red',
                                color: 'red',
                            }}>
                            ""
                        </Text>
                    );
                },
            });
        });

        return unsubscribe;
    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            navigation.setOptions({
                tabBarBadge: () => {
                    return (
                        <Text
                            style={{
                                position: 'absolute',
                                top: height * 0.017, // 5% of screen height
                                left: width * -0.082, // 40% of screen width
                                minWidth: width * 0, // 5% of screen width
                                maxHeight: width * 0, // 5% of screen width
                                borderRadius: width * 0.035, // 3.5% of screen width
                                fontSize: width * 0.025, // 2.5% of screen width
                                lineHeight: width * 0.04, // 4% of screen width
                                alignSelf: undefined,
                                // backgroundColor: 'red',
                                color: 'red',
                            }}>
                            {/* "" */}
                        </Text>
                    );
                },
            });
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            // tabBarBadge: () => { return (<Text>3</Text>) },
            tabBarBadge: () => {
                return <Text style={{}}>""</Text>;
            },
        });
        // const UpdateNotifs = useCallback(() => {
        fetchNotifs();
        fetchMyNotifs();
        // }, []);
        // UpdateNotifs()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
        fetchNotifs();
        fetchMyNotifs();
    }, []);

    const fetchNotifs = async () => {
        setNoAlerts(false);
        try {
            let response = await fetch(`${ip}/get-notifs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            response = await response.json();
            // console.log(response)
            if (response.length === 0) {
                setNoAlerts(true);
                return;
            } else {
                setNotifs(response.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchMyNotifs = async () => {
        setNoAlerts2(false);
        try {
            let response2 = await fetch(`${ip}/contacts/get-mynotifs/${userId.mongoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            response2 = await response2.json();

            // console.log(response)
            if (response2.status === 'failed' || response2.length===0) {
                setNoAlerts2(true);
                return;
            } else {
                setNotifs2(response2.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checking = (fetchedDate, fetchedTime) => {
        const parsedDate = moment.tz(fetchedDate, 'Asia/Karachi');

        // Function to format the date
        function formatDate(date) {
            const today = moment().tz('Asia/Karachi');

            const yesterday = moment().tz('Asia/Karachi').subtract(1, 'day');

            const dateFormatOptions = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            };

            if (date.isSame(today, 'day')) {
                return 'Today';
            } else if (date.isSame(yesterday, 'day')) {
                return 'Yesterday';
            } else {
                // console.log(date.format('Do MMMM YYYY'));
                return date.format('Do MMMM YYYY');
            }
        }

        // Function to format the time
        function formatTime(time) {
            return time;
        }

        // Format the parsed date and time
        const formattedDate = formatDate(parsedDate);
        const formattedTime = formatTime(fetchedTime);


        if (formattedDate === 'Yesterday') {
            return 'Yesterday';
        } else if (formattedDate === 'Today') {
            return fetchedTime;
        } else {
            return formattedDate;
        }
    };



    const FirstRoute = () => (
        <FlatList
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            initialNumToRender={7}
            data={Notifs}
            renderItem={useCallback(({ item }) => {
                return <NotifComponent item={item} checking={checking} />;
            }, [setNotifs])}
            keyExtractor={(item, index) => index}
        />
    );

    const SecondRoute = () => (
        Notifs2.length===0?
        <NothinToShow msg={'No Notifications'}/> :
        <FlatList

            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            initialNumToRender={7}
            data={Notifs2}
            renderItem={useCallback(({ item }) => {
                return <NotifComponent item={item} checking={checking} />;
            }, [setNotifs2])}
            keyExtractor={(item, index) => index}
        />
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });




    const renderTabBar = (props) => (
        <TabBar
            {...props}
            // pressColor={colors.blue}
            indicatorStyle={{ backgroundColor: colors.blue }}
            style={{ paddingVertical: responsiveHeight(0), backgroundColor: colors.white }}
            labelStyle={styles.notifEach}
            activeColor={colors.blue}
            inactiveColor="#666"
            renderLabel={({ route, focused, color }) => (
                <Text style={[styles.notifEach, { color }]}>
                    {route.title.split(' ').map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')}
                </Text>
            )}
        />
    );


    return (
        <>
            <View style={styles.body}>
                <Text style={styles.pageHeadingText}>Notifications</Text>

                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    notifType: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifEach: {
        fontSize: responsiveFontSize(2.1),
        fontFamily: fontFamily.SemiBold,
        padding: responsiveWidth(1),
        width: responsiveWidth(44),
        // borderBottomWidth: 1,
        textAlign: 'center',
        // color: colors.black,
        borderBottomColor: colors.blue,
    },
    notifContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(3),
        paddingBottom: responsiveHeight(3),
        paddingHorizontal: responsiveWidth(4.5),
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginVertical: responsiveHeight(0),
    },
    notifIcon: {
        alignSelf: 'flex-start',
        width: responsiveWidth(14),
        height: responsiveWidth(14),
        resizeMode: 'cover',
        borderRadius: responsiveWidth(100),
    },
    pageHeadingText: {
        fontFamily: fontFamily.Bold,
        backgroundColor: colors.blue,
        color: 'white',
        fontSize: responsiveFontSize(2.3),
        padding: responsiveWidth(5),
        borderBottomWidth: 1,
        borderColor: 'transparent',
        paddingLeft: responsiveWidth(12),
    },
    notifCategoryTitleTextStyle: {},

    notifHeadingText: {
        flex: 1,
        fontSize: responsiveFontSize(1.8),
        textAlign: 'left',
        marginLeft: responsiveWidth(4),
        color: colors.black,
        fontFamily: fontFamily.Regular,
    },

    notifBodyText: {
        paddingRight: responsiveWidth(4),
        fontSize: responsiveFontSize(1.7),
        textAlign: 'left',
        marginLeft: responsiveWidth(4),
        color: '#7a7a7a',
        fontFamily: fontFamily.Regular,
    },
    dateTimeText: {
        textAlign: 'right',
        fontSize: responsiveFontSize(1.3),
        fontFamily: fontFamily.Regular,
        paddingHorizontal: 0,
        paddingTop: responsiveHeight(0.4),
        color: '#7a7a7a',
        marginLeft: responsiveWidth(0),
        marginRight: responsiveWidth(0),
    },
});

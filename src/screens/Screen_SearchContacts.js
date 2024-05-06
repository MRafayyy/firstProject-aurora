import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  BackHandler,
  FlatList,
  RefreshControl,
  refreshing,
  TextInput,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import ip from './IPaddress';

import UserDisplay from '../components/UserDisplay';
import UserIdContext from '../UserIdContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontFamily from '../../assets/fontFamily/fontFamily';
import colors from '../utils/color';

export default function Screen_SearchContacts({navigation}) {
  const {userId} = useContext(UserIdContext);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [AllUsers, setAllUsers] = useState([]);
  const [AllUsers2, setAllUsers2] = useState([]);
  const [requestSent, setrequestSent] = useState({});

  const fetchUsers = async () => {
    try {
      const mongoId = userId.mongoId;

      let response = await fetch(`${ip}/users/${mongoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      response = await response.json();
      setAllUsers(response);
      setAllUsers2(response);
    } catch (error) {
      console.log('error here ');
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      fetchUsers();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    fetchUsers();
  }, []);

  function handleBackButtonClick() {
    navigation.navigate('Screen_Home');
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

  const handleOnChangeText = text => {
    setSearchText(text);
  };

  const onSearch = text => {
    const searchText = text.trim().toLowerCase();

    // Debugging: Log the search text
    // console.log("Search text:", searchText);

    if (searchText === '') {
      // If the search text is empty, reset to the original list
      setAllUsers(AllUsers2);
    } else {
      let tempList = AllUsers2.filter(item => {
        if (item.name && typeof item.name === 'string') {
          return item.name.toLowerCase().startsWith(searchText);
        }
        return false;
      });

      setAllUsers(tempList);
    }
    // ------------------------------------
  };

  return (
    <>
      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="people-circle"
            // name="chatbox-ellipses"
            size={30}
            color={colors.blue}
            onPress={() => navigation.navigate('Screen_MyFriends')}
            />
          <Ionicons
            // name="person-add"
            name="person-add"
            size={30}
            color={colors.blue}
            onPress={() => navigation.navigate('Screen_Friends')}
          />
          {/* <MaterialCommunityIcons
            name="account-multiple"
            size={28}
            color={'black'}
            onPress={() => navigation.navigate('Screen_Friends')}
          /> */}
        </View>

        <Pressable style={styles.searchContainer}>
          <Image
            source={require('../../assets/images/icons8search50.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.textInputStyle}
            value={searchText}
            onChangeText={text => {
              handleOnChangeText(text);
              onSearch(text);
            }}
            // placeholderTextColor={}
            
            placeholder="search name here..."></TextInput>
        </Pressable>

        {
          <FlatList
            contentContainerStyle={{
              marginTop: responsiveHeight(2),
              paddingBottom: responsiveHeight(10),
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={AllUsers}
            renderItem={({item}) => {
              return (
                <UserDisplay
                  item={item}
                  requestSent={requestSent}
                  setrequestSent={setrequestSent}
                />
              );
            }}
            keyExtractor={(item, index) => index}
          />
        }
        {/* </View> */}
      </View>

      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    margin: 5,
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
  },

  headerContainer: {
    marginTop: responsiveHeight(2),
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(7),
    paddingHorizontal: 9,
    paddingRight: responsiveWidth(6),
  },
  searchContainer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: responsiveWidth(89),
    height: responsiveHeight(6),
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(3),
    borderColor: 'gray',
    borderRadius: 20,
  },
  searchIcon: {
    alignSelf: 'center',
    marginRight: responsiveWidth(1),
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  textInputStyle: {
    paddingVertical: responsiveHeight(1),
    width: '100%',
    color: 'black',
   fontSize: responsiveFontSize(2),
  fontFamily: fontFamily.Regular,
  lineHeight: responsiveHeight(2.6),
  
  },
});

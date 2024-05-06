import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, RefreshControl, FlatList, Text} from 'react-native';
import ip from './IPaddress';
import UserIdContext from '../UserIdContext';
import FriendRequests from '../components/FriendRequests';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../utils/color';
import fontFamily from '../../assets/fontFamily/fontFamily';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NothinToShow from '../components/NothinToShow';
export default function Screen_Friends() {
  const {userId} = useContext(UserIdContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [Accepted, setAccepted] = useState({});

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const mongoId = userId.mongoId;
      let response = await fetch(`${ip}/friend-request/${mongoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        response = await response.json();

        if (response.status === 'empty') {
          console.log('no friend request found');
        } else {
          // console.log(response)

          const friendRequestsData = response.map(friendRequest => ({
            _id: friendRequest._id,
            name: friendRequest.name,
            email: friendRequest.email,
          }));

          setFriendRequests(friendRequestsData);
        }
      } else if (response.status == 500) {
        console.log('demn');
      }
    } catch (error) {
      console.log('error message: ' + error);
    }
  };

  // console.log(friendRequests[0].name)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(3),
        backgroundColor: 'white',
      }}>
      {friendRequests.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={friendRequests}
          renderItem={({item}) => {
            return (
              <FriendRequests
                item={item}
                friendRequests={friendRequests}
                setFriendRequests={setFriendRequests}
                Accepted={Accepted}
                setAccepted={setAccepted}
              />
            );
          }}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <NothinToShow msg={'No Friend Requests'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

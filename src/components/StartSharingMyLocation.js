// import { View, Text } from 'react-native'
import { useContext, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service';
import UserIdContext from '../UserIdContext';
import socket from './SocketService';

export default  function StartSharingMyLocation() {

  const {userId, setUserId} = useContext(UserIdContext)
  
  // useEffect(()=>{

    const watchId = Geolocation.watchPosition(
      position => {
        setUserId({myLocation: position.coords});
        
          socket.emit('shareCoordinates', {
            userId: userId.userId,
            mongoId: userId.mongoId,
            Location: position.coords,
          });
          
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          // fastestInterval: 5000,
          timeout: 20000,
          maximumAge: 0,
          // interval: 1000,
          distanceFilter: 1,
        },

        );
        return watchId;
      // },[])
        

}
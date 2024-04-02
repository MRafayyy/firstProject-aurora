// useLocationUpdates.js
import {useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import socket from './SocketService'; // Assuming you have a socket instance
import UserIdContext, { LocationsContext } from '../UserIdContext';


const useLocationUpdates = () => {
  const {userId, setUserId} = useContext(UserIdContext);
  const {mLocation, setmLocation} = useContext(LocationsContext)
  const [myLocation, setmyLocation] = useState(null);
  const [error, setError] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const UID = userId.userId;
  const MID = userId.mongoId

  const startLocationUpdates = () => {

    if (!isActive) {
      const id = Geolocation.watchPosition(
        position => {
        
          setmyLocation(position.coords);
          setmLocation({loc:position.coords});
         

          socket.emit('shareCoordinates', {
            userId: UID,
            mongoId: MID,
            Location: position.coords,
          });
        },
        error => {
          setError(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          // interval: 1000,
          distanceFilter: 1,
          // Other options as needed
        },
      );
      setWatchId(id);
      setIsActive(true);
    }
  };

  const stopLocationUpdates = () => {
    if (isActive && watchId) {
      Geolocation.clearWatch(watchId);
      setIsActive(false);
    }
  };

  // useEffect(() => {
  //   if (myLocation) {
  //     socket.emit('shareCoordinates', {
  //       userId: userId.userId,
  //       mongoId: userId.mongoId,
  //       Location: myLocation,
  //     });
  //   }
  // }, [myLocation, userId]);

  useEffect(() => {
    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);



  return {
    myLocation,
    error,
    isActive,
    startLocationUpdates,
    stopLocationUpdates,
  };
};

export default useLocationUpdates;

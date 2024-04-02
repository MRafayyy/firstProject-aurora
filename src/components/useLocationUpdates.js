// useLocationUpdates.js
import {useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import socket from './SocketService'; // Assuming you have a socket instance
import UserIdContext from '../UserIdContext';

const useLocationUpdates = () => {
  const {userId, setUserId} = useContext(UserIdContext);
  const [myLocation, setmyLocation] = useState(null);
  const [error, setError] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const startLocationUpdates = () => {

    if (!isActive) {
      const id = Geolocation.watchPosition(
        position => {
          //   const coords = position.coords;
          setmyLocation(position.coords);
          setUserId({myLocation: position.coords});

          socket.emit('shareCoordinates', {
            userId: userId.userId,
            mongoId: userId.mongoId,
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

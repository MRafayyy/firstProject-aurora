// useLocationUpdates.js
import {useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import socket from './SocketService'; // Assuming you have a socket instance
import UserIdContext, {LocationsContext} from '../UserIdContext';
import ip from '../screens/IPaddress';
import BackgroundService from 'react-native-background-actions';
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));


const useLocationUpdates = () => {
  
  const {userId, setUserId} = useContext(UserIdContext);
  const {mLocation, setmLocation} = useContext(LocationsContext);
  const [myLocation, setmyLocation] = useState(null);
  const [error, setError] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const UID = userId.userId;
  const MID = userId.mongoId;

  const startLocationUpdates = async() => {
    if (!isActive) {



      
      
      
      const id = Geolocation.watchPosition(
        position => {
          setmyLocation(position.coords);
          setmLocation({loc: position.coords});

          console.log('i AM THE HOOK');
          
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
          timeout: 5000,
          maximumAge: 0,
          interval: 1000,
          // distanceFilter: 5,
          // Other options as needed
        },
        );
        setWatchId(id);
        setIsActive(true);

        

      

    }
  };

  const stopLocationUpdates = () => {
    // if (isActive && watchId) {
    if (watchId !== null) {
      console.log(watchId);
      console.log(isActive);
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
    setIsActive,
    startLocationUpdates,
    stopLocationUpdates,

  };
};


const getFormattedTimeandDay = () => {
  const timestamp = Date.now();
  const date = new Date(timestamp);

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;

  const formattedDay = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  return {formattedTime, formattedDay};
};

export default useLocationUpdates;

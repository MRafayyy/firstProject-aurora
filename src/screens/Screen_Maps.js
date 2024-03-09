import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Pressable,
  Text,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

import MapView, {
  Marker,
  MarkerAnimated,
  AnimatedRegion,
} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
// import GetLocation from 'react-native-get-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import MapViewDirections from 'react-native-maps-directions';

import socket from '../components/SocketService';
import  { connectToSocket } from '../components/SocketService';



export default function Screen_Maps({ navigation }) {
  const mapref = useRef(null);
  const markerref = useRef(null);
  // const [socket, setSocket] = useState()

  const [myLocation, setmyLocation] = useState();
  const [PermissionGranted, setPermissionGranted] = useState(false);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();


  function handleBackButtonClick() {
    navigation.navigate('Screen_Home2');
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

  
  useEffect(()=>{
    // const socket = connectToSocket();
    
    // socket.emit('newMarkers', {hey: 'dagaf'});

    // return(()=>{
    //   socket.disconnect();
    // })
  },[])

  
  
  
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Location Permission',
          message: 'Please allow location permissions to continue...',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        // getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
      console.log('demnit');
    }
  };
  
  
  
  useEffect(() => {
    // const socket = connectToSocket();
    socket.on('bd',(data)=>{
      console.log("sooo")
    })

    requestLocationPermission();
    
   
  
  
      // socket.emit('newMarker', {hey: 'daga'});
  
   
    // getCurrentLocation();
    const watchId = Geolocation.watchPosition(
      position => {
        
        
        // setTimeout(()=>{
          if (mapref.current != null) {
            setmyLocation(position.coords);

            // const socket= connectToSocket();
            socket.emit('shareCoordinates', {hey: position.coords});
            
            markerref?.current.animateMarkerToCoordinate(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              7000,
              );
            }
          console.log(position);
          // console.log(myLocation)
          // }, 0);
          
          // console.log(position)
          // moveToLocation(position?.coords?.latitude, position?.coords?.longitude)
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
        return () => {
          Geolocation.clearWatch(watchId);
          // socket.disconnect();
          // socket.close();
        };

  }, []);



  const moveToLocation = async (latitude, longitude) => {
    console.log('full full' + latitude + '  ' + longitude);
    mapref?.current?.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      4000,
    );
  };


  const getCurrentLocation = (latitude, longitude) => {
    // console.log('entering get location method');
    if (PermissionGranted) {
      // Geolocation.getCurrentPosition(
      //   position => {
      //     console.log(position);
      //     setmyLocation(position.coords);
      //     moveToLocation(position.coords.latitude, position.coords.longitude);
      //   },
      //   error => {
      //     console.log(error);
      //   },
      //   {
      //     enableHighAccuracy: true,
      //     timeout: 15000,
      //     maximumAge: 1000,
      //   },
      // );

      // console.log('entered get location method');
      moveToLocation(latitude, longitude);

    }
  };

  // if (!PermissionGranted) { return <View><Text style={{ color: 'black' }}>Please allow location permissions</Text></View> }

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            zIndex: 1,
            gap: 8,
            flex: 0.5,
            marginHorizontal: responsiveWidth(2),
            color: 'black',
          }}>
          <View style={{ flex: 0.5 }}>
            <GooglePlacesAutocomplete
              styles={{
                description: { color: 'black' },
                textInput: {
                  color: 'black',
                  borderRadius: 0,
                  paddingHorizontal: responsiveWidth(1),
                },
                // poweredContainer: { display: 'none' },
                // separator: { height: 4, borderColor: 'blue', backgroundColor: 'transparent'},
                row: { borderRadius: 0 },
              }}
              textInputProps={{
                placeholderTextColor: 'black',
                returnKeyType: 'search',
              }}
              fetchDetails={true}
              placeholder="Origin"
              enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                let origin = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setOrigin(origin);
                console.log(JSON.stringify(data));
                console.log(
                  JSON.stringify(
                    'Latitude: ' +
                    details.geometry.location.lat +
                    ' Longitude: ' +
                    details.geometry.location.lng,
                  ),
                );
                moveToLocation(origin.latitude, origin.longitude);
              }}
              query={{
                // key: 'AIzaSyBuCOu5bLUlVJmvxxGBFqDjvcsu5VeUyHY',
                key: 'AIzaSyCjfsbNmLKpqGnXwVZAxNRTSWyR357T2n4',
                language: 'en',
              }}
              onFail={error => {
                console.log(error);
              }}
            />
          </View>

          <View style={{ flex: 0.5 }}>
            <GooglePlacesAutocomplete
              styles={{
                description: { color: 'black' },
                textInput: {
                  color: 'black',
                  borderRadius: 0,
                  paddingHorizontal: responsiveWidth(1),
                },
                // poweredContainer: { display: 'none' },
                // separator: { height: 4, borderColor: 'blue', backgroundColor: 'transparent'},
                row: { borderRadius: 0 },
              }}
              textInputProps={{
                placeholderTextColor: 'black',
                returnKeyType: 'search',
              }}
              fetchDetails={true}
              placeholder="Destination"
              enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                let destination = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setDestination(destination);
                console.log(JSON.stringify(data));
                console.log(
                  JSON.stringify(
                    'Latitude: ' +
                    details.geometry.location.lat +
                    ' Longitude: ' +
                    details.geometry.location.lng,
                  ),
                );
                moveToLocation(destination.latitude, destination.longitude);
              }}
              query={{
                // key: 'AIzaSyBuCOu5bLUlVJmvxxGBFqDjvcsu5VeUyHY',
                key: 'AIzaSyCjfsbNmLKpqGnXwVZAxNRTSWyR357T2n4',
                language: 'en',
              }}
              onFail={error => {
                console.log(error);
              }}
            />
          </View>
        </View>

        <MapView
          ref={mapref}
          style={styles.map}
          // initialRegion={myLocation && {
          //   latitude: myLocation.latitude,
          //   longitude: myLocation.longitude,
          //   latitudeDelta: 0.001,
          //   longitudeDelta: 0.001,
          // }}
          region={
            {
              latitude: 24.860735,
              longitude: 67.001137,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }
          }
          onRegionChange={x => {
            // console.log(x)
          }}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        >
          {/* {myLocation != undefined ? ( */}
          <MarkerAnimated
            ref={markerref}
            coordinate={
              new AnimatedRegion({
                latitude: myLocation?.latitude,
                longitude: myLocation?.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              })
            }
          // title={value.title}
          // description={value.description}
          />
          {/* ) : null} */}

          {origin !== undefined ? (
            <Marker
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
            // title={value.title}
            // description={value.description}
            />
          ) : null}

          {destination !== undefined ? (
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
            // title={value.title}
            // description={value.description}
            />
          ) : null}

          {/* {
            markerList.map((value, index) => {
              return (
                <Marker
                  draggable
                  key={index}
                  coordinate={{ latitude: value.latitude, longitude: value.longitude }}
                  title={value.title}
                  description={value.description}
                  onDragEnd={(e) => console.log({ x: e.nativeEvent.coordinate })}
                />
              )
            })
          } */}

          {/* <Circle center={{ latitude: 24.846805698946756, longitude: 67.05454979091883 }}
            radius={500}
            fillColor='#9fd1c3'
            strokeColor='green'
          /> */}

          {/* <Polyline coordinates={[
            {
              latitude: 24.811122,
              longitude: 67.044730
            },
            {
              latitude: 24.833791,
              longitude: 67.031683,
            },
            {
              latitude: 24.862219,
              longitude: 67.068301
            },
          ]} /> */}

          {origin !== undefined && destination !== undefined ? (
            <MapViewDirections
              origin={origin}
              strokeColor="blue"
              strokeWidth={3}
              destination={destination}
              apikey={'AIzaSyCjfsbNmLKpqGnXwVZAxNRTSWyR357T2n4'}
            />
          ) : null}

        </MapView>
        {/* </View> */}

        <Pressable
          disabled={myLocation == undefined ? true : false}
          onPress={() => {
            if (myLocation != undefined) {
              getCurrentLocation(myLocation.latitude, myLocation.longitude);
            }
            else {
              console.log("waitin for myLocxation")
            }
          }}
          style={{
            width: 60,
            backgroundColor: 'blue',
            height: 40,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 34,
          }}>
          {myLocation == undefined ? <ActivityIndicator size='large' color="#fff" /> :
            <Text style={{ color: 'white' }}>Get Current Location</Text>
          }
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'black',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    color: 'black',
  },
  a: {
    borderRadius: 100,
    color: 'black',
  },
});

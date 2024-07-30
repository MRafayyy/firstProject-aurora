import React, {useEffect, useRef, useState} from 'react';
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

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import MapViewDirections from 'react-native-maps-directions';

import socket from '../components/SocketService';

export default function Screen_MapTracking({navigation, route}) {
  // const userId = route.params.item;
  const mongoId = route.params.item;
  const receivedLocation = route.params.receivedLocation
  // console.log(userId)
  console.log(mongoId);

  const [showMap, setShowMap] = useState(false);
  const mapref = useRef(null);
  const markerref = useRef(null);

  const [myLocation, setmyLocation] = useState();
  const [PermissionGranted, setPermissionGranted] = useState(false);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  function handleBackButtonClick() {
    navigation.goBack();
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


  const animateTheMarker = async (lat, lng) => {
    if (mapref.current !== null) {
      // console.log("animateTheMarker clicked!")
      if (markerref.current !== undefined && markerref.current !== null) {
        markerref.current.animateMarkerToCoordinate(
          {
            latitude: lat,
            longitude: lng,
            // latitude: position.coords.latitude,
            // longitude: position.coords.longitude,
          },
          10000,
        );
      }
    }
  };

  useEffect(() => {
    console.log("receivedLocation here")
    // console.log(route.params.receivedLocation)
        setmyLocation(route.params.receivedLocation)
    
// socket.on(userId, data => {
  socket.on(mongoId, data => {
    console.log('hey' + mongoId);
    console.log('receiving user coordinates');
    if(data.Location!==null ||data.Location!==undefined){
      setmyLocation(data.Location);
    }
    // else{
    //     setmyLocation(route.params.receivedLocation)
    //   }
    });
    
    console.log("back here")

    return () => {
      socket.off(mongoId);
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
    if (PermissionGranted) {
      moveToLocation(latitude, longitude);
    }
  };

  // if (showMap === false) {
  //   console.log('why shomap false');

  //   return (
  //     <View style={styles.body}>
  //       <ActivityIndicator
  //         size="large"
  //         color="#00000"
  //         style={{justifyContent: 'center', alignItems: 'center'}}
  //       />
  //     </View>
  //   );
  // } else
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
          <View style={{flex: 0.5}}>
            <GooglePlacesAutocomplete
              styles={{
                description: {color: 'black'},
                textInput: {
                  color: 'black',
                  borderRadius: 0,
                  paddingHorizontal: responsiveWidth(1),
                },

                row: {borderRadius: 0},
              }}
              textInputProps={{
                placeholderTextColor: 'black',
                returnKeyType: 'search',
              }}
              fetchDetails={true}
              placeholder="Origin"
              enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                let origin = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setOrigin(origin);
                // console.log(JSON.stringify(data));
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
                
                key: process.env.PLACES_API_KEY,
                language: 'en',
              }}
              onFail={error => {
                console.log(error);
              }}
            />
          </View>

          <View style={{flex: 0.5}}>
            <GooglePlacesAutocomplete
              styles={{
                description: {color: 'black'},
                textInput: {
                  color: 'black',
                  borderRadius: 0,
                  paddingHorizontal: responsiveWidth(1),
                },

                row: {borderRadius: 0},
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
             
                key: process.env.PLACES_API_KEY,
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
          region={{
            latitude: 24.860735,
            longitude: 67.001137,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          onRegionChange={x => {}}
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

          {origin !== undefined && destination !== undefined ? (
            <MapViewDirections
              origin={origin}
              strokeColor="blue"
              strokeWidth={3}
              destination={destination}
              apikey={process.env.PLACES_API_KEY}
            />
          ) : null}
        </MapView>
        {/* </View> */}

        <Pressable
          // disabled={userId.mLocation.loc === undefined || null ? true : false}
          onPress={() => {
            if (myLocation != undefined) {
              moveToLocation(myLocation.latitude, myLocation.longitude);
            } else {
              console.log('waitin for user Location');
            }
          }}
          style={{
            width: responsiveWidth(35),
            backgroundColor: myLocation === undefined || null ? 'red' : 'green',
            height: 40,
            alignSelf: 'center',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 34,
            left: 50,
            borderRadius: 50,
          }}>
          {/* {userId.mLocation.loc == undefined ? <ActivityIndicator size='large' color="#fff" /> : */}
          <Text style={{color: 'white'}}>User Location</Text>
          {/* } */}
        </Pressable>

        <Pressable
          // disabled={userId.mLocation.loc === undefined || null ? true : false}
          onPress={() => {
            // if (userId.mLocation.loc != undefined) {
            //   getCurrentLocation(userId.mLocation.loc.latitude, userId.mLocation.loc.longitude);
            // } else {
            //   console.log('waitin for myLocxation');
            // }
            animateTheMarker(myLocation.latitude, myLocation.longitude);
            console.log('animateTheMarker Clicked!!!');
          }}
          style={{
            width: responsiveWidth(35),
            backgroundColor: markerref == undefined || null ? 'red' : 'green',
            height: 40,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 34,
            right: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          {myLocation == undefined || null ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={{color: 'white'}}>Status</Text>
          )}
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
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Cool Location Permission',
//         message: 'Please allow location permissions to continue...',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     console.log(granted);
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       setPermissionGranted(true);
//     } else {
//       console.log('Location permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//     console.log('demnit');
//   }
// };

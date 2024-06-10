import React, { useContext, useEffect, useRef, useState } from 'react';
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
import UserIdContext, { LocationsContext } from '../UserIdContext';
import useLocationUpdates from '../components/useLocationUpdates';

export default function Screen_Maps({ navigation }) {

  const { myLocation, error, isActive,
    startLocationUpdates,
    stopLocationUpdates } = useLocationUpdates();

  console.log("yuhu: " + myLocation)

  const mapref = useRef(null);
  const markerref = useRef(null);
  const marker2ref = useRef(null);
  const { userId } = useContext(UserIdContext);
  const { mLocation, setmLocation } = useContext(LocationsContext)
  // const [userId.mLocation.loc, setuserId.mLocation.loc] = useState();
  // const [PermissionGranted, setPermissionGranted] = useState(false);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [AnotherUsersLocation, setAnotherUsersLocation] = useState();

  const [PoliceMarkers, setPoliceMarkers] = useState([])

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



  const animateTheMarker = async (lat, lng) => {
    if (mapref.current !== null) {
      // console.log("animateTheMarker clicked!")
      if (markerref.current !== undefined && markerref.current !== null) {
        markerref.current.animateMarkerToCoordinate(
          {
            latitude: lat,
            longitude: lng,
          },
          1000,
        );
      }
    }
  };

  useEffect(() => {
    // requestLocationPermission();


    animateTheMarker(mLocation.loc.latitude, mLocation.loc.longitude);
    console.log(mLocation.loc);


  }, [mLocation.loc]);

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

  const getCurrentLocation = async(latitude, longitude) => {


    const apiKey = 'AIzaSyCjfsbNmLKpqGnXwVZAxNRTSWyR357T2n4';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=police&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPoliceMarkers(data.results);
      console.log(data.results)
    } catch (error) {
      console.log(error);
    }
  

    moveToLocation(latitude, longitude);
    // }
  };


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
          // initialRegion={userId.mLocation.loc && {
          //   latitude: userId.mLocation.loc.latitude,
          //   longitude: userId.mLocation.loc.longitude,
          //   latitudeDelta: 0.001,
          //   longitudeDelta: 0.001,
          // }}
          region={{
            latitude: 24.860735,
            longitude: 67.001137,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          onRegionChange={x => {
            // console.log(x)
          }}
        // showsUserLocation={true}
        // showsuserId.mLocation.locButton={true}
        >

{/* Police */}
{
(PoliceMarkers===null || PoliceMarkers.length!==0) &&
PoliceMarkers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
            />
          ))}
{/* Police */}


          {/* ------------------------------------------------ */}
          <MarkerAnimated
            pinColor={'blue'}
            ref={markerref}
            coordinate={
              new AnimatedRegion({
                latitude: mLocation.loc?.latitude,
                longitude: mLocation.loc?.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              })
            }
          // title={value.title}
          // description={value.description}
          />
          {/* ------------------------------------------------ */}
          <MarkerAnimated
            pinColor={'orange'}
            ref={marker2ref}
            coordinate={
              new AnimatedRegion({
                latitude: AnotherUsersLocation?.latitude,
                longitude: AnotherUsersLocation?.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              })
            }
          // title={"hey"}
          // description={"hey there"}
          />
          {/* ------------------------------------------------ */}

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
          // disabled={userId.mLocation.loc === undefined || null ? true : false}
          onPress={() => {
            if (mLocation.loc != undefined) {
              getCurrentLocation(mLocation.loc.latitude, mLocation.loc.longitude);
            } else {
              console.log('waitin for myLocxation');
            }
          }}
          style={{
            width: responsiveWidth(35),
            backgroundColor: mLocation.loc === undefined || null ? 'red' : 'green',
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
          <Text style={{ color: 'white' }}>My Location</Text>
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
            animateTheMarker(mLocation.loc.latitude, mLocation.loc.longitude);
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
          {mLocation.loc == undefined || null ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={{ color: 'white' }}>Status</Text>
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
});

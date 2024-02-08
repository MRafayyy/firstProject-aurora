import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, PermissionsAndroid, Pressable, Text, BackHandler } from 'react-native'
import MapView, { Circle, Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Screen_Home from './Screen_Home2';
import MapViewDirections from 'react-native-maps-directions';

export default function Screen_Maps() {

  const mapref = useRef(null)

  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  const [MLat, setMLat] = useState(33)
  const [MLong, setMLong] = useState(33)


  const [markerList, setMarkerList] = useState([
    {
      latitude: 24.806327,
      longitude: 67.046672,
      title: 'Team A',
      description: 'my current location'
    },
    {
      latitude: 24.847379,
      longitude: 67.015945,
      title: 'Team A',
      description: 'my current location'
    },
    {
      latitude: 24.885537,
      longitude: 67.081176,
      title: 'Team A',
      description: 'my current location'
    },
  ])

  function handleBackButtonClick() {
    navigation.navigate('Screen_Home');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  useEffect(() => {
    requestLocationPermission()

    // if (requestLocationPermission()) {
    //   getLocation()
    // }
  }, [])


  const moveToLocation = async(latitude, longitude) => {
console.log("full full"+ latitude+ "  "+ longitude)
    mapref.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,

    },
    5000,
    )

  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = async () => {

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setMLong(position.coords.longitude)
        setMLat(position.coords.latitude)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  }




  return (
    <>
      <View style={styles.container}>

        <View style={{flexDirection: 'row', zIndex: 1, gap:8 , flex: 0.5, marginHorizontal: responsiveWidth(2), color: 'black' }}>
         
         <View style={{flex:0.5}}>

          <GooglePlacesAutocomplete
            styles={{
              description: { color: 'black' },
              textInput: { color: 'black', borderRadius: 0, paddingHorizontal: responsiveWidth(1) },
              // poweredContainer: { display: 'none' },
              // separator: { height: 4, borderColor: 'blue', backgroundColor: 'transparent'},
              row: { borderRadius: 0 },              
            }}

            textInputProps={{
              placeholderTextColor: 'black',
              returnKeyType: 'search'
            }}

            fetchDetails={true}
            placeholder='Origin'
            enablePoweredByContainer={false}

            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              let origin = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              }
              setOrigin(origin);
              console.log(JSON.stringify(data));
              console.log(JSON.stringify("Latitude: " + details.geometry.location.lat + " Longitude: " + details.geometry.location.lng));
              moveToLocation(origin.latitude, origin.longitude)
            }}
            query={{
              // key: 'AIzaSyBuCOu5bLUlVJmvxxGBFqDjvcsu5VeUyHY',
              key: 'AIzaSyCjfsbNmLKpqGnXwVZAxNRTSWyR357T2n4',
              language: 'en',
            }}
            
            onFail={(error) => {
              console.log(error)
            }}
            />
            </View>


<View style={{flex: 0.5}}>

          <GooglePlacesAutocomplete
          
          styles={{
              description: { color: 'black' },
              textInput: { color: 'black', borderRadius: 0, paddingHorizontal: responsiveWidth(1) },
              // poweredContainer: { display: 'none' },
              // separator: { height: 4, borderColor: 'blue', backgroundColor: 'transparent'},
              row: { borderRadius: 0 },              
            }}

            textInputProps={{
              placeholderTextColor: 'black',
              returnKeyType: 'search'
            }}

            fetchDetails={true}
            placeholder='Destination'
            enablePoweredByContainer={false}
            
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              let destination = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              }
              setDestination(destination);
              console.log(JSON.stringify(data));
              console.log(JSON.stringify("Latitude: " + details.geometry.location.lat + " Longitude: " + details.geometry.location.lng));
              moveToLocation(destination.latitude, destination.longitude)
            }}
            query={{
              // key: 'AIzaSyBuCOu5bLUlVJmvxxGBFqDjvcsu5VeUyHY',
              key: 'AIzaSyCjfsbNmLKpqGnXwVZAxNRTSWyR357T2n4',
              language: 'en',
            }}
            
            onFail={(error) => {
              console.log(error)
            }}
            />
            </View>

        </View>


        {/* <View style={{}}> */}
        <MapView
          ref={mapref}
          style={styles.map}
          region={{
            latitude: 24.860735,
            longitude: 67.001137,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          
          onRegionChange={x => {
            // console.log(x)
          }}
        >

          {origin!== undefined?
        <Marker
        coordinate={{ latitude: origin.latitude, longitude: origin.longitude  }}
        // title={value.title}
        // description={value.description}
      /> : null  
        }

          {destination!== undefined?
        <Marker
        coordinate={{ latitude: destination.latitude, longitude: destination.longitude  }}
        // title={value.title}
        // description={value.description}
      /> : null  
        }

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


{origin!== undefined && destination !== undefined?
<MapViewDirections
    origin={origin}
    strokeColor='blue'
    strokeWidth={3}
    destination={destination}
    apikey={'AIzaSyCjfsbNmLKpqGnXwVZAxNRTSWyR357T2n4'}
    />
: null  }

        </MapView>
        {/* </View> */}

        <Pressable onPress={() => getLocation()} style={{ width: 40, backgroundColor: 'blue', height: 40, alignSelf: 'center', position: 'absolute', bottom: 34 }}>
          <Text>Get Current Location</Text>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({

  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'black'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    color: 'black'
  },
  a: {
    borderRadius: 100,
    color: 'black'
  }
})

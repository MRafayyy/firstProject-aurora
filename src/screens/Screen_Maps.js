import React, { useEffect, useState } from 'react'
import { StyleSheet, View, PermissionsAndroid, Pressable, Text } from 'react-native'
import MapView, { Circle, Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Screen_Maps() {

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

  useEffect(() => {
    requestLocationPermission()

    // if (requestLocationPermission()) {
    //   getLocation()
    // }
  }, [])

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

        <View style={{zIndex:1}}>
        <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyBuCOu5bLUlVJmvxxGBFqDjvcsu5VeUyHY',
        language: 'en',
      }}

      onFail={(error)=>{
        console.log(error)
      }}
    />
        </View>


        <MapView
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

{
  markerList.map((value, index)=>{
    return(
      <Marker 
      draggable
      key={index}
      coordinate={{latitude: value.latitude, longitude: value.longitude} }
      title={value.title}
      description={value.description}
      onDragEnd={(e) => console.log({ x: e.nativeEvent.coordinate })}
       />
    )
  })
}

          {/* <Marker

            coordinate={{ latitude: 24.806327, longitude: 67.046672 }}
            title={"here"}
            description={"my current location"}
          /> */}
   
<Circle center={{latitude: 24.846805698946756, longitude: 67.05454979091883}}
radius={500}
fillColor='#9fd1c3'
strokeColor='green'
/>

<Polyline coordinates={[
  {
  latitude: 24.811122,
  longitude:  67.044730
},
  {
  latitude: 24.833791, 
  longitude: 67.031683,
},
  {
  latitude: 24.862219, 
  longitude:  67.068301
},
]} />

        </MapView>
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
   flex:1,
   justifyContent: 'flex-start',
   alignItems: 'center'
  },
  map: {
  ...StyleSheet.absoluteFillObject,
    zIndex:0
  },
})

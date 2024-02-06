import React, { useEffect, useState } from 'react'
import { StyleSheet, View, PermissionsAndroid, Pressable, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default function Screen_Maps() {

const [MLat, setMLat]= useState(33)
const [MLong, setMLong]= useState(33)

useEffect(()=>{
  requestLocationPermission()

  // if (requestLocationPermission()) {
  //   getLocation()
  // }
},[])

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

  const getLocation = async()=>{
  
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

    <MapView
    style={styles.map}
  initialRegion={{
    latitude: 31.582045,
    longitude: 74.329376,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
  onRegionChange={x=>{
    // console.log(x)
  }}
>
  <Marker
   coordinate={{latitude: MLat, longitude: MLong}} 
  // draggable={true} onDragEnd={(e) => console.log({ x: e.nativeEvent.coordinate })}
  />
  {/* <Marker
   coordinate={{latitude: MLat-0.1, longitude: MLong-0.1}} 
  // draggable={true} onDragEnd={(e) => console.log({ x: e.nativeEvent.coordinate })}
  /> */}
</MapView>
<Pressable onPress={()=> getLocation()} style={{width:40,backgroundColor: 'blue', height: 40, alignSelf: 'center', position: 'absolute', bottom: 34}}>
  <Text>Get Current Location</Text>
</Pressable>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

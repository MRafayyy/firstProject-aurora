import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps';

export default function Screen_Maps() {
  return (
    <>
    <View style={{flex:1}}>

    <MapView
    style={{width: '100%', height: '100%'}}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    
})

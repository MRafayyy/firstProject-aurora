import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default function Screen_FriendProfile({navigation,route}) {

    const item = route.params.item
    console.log(item._id)
    // console.log(item.is_online)
    const GoToTrackingPage = () =>{
        navigation.navigate('Screen_MapTracking', {item: item._id})
      }



  return (
    <View style={styles.container}>
   
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Name</Text>
        <Text style={styles.fieldValue}>{item.name}</Text>
      </View>

      <Pressable onPress={GoToTrackingPage} style={{justifyContent: 'center', alignItems: 'center',width: responsiveWidth(20), height: responsiveHeight(7), backgroundColor: 'orange'}}><Text style={{color: 'black', fontSize: responsiveFontSize(2)}}>Track</Text></Pressable>
    
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1, // Make the screen take up the whole view
      padding: 20,
      alignItems: 'center', // Center fields horizontally
    },
    fieldLabel: {
      fontSize: responsiveFontSize(2),
      fontWeight: 'bold',
      //   marginBottom: 5,
    },
    fieldValue: {
        fontSize: responsiveFontSize(2),
        
    },
    fieldContainer: {
        width: responsiveWidth(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      marginBottom: 20, // Add margin between fields
    },
  });
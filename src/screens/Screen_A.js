import React, { useState } from 'react';
// import MashButton from './CustomButton';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';




export default function Screen_A({navigation}){
    // const navigation = useNavigation();
  
  const onPressHandler = ()=>{
  navigation.navigate('Screen_B', {ItemName: "hello man!", ItemId: "demn"});
  // navigation.replace('Screen_B');
  }
  return(
    <View style={styles.body}>
      <Text style={styles.text}> Screen A</Text>
      <Pressable 
        onPress={onPressHandler}
      style={({pressed})=>(
        {backgroundColor: pressed? 'red': 'green'}
      )}
      >
        <Text style={styles.text}>Go to Screen B</Text>
      </Pressable>
    </View>
  );
  }
  

  const styles = StyleSheet.create({
    body: {
            flex: 1,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
            // marginBottom: "13%"
          },
    text: {
            margin: 10,
            fontSize: 25,
            fontWeight: '600',
            color: 'white',
            // marginBottom: 20
          }
   
  });
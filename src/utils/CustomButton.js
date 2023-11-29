import React from 'react'
import { Pressable, TouchableHighlight } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'

 const MashButton = (props)=> {
  return (
  
   <Pressable onPress={props.displayImg} style={({pressed})=>[
    {backgroundColor: pressed? 'yellow': props.bgcolor, ...props.style},
    // {...props.style}
   ]} 
   >
    <Text style={styles.text}>Submit</Text>
  </Pressable>
  
  )


}

const styles = StyleSheet.create({
    text: {
        margin: 10,
        fontSize: 25,
        fontWeight: '600',
        color: 'white',
        // marginBottom: 20
      }
})


export default MashButton;
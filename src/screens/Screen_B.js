import React, { useState, useEffect } from 'react';
// import MashButton from './CustomButton';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
  SectionList
} from 'react-native';




export default function Screen_B({ navigation, route }) {

  // const { ItemName, ItemId } = route.params;
  const onPressHandler = () => {
    navigation.navigate('Screen_A');
    // navigation.goBack();
  }

  // let apiData;
  const [apiData, setapiData] = useState([]);

  const getApi = async () => {
    const url = "https://mocki.io/v1/abfa427b-5d32-4aab-8298-e3c3aa0a6744";

    try {
      let response = await fetch(url, {
        method: "GET",
        headers:
          { 'Content-Type': 'application/json' },

      })

      response = await response.json();
      setapiData(response);

    } catch (error) {
      console.log(error);
    }
    // return response
  }

  useEffect(() => {
  //  getApi();
  })
  

  return (
    <View style={styles.body}>
      <Text style={styles.text}> Screen B</Text>
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => ([
          { backgroundColor: pressed ? 'red' : 'green' },
        ]
        )}
      >
        <Text style={styles.text}>Go to Screen A</Text>
      </Pressable>

      {/* <Text style={styles.text}>{ItemName}</Text> */}
      {/* <Text style={styles.text}>{ItemId}</Text> */}

      <ScrollView  >{apiData.map((value,index) => (
        <Text key={index} style={styles.text}>Country: {value.country}, City: {value.city}</Text>
      ))}</ScrollView>
      {/* <Text style={styles.text}>{apiData[1].country}</Text> */}


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
  },
  view1: {
  // flex: 1,
  width: '100%',
  height: 100,
  // justifyContent: 'center',
  // alignItems: 'center',
  // backgroundColor: 'cyan',
  color: 'white',
  margin: 10

},

});
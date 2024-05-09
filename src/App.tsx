/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'; //no needed only npm se krna tha
import React, {useContext, useRef} from 'react';
import {useEffect, useState} from 'react';

import messaging from '@react-native-firebase/messaging';

import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Header, createStackNavigator} from '@react-navigation/stack';

import UserIdContext, {UserIdProvider} from './UserIdContext';

import {navigationRef} from './RootNavigation';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import fontFamily from '../assets/fontFamily/fontFamily';
import colors from './utils/color';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import StackNavigation from './navigation/Women/StackNavigation';
import StackNavigation2 from './navigation/Contacts/StackNavigation2';




export default function App() {
  useEffect(() => {
    getDeviceToken();
  }, []);

  const a = useContext(UserIdContext);
  console.log(a?.userId?.a)

  const getDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    let serverKey =
      'AAAADz1-KfI:APA91bGJ-sKa3F15DexhEXHxHp_XWl4dEoC6HChxD6cJF42ad9RzvTj0K0KfxwCLLeAA54nWSGHwxN8ZYd2EIbBHztsXGu57ZG7jt-QKT8peIQYvyhMEWj03oX1kO2I0AYR8KVbs09gO';
    let dvT =
      'c8KHnyMrRTyXNXB9tVglFM:APA91bGVoYH4vYpKUsETdY_RxbAMZ3vXe2u4wLWhDFrya87IyuTyyStgiaypiOCfZgO5HLuMSpnIvZ4LL7gcFzWfk5_zZbT-hodd-D6RMvtkJPKaSIytPKowKcI5HgO3viZWtHFNBlOX';
  };

  // const config = {
  //   animation: 'spring',
  //   config: {
  //     stiffness: 1000,
  //     damping: 500,
  //     mass: 3,
  //     overshootClamping: true,
  //     restDisplacementThreshold: 0.01,
  //     restSpeedThreshold: 0.01,
  //   },
  // };

  return (
    <>

      <UserIdProvider>
        <NavigationContainer ref={navigationRef}>
         {a?.userId?.a===null?
         <StackNavigation2/>:
          <StackNavigation/>
    }
        </NavigationContainer>
      </UserIdProvider>

    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    // margin: 10,
    // fontSize: 25,
    color: colors.black,
    // fontFamily: fontFamily. Regular,
  },
  headerTitleStyle: {
    fontFamily: fontFamily.Regular,
    lineHeight: responsiveHeight(7.25),
    fontSize: responsiveFontSize(1.7),
  },
});

// export default App;

// export {navigationRef};

// <View style={styles.body}>

// <View style={styles.container1}>
//   <View style={styles.view1}>
//     <Text style={styles.text}>1</Text>
//   </View>
//   <View style={styles.view2}>
//     <Text style={styles.text}>2</Text>
//   </View>
//   <View style={styles.view3}>
//     <Text style={styles.text}>3</Text>
//   </View>
// </View>

// <View style={styles.container2}>
//   <View style={styles.view4}>
//     <Text style={styles.text}>4</Text>
//   </View>
//   <View style={styles.view5}>
//     <Text style={styles.text}>5</Text>
//   </View>
// </View>

// <View style={styles.container3}>
//   <View style={styles.view7}>
//     <Text style={styles.text}>7</Text>
//   </View>
//   <View style={styles.view8}>
//     <Text style={styles.text}>8</Text>
//   </View>
// </View>

// </View>
// </>
// );
// }

// const styles = StyleSheet.create({

// body: {
// flex: 1,
// backgroundColor: 'orange',
// // alignItems: 'center',
// // justifyContent: 'center'
// // marginBottom: "13%"
// },
// container1: {
// flex: 1,
// flexDirection: 'row',
// },
// view1: {
// flex: 1,
// justifyContent: 'center',
// alignItems: 'center',
// backgroundColor: 'lightblue',

// },
// view2: {
// flex: 2,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'pink',
// },
// view3: {
// flex: 3,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'yellow',
// },
// container2: {
// flex: 2,
// alignItems: 'stretch',
// justifyContent: 'center',
// },
// view4: {
// flex: 1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'red'
// },
// view5: {
// flex: 1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'green'
// },

// container3: {
// flex: 3,
// flexDirection: 'row',
// },
// view7: {
// flex: 1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'white',
// color: 'black',
// },
// view8: {
// flex: 1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'darkblue'
// },
// text: {
// fontSize: 30,
// fontWeight: '600',
// color: 'black',
// // marginBottom: 20
// }

// });

// export default App;

// const [Items, setItems] = useState([
//   { name: 'Item-1' },
//   { name: 'Item-2' },
//   { name: 'Item-3' },
//   { name: 'Item-4' },
//   { name: 'Item-5' },
//   { name: 'Item-6' },
//   { name: 'Item-7' },
//   { name: 'Item-8' },
//   { name: 'Item-9' },
//   { name: 'Item-10' },
//   { name: 'Item-11' },
//   { name: 'Item-12' },
//   { name: 'Item-13' },
// ])

// // const [Data,setData]= useState([
// //   {title}
// // ])

// const [DATA, setDATA] = useState([
//   {
//     title: 'title-1',
//     data: ['item 1-1', 'item 1-2']
//   },
//   // {
//   //   title: 'title-2',
//   //   data: ['item-1', 'item-2', 'item-3', 'item-4']
//   // },
//   // {
//     //   title: 'title-3',
//   //   data: ['item-1', 'item-2']
//   // },
//   // {
//   //   title: 'title-4',
//   //   data: ['item-1', 'item-2']
//   // },
// ]);
// const [Refreshing, setRefreshing] = useState(false)
// const [keyNo, setkeyNo] = useState(2);

// // let keyNo = 20;
// const onRefreshHandler = () => {

//   setkeyNo(keyNo + 1);
//   setDATA([...DATA,{
//     title: `title-${keyNo}`,
//     data: [`item ${keyNo}-1`, `item ${keyNo}-2`]
//   }])

//   setRefreshing(false);
//   // keyNo = keyNo+1;
//   // setItems([...Items, { name: `Item-${keyNo}` }]);
//   // keyNo++;
// }

// return (
//   <>
//     <SectionList
//       keyExtractor={(item, index) => index.toString()}
//       sections={DATA}

//       renderItem={({item})=>(
//         // <View style={styles.view1}>
//         <Text style={styles.text}>{item}</Text>
//       // </View>
//   )}
//       refreshControl={
//         <RefreshControl refreshing={Refreshing}
//           onRefresh={onRefreshHandler}
//         />
//       }

//       renderSectionHeader={({section})=>(
//         <View style={styles.view1}>
//         <Text style={styles.text}>{section.title}</Text>
//       </View>
//       )}
//       />

//     {/* <FlatList style={styles.body}
//     keyExtractor={(item, index)=> index.toString()}
//     data={Items}

//     renderItem={({item})=>(
//       <View style={styles.view1}>
//       <Text style={styles.text}>{item.name}</Text>
//     </View>
// )}

//     refreshControl={
//     <RefreshControl refreshing={Refreshing}
//     onRefresh={onRefreshHandler}
//     />
//     }>

//     </FlatList> */}
//   </>
// );
// }

// const styles = StyleSheet.create({

// body: {
//   flex: 1,
//   backgroundColor: 'black',
//   // alignItems: 'center',
//   // justifyContent: 'center'
//   // marginBottom: "13%"
// },

// view1: {
//   // flex: 1,
//   width: '100%',
//   height: 100,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'cyan',
//   margin: 10

// },

// text: {
//   fontSize: 30,
//   fontWeight: '600',
//   color: 'black',
//   // marginBottom: 20
// }

// });

// export default App;

// function App() {

//   const [submitted, setSubmitted] = useState(false)
//   const [text, setText] = useState('')

//   const DisplayImg = ()=>{
//     if(text.length > 5){

//       setSubmitted(true)
//       Keyboard.dismiss();
//     }
//     else{
//       setSubmitted(false)
//       Keyboard.dismiss();

//     }
//   }

//     return (
//       <>

//     <ImageBackground
//     source={{uri: 'https://w0.peakpx.com/wallpaper/287/741/HD-wallpaper-gradient-background-gradient-background-blue-lockscreen.jpg'}}
//     style={styles.body}>

//   <Text style={styles.text}>What is your name?</Text>
//   <TextInput style={[styles.input,{color: 'white'}]} editable placeholder='e.g: Harry' placeholderTextColor={'white'} onChangeText={(value)=>setText(value)}></TextInput>

//    <MashButton displayImg={DisplayImg} style={{marginTop: 20}} bgcolor={'red'} />
//    <MashButton displayImg={DisplayImg} style={{margin: 30 }} bgcolor={'green'}/>

//     {submitted?
//   <View>
//     <Text style={styles.text}>Good</Text>
//     <Image resizeMode='center' style={styles.image} source={{uri: 'https://images.pexels.com/photos/1102912/pexels-photo-1102912.jpeg?cs=srgb&dl=pexels-johannes-plenio-1102912.jpg&fm=jpg'}}></Image>
//   </View>
//   :
//   <View>
//     <Text style={styles.text}>bad</Text>
//     <Image resizeMode='stretch' style={styles.image} source={{uri: 'https://themepack.me/i/c/749x467/media/g/679/dark-theme-np17.jpg'}}></Image>
//   </View>
//   }
//     </ImageBackground>

//       </>
//     );
//   }


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import 'react-native-gesture-handler'; --no needed only npm se krna tha
import React from 'react';
import { useEffect, useState } from 'react';
// import { Icon } from 'react-native-vector-icons/Icon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import AsyncStorage from '@react-native-async-storage/async-storage';

// import MashButton from './CustomButton';
// import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as Keychain from 'react-native-keychain';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;


// import { useNavigation } from '@react-navigation/native';
// https://reactnavigation.org/docs/typescript/ --this link

// type RootStackParamList = {
//   Screen_A: undefined;
//   Screen_B: undefined;
// };

// import { StackScreenProps } from '@react-navigation/stack';

// type Props1 = StackScreenProps<RootStackParamList, 'Screen_A'>;
// type Props2 = StackScreenProps<RootStackParamList, 'Screen_B'>;

// const Stack  =  createStackNavigator<RootStackParamList>(); 

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
// const Drawer  = createDrawerNavigator();


// import Screen_A from './screens/Screen_A'
import Screen_B from './screens/Screen_B';
import Screen_Login from './screens/Screen_Login';
import Screen_NadraVerification from './screens/Screen_NadraVerification';
import Screen_Registration from './screens/Screen_Registration';
import Screen_Home from './screens/Screen_Home';
import Screen_Splash from './screens/Screen_Splash';
import Screen_Home2 from './screens/Screen_Home2';
import Screen_ForgotPassword from './screens/Screen_ForgotPassword';


// import PushNotification from 'react-native-push-notification';



function App() {
  
  



const [isLoggedIn, setisLoggedIn] = useState(false)

  useEffect(() => {
  async function Logged(){
//     try {
//       let url = 'http://192.168.0.103:3000/verifyToken'
//       const credentials = await Keychain.getGenericPassword();
//       let response = await fetch(url, {
//           method: 'POST',
//           headers: {
//               'Content-Type': "application/json"
//           },
//           body: JSON.stringify(credentials)
//       })
//       response = await response.json();
//       if (response.success === true) {
//            setisLoggedIn(true)

// }
// else if (response.success === false) {
//         setisLoggedIn(false)
   
//       }

//   } catch (error) {
//       console.log(error)
//   }
}
Logged();
  }, [])
  


  return (
    <>
 <NavigationContainer>
{/* <Tab.Navigator initialRouteName={isLoggedIn? 'Screen_Home': 'Screen_Login'}  */}
<Tab.Navigator initialRouteName='Screen_Splash'
screenOptions={({route})=>(
  {
    tabBarIcon: ({focused,size, color})=>{
      let iconName='';
      // if(route.name==='Screen_A'){
      //  iconName = 'x-ray';
      //  size=focused?19: 15;
      //  color=focused? 'red':'cyan';
      // }
      if(route.name==='Screen_Registration'){
        iconName = 'registered';
        size=focused?23: 19;
        color=focused? 'red':'cyan';
      }
      else if(route.name==='Screen_B'){
        iconName = 'user';
        size=focused?23: 15;
        color=focused? 'red':'cyan';
      }
      else if(route.name==='Screen_NadraVerification'){
        iconName = 'sign-in-alt';
        size=focused?23: 19;
        color=focused? 'red':'cyan';
      }
      else if(route.name==='Screen_Login'){
        iconName = 'user';
        size=focused?23: 19;
        color=focused? 'red':'cyan';
      }
      else if(route.name==='Screen_Home'){
        iconName = 'home';
        size=focused?23: 19;
        color=focused? 'red':'cyan';
      }
      else if(route.name==='Screen_Home2'){
        iconName = 'wrench';
        size=focused?23: 19;
        color=focused? 'red':'cyan';
      }
      else if(route.name==='Screen_ForgotPassword'){
        iconName = 'car';
        size=focused?23: 19;
        color=focused? 'red':'cyan';
      }

      return(
       <FontAwesome5 
       name={iconName}
       size={size} 
       color={color}
      />
      );
    },
    tabBarActiveTintColor: 'pink',
    tabBarInactiveTintColor: 'black',
    tabBarActiveBackgroundColor: 'black',
    tabBarInactiveBackgroundColor: 'black',
    tabBarShowLabel: false,
    tabBarLabelStyle:{fontSize: 19},
    header: ()=>null,
    
  }
  )}
>
{/* // screenOptions={{header: ()=> null}} */}

{/* <Tab.Screen
name='Screen_A'
component={Screen_A}
options={{
  // header: ()=>{
    //   return null;
    // },
  // tabBarBadge: 1,
  tabBarIcon: ()=>null,
}}
/> */}

{/* <Tab.Screen
name='Screen_B'
component={Screen_B}
options={{
  // header: ()=>null
  // tabBarIcon: ()=>null,
  tabBarButton: ()=>null,
}}
/> */}

<Tab.Screen
name='Screen_Registration'
component={Screen_Registration}
options={{
  // header: ()=>null
  // tabBarButton: ()=>null
  // tabBarStyle: {display:'none'}
}}
/>
<Tab.Screen
name='Screen_NadraVerification'
component={Screen_NadraVerification}
options={{
  // header: ()=>null
}}
/>
<Tab.Screen
name='Screen_Login'
component={Screen_Login}
options={{
  // header: ()=>null
  // tabBarButton: ()=>null,
}}
/>

<Tab.Screen
name='Screen_Home'
component={Screen_Home}
options={{
  // header: ()=>null
  // tabBarActiveTintColor: 'black'
  // tabBarButton: ()=>null
}}
/>

<Tab.Screen
name='Screen_Splash'
component={Screen_Splash}
options={{
  // header: ()=>null
  // tabBarActiveTintColor: 'black'
  tabBarButton: ()=>null,
  tabBarStyle: {display:'none'}
}}
/>


<Tab.Screen
name='Screen_Home2'
component={Screen_Home2}
options={{
  // header: ()=>null
  // tabBarActiveTintColor: 'black'
  tabBarButton: ()=>null,
  tabBarStyle: {display:'none'}
}}
/>


<Tab.Screen
name='Screen_ForgotPassword'
component={Screen_ForgotPassword}
options={{
  // header: ()=>null
  // tabBarActiveTintColor: 'black'
  tabBarButton: ()=>null,
  tabBarStyle: {display:'none'}
}}
/>

</Tab.Navigator>

 </NavigationContainer>
    </>
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

export default App;








































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
  
//   const styles = StyleSheet.create({
  
//     body: {
//       flex: 1,
//       backgroundColor: 'black',
//       alignItems: 'center',
//       // justifyContent: 'center'
//       // marginBottom: "13%"
//     },
//     image: {
//       width: 400,
//       height: 400
//     },
  
//     input:{
//       width: '80%',
//       height: 50,
//       borderWidth: 2,
//       borderColor: 'red',
//       color: 'white',
//       fontSize: 25,
//       textAlign: 'center',
//     },
  
//     view1: {
//       // flex: 1,
//       width: '100%',
//       height: 100,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'cyan',
//       margin: 10
  
//     },
  
  
//     text: {
//       margin: 10,
//       fontSize: 25,
//       fontWeight: '600',
//       color: 'white',
//       // marginBottom: 20
//     }
  
//   });
  
//   export default App;
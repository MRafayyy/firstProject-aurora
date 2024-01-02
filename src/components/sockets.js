import React, { useState, useEffect, useRef, useContext } from "react";

import GlobalStyle from "../utils/GlobalStyle";

import {
    StyleSheet,
    Text,
    View,
    Pressable,
    BackHandler,
    Alert,
    ScrollView,
    FlatList,
    RefreshControl,
    Refreshing,
    onRefreshHandler
} from 'react-native';
import ip from '../screens/IPaddress'
import SocketIOClient from 'socket.io-client'
import { io } from 'socket.io-client';


let socketI;
    
    export const initializeSocket = (userId)=>{
        
        
      // Connect to the server using Socket.IO
      socketI = io(`${ip}/userrr`,{
          auth: {Token: userId}
        }); // Replace with your server address
        
        socketI.on('connect', () => {
            console.log('Connected to server');
        });
        // socketI.disconnect()

        socketI.on('disconnect', () => {
            console.log('Disconnected from server');
        });

     
        
      
    }


    export const getSocket = ()=>{
        if(socketI){

            return socketI
        }
    }
    


    
    // Event listeners
   
    
    // Emitting a custom event
    // socket.emit('customEvent', 'Some data');
    
    // // Handling incoming events
    // socket.on('incomingEvent', (data) => {
    //     console.log('Received data:', data);
    // });
    
    // Clean up when the component unmounts

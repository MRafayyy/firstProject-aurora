import React from 'react';
import socketIOClient from 'socket.io-client';
import ip from '../screens/IPaddress';

// Exporting the socket instance directly
const socket = socketIOClient(ip, {
    auth: {
        userType: 'user'
    }
});

export const connectToSocket = () => {
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    // Handle other events as needed

    return socket;
};

// You can also export other socket-related functions or constants if needed
export default socket;
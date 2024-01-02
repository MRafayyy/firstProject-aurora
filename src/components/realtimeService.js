import React from 'react';
// import Ably from 'ably';

import * as Ably from 'ably';

let realtimeInstance = null;
const ably_api_key = 'uJbUAQ.WtYOKg:hFNNjiNKqYkls6docSNQIVfusAl1c-hy7O6pMHu6Cac'

export const initialRealtime = (ably_api_key, clientId) => {
    if (!realtimeInstance) {
      realtimeInstance = new Ably.Realtime.Promise({
        key: ably_api_key,
        clientId: clientId
      });
    }
    return realtimeInstance;
  };
  
  export const getRealInstance = () => {
    if (!realtimeInstance) {
      throw new Error('Realtime instance not initialized');
    }
    return realtimeInstance;
  };

  export const closeRealtimeConnection = () => {
    if (realtimeInstance) {
      realtimeInstance.close();
      realtimeInstance = null; // Reset the instance after closing
    }
  };
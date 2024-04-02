import React, { createContext, useState } from 'react';
// import { LocationProvider } from './LocationContext';

const UserIdContext = createContext();
export const LocationsContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [mLocation, setmLocation] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
       <LocationsContext.Provider value={{ mLocation, setmLocation }}>
      {children}
       </LocationsContext.Provider>
    </UserIdContext.Provider>
  );
};

export default UserIdContext;

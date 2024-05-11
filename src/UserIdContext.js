import React, { createContext, useState } from 'react';
// import { LocationProvider } from './LocationContext';

const UserIdContext = createContext();
export const LocationsContext = createContext();
export const UserTypeContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [mLocation, setmLocation] = useState(null);
  const [userType, setUserType] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
       <LocationsContext.Provider value={{ mLocation, setmLocation }}>
       <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
       </UserTypeContext.Provider>
       </LocationsContext.Provider>
    </UserIdContext.Provider>
  );
};

export default UserIdContext;

import React, { createContext, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [mLocation, setmLocation] = useState(null);

  return (
    <LocationProvider.Provider value={{ mLocation, setmyocation }}>
      {children}
    </LocationProvider.Provider>
  );
};

export default LocationContext;
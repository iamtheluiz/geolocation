import React, { createContext, useState, useContext, useEffect } from "react";
import { connect } from 'socket.io-client';

const LocationContext = createContext(null);

const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const socket = connect('http://127.0.0.1:3333', {
      query: {
        "name": "client",
        "type": "client"
      }
    })

    socket.on('location', data => {
      setLocations([data])
      console.log(data);
    })
  }, [])

  return (
    <LocationContext.Provider value={{
      locations,
    }}>
      {children}
    </LocationContext.Provider>
  );
};

function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
}

export { LocationProvider, useLocation };
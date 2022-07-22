import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const colRef = collection(database, "Smifis");
const Context = React.createContext();
function userReducer(deviceState, action) {
  switch (action.type) {
    case "GETTING":
      return { deviceState };
    case "SUCCESS":
      return { deviceArray: action.payload };
  }
}
function getData(deviceDispatch, deviceArray) {
  deviceArray = [];
  deviceDispatch({ type: "GETTING", payload: [] });
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      deviceArray.push({ ...doc.data(), id: doc.id });
    });
    deviceDispatch({ type: "SUCCESS", payload: deviceArray });
  });
}
function DeviceProvider({ children }) {
  const initialdeviceState = [];
  const [deviceState, deviceDispatch] = React.useReducer(userReducer, initialdeviceState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { deviceState, deviceDispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useDevices() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useDevices must be used within a Context");
  }
  return context;
}

export { DeviceProvider, useDevices, getData };

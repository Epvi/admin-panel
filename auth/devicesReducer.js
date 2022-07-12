import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const colRef = collection(database, "Smifis");
const Context = React.createContext();
function userReducer(state, action) {
  switch (action.type) {
    case "GETTING":
      return { state };
    case "SUCCESS":
      return { deviceArray: action.payload };
  }
}
function getData(dispatch, deviceArray) {
  deviceArray = [];
  dispatch({ type: "GETTING", payload: [] });
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      deviceArray.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "SUCCESS", payload: deviceArray });
  });
}
function DeviceProvider({ children }) {
  const initialState = [];
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
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

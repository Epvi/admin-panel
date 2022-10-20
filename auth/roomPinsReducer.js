import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const colRef = collection(database, "Rooms");
const Context = React.createContext();
function userReducer(pinState, action) {
  switch (action.type) {
    case "GETTING":
      return  pinState ;
    case "SUCCESS":
      return {...pinState,pinsArray: action.payload} ;
      case "UPDATE":
        return {...pinState,selectedDevice:action.payload}
  }
}
function getData(pinDispatch, pinsArray) {
    pinsArray = [];
    pinDispatch({ type: "GETTING", payload: [] });
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        pinsArray.push({ ...doc.data(), id: doc.id });
      });
      pinDispatch({ type: "SUCCESS", payload: pinsArray });
    });
  }
function RoomPinsProvider({ children }) {
  const initialpinState = [];
  const [pinState, pinDispatch] = React.useReducer(userReducer, initialpinState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { pinState, pinDispatch };
  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
}

function useRoomPins() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useRoomPins must be used within a Context");
  }
  return context;
}

export { RoomPinsProvider, useRoomPins, getData };

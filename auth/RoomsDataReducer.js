import * as React from "react";
import { database } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const Context = React.createContext();
function userReducer(roomState, action) {
  switch (action.type) {
    case "GETTING":
      return roomState;
    case "SUCCESS":
      return { ...roomState, roomData: action.payload };
  }
}

async function getData(roomDispatch, selectedDoc) {
  let roomData = {};
  roomDispatch({ type: "GETTING", payload: {} });
  const docRef = doc(database, "Rooms", selectedDoc);
  try {
    const docData = await getDoc(docRef);
    if (docData.exists()) {
      roomData = docData.data();
      // console.log("From reducer: ", couponInfo);
      roomDispatch({ type: "SUCCESS", payload: roomData });
    }
  } catch (error) {
    console.log(error);
  }
}
function RoomProvider({ children }) {
  const initialRoomState = {};
  const [roomState, roomDispatch] = React.useReducer(
    userReducer,
    initialRoomState
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { roomState, roomDispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useRoomData() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useRoomData must be used within a Context");
  }
  return context;
}

export { RoomProvider, useRoomData, getData };

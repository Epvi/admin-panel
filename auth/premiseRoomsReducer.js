import * as React from "react";
import { database } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs
} from "firebase/firestore";

const premiseRoomsContext = React.createContext();
function premiseRoomsReducer(premiseRoomsState, action) {
  switch (action.type) {
    case "GETTING":
      return { premiseRoomsState };
    case "SUCCESS":
      return { premiseRoomsData: action.payload };
  }
}
async function getRoomsData(premiseRoomsDispatch,premiseRoomsData,phoneNo){
    let uid, nRooms;
    const q = query(collection(database, "Users"),where("phone","==",phoneNo));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      uid = doc.id
    });
    const qRooms = query(collection(database, "Rooms"),where("uid","==",uid));
    premiseRoomsDispatch({ type: "GETTING", payload: [] });
    const premiseRoomsDataFunction = onSnapshot(qRooms, (querySnapshot) => {
      premiseRoomsData = [];
      querySnapshot.forEach((doc) => {
          premiseRoomsData.push(doc.data());
      //   premiseRooms.push(doc.data());
      });
      
      premiseRoomsDispatch({ type: "SUCCESS", payload: premiseRoomsData });
    });
}
function PremiseRoomsStateProvider({ children }) {
  const initialpremiseRoomsState = [];
  const [premiseRoomsState, premiseRoomsDispatch] = React.useReducer(
    premiseRoomsReducer,
    initialpremiseRoomsState
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { premiseRoomsState, premiseRoomsDispatch };
  return (
    <premiseRoomsContext.Provider value={value}>{children}</premiseRoomsContext.Provider>
  );
}

function usePremiseRooms() {
  const context = React.useContext(premiseRoomsContext);
  if (context === undefined) {
    throw new Error("usepremise must be used within a Context");
  }
  return context;
}

export { PremiseRoomsStateProvider, usePremiseRooms, getRoomsData };

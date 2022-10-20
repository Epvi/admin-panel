import * as React from "react";
import { database } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,

} from "firebase/firestore";
import { getLogsData, useTrackingLogs } from "../auth/trackingLogsReducer";


const premiseUserContext = React.createContext();
function premiseUserReducer(premiseUserState, action) {
  switch (action.type) {
    case "GETTING":
      return { premiseUserState };
    case "SUCCESS":
      return { premiseUserData: action.payload };
  }
}
async function getUserData(premiseUserDispatch,premiseUserData,phoneNo){
    phoneNo = parseInt(phoneNo)
    const q = query(collection(database, "Users"),where("phone","==",phoneNo));
  
    premiseUserDispatch({ type: "GETTING", payload: {} });
    const premiseUserFunction = onSnapshot(q, (querySnapshot) => {
      premiseUserData = {};
      querySnapshot.forEach((doc) => {
          premiseUserData=(doc.data())
      //   premiseUser.push(doc.data());
      });
      premiseUserDispatch({ type: "SUCCESS", payload: premiseUserData });
    })
}
function PremiseUserStateProvider({ children }) {
  const initialpremiseUserState = {};
  const [premiseUserState, premiseUserDispatch] = React.useReducer(
    premiseUserReducer,
    initialpremiseUserState
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { premiseUserState, premiseUserDispatch };
  return (
    <premiseUserContext.Provider value={value}>{children}</premiseUserContext.Provider>
  );
}

function usePremiseUser() {
  const context = React.useContext(premiseUserContext);
  if (context === undefined) {
    throw new Error("usepremise must be used within a Context");
  }
  return context;
}

export { PremiseUserStateProvider, usePremiseUser, getUserData };

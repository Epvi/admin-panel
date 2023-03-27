import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const smifiInfoContext = React.createContext();
function smifiInfoReducer(smifiInfoState, action) {
  switch (action.type) {
    case "GETTING":
      return { smifiInfoState };
    case "SUCCESS":
      return { smifiInformation: action.payload };
  }
}
async function getData(smifiInfoStateDispatch, deviceId) {
  const q = query(collection(database, "Smifis"), where("id", "==", deviceId));

  smifiInfoStateDispatch({ type: "GETTING", payload: {} });
  await onSnapshot(q, (querySnapshot) => {
    let smifiInformation = {};
    querySnapshot.forEach((doc) => {
      smifiInformation = doc.data();
      //   smifiInformation.push(doc.data());
    });
    smifiInfoStateDispatch({ type: "SUCCESS", payload: smifiInformation });
  });
}
function SmifiInfoStateProvider({ children }) {
  const initialSmifiInfoState = [];
  const [smifiInfoState, smifiInfoStateDispatch] = React.useReducer(
    smifiInfoReducer,
    initialSmifiInfoState
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { smifiInfoState, smifiInfoStateDispatch };
  return (
    <smifiInfoContext.Provider value={value}>
      {children}
    </smifiInfoContext.Provider>
  );
}

function useSmifiInformation() {
  const context = React.useContext(smifiInfoContext);
  if (context === undefined) {
    throw new Error("useSmifiInformation must be used within a Context");
  }
  return context;
}

export { SmifiInfoStateProvider, useSmifiInformation, getData };

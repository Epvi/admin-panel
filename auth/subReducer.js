import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const SubContext = React.createContext();
function subReducer(subState, action) {
  switch (action.type) {
    case "GETTING":
      return { subState };
    case "SUCCESS":
      return { sub: action.payload };
  }
}
async function getData(subDispatch, sub) {
  const q = query(collection(database, "SubscribeData"));

  subDispatch({ type: "GETTING", payload: [] });

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     sub.push(doc.data());
  //   });
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    sub = [];
    querySnapshot.forEach((doc) => {
      sub.push(doc.data());
    });
    subDispatch({ type: "SUCCESS", payload: sub });
  });
}
function SubStateProvider({ children }) {
  const initialsubState = [];
  const [subState, subDispatch] = React.useReducer(subReducer, initialsubState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { subState, subDispatch };
  return <SubContext.Provider value={value}>{children}</SubContext.Provider>;
}

function useSub() {
  const context = React.useContext(SubContext);
  if (context === undefined) {
    throw new Error("usesub must be used within a Context");
  }
  return context;
}

export { SubStateProvider, useSub, getData };

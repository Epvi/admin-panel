import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const colRef = collection(database, "Users");
const Context = React.createContext();
function userReducer(userState, action) {
  switch (action.type) {
    case "GETTING":
      return { userState };
    case "SUCCESS":
      return { userArray: action.payload };
  }
}
function getData(userDispatch, userArray) {
  userArray = [];
  userDispatch({ type: "GETTING", payload: [] });
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      userArray.push({ ...doc.data(), id: doc.id });
    });
    userDispatch({ type: "SUCCESS", payload: userArray });
  });
}
function UserProvider({ children }) {
  const initialuserState = [];
  const [userState, userDispatch] = React.useReducer(userReducer, initialuserState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { userState, userDispatch };
  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
}

function useUser() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useUser must be used within a Context");
  }
  return context;
}

export { UserProvider, useUser, getData };

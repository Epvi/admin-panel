import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const userInformationContext = React.createContext();
function userInformationReducer(userInformationState, action) {
  switch (action.type) {
    case "GETTING":
      return { userInformationState };
    case "SUCCESS":
      return { userInformation: action.payload };
  }
}
async function getData(userInformationDispatch, userInformation,phoneNo) {
    phoneNo = "+91"+phoneNo
    phoneNo = parseInt(phoneNo)
  const q = query(collection(database, "Users"),where("phone","==",phoneNo));

  userInformationDispatch({ type: "GETTING", payload: {} });
  const userInformationFunction = onSnapshot(q, (querySnapshot) => {
    userInformation = {};
    querySnapshot.forEach((doc) => {
        userInformation=doc.data()
    //   userInformation.push(doc.data());
    });
    userInformationDispatch({ type: "SUCCESS", payload: userInformation });
  });
}
function UserInformationStateProvider({ children }) {
  const initialUserInformationState = [];
  const [userInformationState, userInformationDispatch] = React.useReducer(userInformationReducer, initialUserInformationState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { userInformationState, userInformationDispatch };
  return <userInformationContext.Provider value={value}>{children}</userInformationContext.Provider>;
}

function useUserInformation() {
  const context = React.useContext(userInformationContext);
  if (context === undefined) {
    throw new Error("useUserInformation must be used within a Context");
  }
  return context;
}

export { UserInformationStateProvider, useUserInformation, getData };

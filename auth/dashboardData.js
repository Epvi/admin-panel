import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const colRef = collection(database, "CurrentSmifiDevice");
const Context = React.createContext();
function userReducer(state, action) {
  switch (action.type) {
    case "GETTING":
      return { state };
    case "SUCCESS":
      return { totalData: action.payload };
      case "ONE":
      return {state, payload};
  }
}
function getData(dispatch, totalData) {
  totalData = {};
  dispatch({ type: "GETTING", payload: [] });
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      totalData = { ...doc.data(), id: doc.id };
    });
    dispatch({ type: "SUCCESS", payload: totalData });
    // console.log(totalData);
  });
}
function TotalUserProvider({ children }) {
  const initialState = [];
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
}

function useDashboard() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a Context");
  }
  return context;
}

export { TotalUserProvider, useDashboard, getData };

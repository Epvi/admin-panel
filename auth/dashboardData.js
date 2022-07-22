import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const colRef = collection(database, "CurrentSmifiDevice");
const Context = React.createContext();
function userReducer(dashboardState, action) {
  switch (action.type) {
    case "GETTING":
      return { dashboardState };
    case "SUCCESS":
      return { totalData: action.payload };
      
  }
}
function getData(dashboardDispatch, totalData) {
  totalData = {};
  dashboardDispatch({ type: "GETTING", payload: [] });
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      totalData = { ...doc.data(), id: doc.id };
    });
    dashboardDispatch({ type: "SUCCESS", payload: totalData });
    // console.log(totalData);
  });
}
function TotalUserProvider({ children }) {
  const initialdashboardState = [];
  const [dashboardState, dashboardDispatch] = React.useReducer(userReducer, initialdashboardState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { dashboardState, dashboardDispatch };
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

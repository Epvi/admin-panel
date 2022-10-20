import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const colRef = collection(database, "customerComplaint");
const CountContext = React.createContext();
function userReducer(complaintState, action) {
  switch (action.type) {
    case "GETTING":
      return { complaintState };
    case "SUCCESS":
      return { complaint: action.payload };
  }
}
function getData(complaintDispatch, complaint) {
  complaint = [];
  complaintDispatch({ type: "GETTING", payload: [] });
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      complaint.push({ ...doc.data(), id: doc.id });
    });
    complaintDispatch({ type: "SUCCESS", payload: complaint });
  });
}
function ComplaintStateProvider({ children }) {
  const initialcomplaintState = [];
  const [complaintState, complaintDispatch] = React.useReducer(userReducer, initialcomplaintState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { complaintState, complaintDispatch };
  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function useComplaint() {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error("useComplaint must be used within a Context");
  }
  return context;
}

export { ComplaintStateProvider, useComplaint, getData };

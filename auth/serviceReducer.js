import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

const colRef = collection(database, "ServiceRequests");
const CountContext = React.createContext();
function userReducer(serviceState, action) {
    switch (action.type) {
      case "GETTING":
        return { serviceState };
      case "SUCCESS":
        return { service: action.payload };
    }
}
function getData(serviceDispatch) {
  let service = [];
  serviceDispatch({ type: "GETTING", payload: [] });
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      service.push({ ...doc.data(), id: doc.id });
    });
 
    serviceDispatch({ type: "SUCCESS", payload: service });
  });
}


async function deleteServiceRequest(serviceDispatch,docId) {



    const docRef = doc(database, "ServiceRequests",docId);
    await deleteDoc(docRef);
}


function ServiceStateProvider({ children }) {
    const initialserviceState = [];
    const [serviceState, serviceDispatch] = React.useReducer(userReducer, initialserviceState);
    
    
    const value = { serviceState, serviceDispatch };
    return (
      <CountContext.Provider value={value}>{children}</CountContext.Provider>
    );
  }
  
  function useservice() {
    const context = React.useContext(CountContext);
    if (context === undefined) {
      throw new Error("useservice must be used within a Context");
    }
    return context;
  }
  
  export { ServiceStateProvider, useservice, getData , deleteServiceRequest};
  

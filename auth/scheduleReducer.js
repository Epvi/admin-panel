import * as React from "react";
import { database } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

const schedulesContext = React.createContext();
function scheduleReducer(schedulesState, action) {
  switch (action.type) {
    case "GETTING":
      return { schedulesState };
    case "SUCCESS":
      return { schedulesData: action.payload };
  }
}

async function getSchedulesData(schedulesDispatch, schedulesData, uid) {
  const qSchedules = query(
    collection(database, "Schedules"),
    where("uid", "==", uid)
  );
  schedulesDispatch({ type: "GETTING", payload: [] });
  schedulesData = [];

  await onSnapshot(qSchedules, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      schedulesData.push(doc.data());
    });
    // console.log("From SchedulesReducer",schedulesData);
    schedulesDispatch({ type: "SUCCESS", payload: schedulesData });
  });
}

function SchedulesStateProvider({ children }) {
  const initialSchedulesState = [];
  const [schedulesState, schedulesDispatch] = React.useReducer(
    scheduleReducer,
    initialSchedulesState
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { schedulesState, schedulesDispatch };
  return (
    <schedulesContext.Provider value={value}>
      {children}
    </schedulesContext.Provider>
  );
}

function useSchedules() {
  const context = React.useContext(schedulesContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a Context");
  }
  return context;
}

export { SchedulesStateProvider, useSchedules, getSchedulesData };

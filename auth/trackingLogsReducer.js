import * as React from "react";
import { database } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const trackingLogsContext = React.createContext();
function trackingLogsReducer(trackingLogsState, action) {
  switch (action.type) {
    case "GETTING":
      return { trackingLogsState };
    case "SUCCESS":
      return { trackingLogsData: action.payload };
  }
}
async function getLogsData(
  trackingLogsDispatch,
  trackingLogsData,
  smifi,
  counter
) {
  let d;
  if (counter == 1) {
    d = new Date();
    d.setUTCHours(0, 0, 0, 0);
  }
  if (counter == 2) {
    d = Date.now() - 7 * 24 * 60 * 60 * 1000;
  }
  if (counter == 3) {
    let now = new Date();
    d = now.setDate(now.getDate() - 30);
  }
  d = d / 10000;

  const q = query(
    collection(database, "DeviceLogs"),
    where("id", "==", smifi),
    where("timestamp", ">=", d)
  );

  trackingLogsDispatch({ type: "GETTING", payload: [] });
  trackingLogsData = [];
  const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
    trackingLogsData.push(doc.data());
  });
  trackingLogsDispatch({ type: "SUCCESS", payload: trackingLogsData });

}
function TrackingLogsStateProvider({ children }) {
  const initialtrackingLogsState = [];
  const [trackingLogsState, trackingLogsDispatch] = React.useReducer(
    trackingLogsReducer,
    initialtrackingLogsState
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { trackingLogsState, trackingLogsDispatch };
  return (
    <trackingLogsContext.Provider value={value}>
      {children}
    </trackingLogsContext.Provider>
  );
}

function useTrackingLogs() {
  const context = React.useContext(trackingLogsContext);
  if (context === undefined) {
    throw new Error("usepremise must be used within a Context");
  }
  return context;
}

export { TrackingLogsStateProvider, useTrackingLogs, getLogsData };

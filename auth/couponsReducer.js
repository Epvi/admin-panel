import * as React from "react";
import { database } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const Context = React.createContext();
function couponsReducer(couponsState, action) {
  switch (action.type) {
    case "GETTING":
      return { couponsState };
    case "SUCCESS":
      return { couponInfo: action.payload };
  }
}
async function getData(couponsDispatch, selectedDoc) {
  let couponInfo = {};
  couponsDispatch({ type: "GETTING", payload: {} });
  const docRef = doc(database, "Coupons", selectedDoc);
  try {
    const docData = await getDoc(docRef);
    if (docData.exists()) {
      couponInfo = docData.data();
      // console.log("From reducer: ", couponInfo);
      couponsDispatch({ type: "SUCCESS", payload: couponInfo });
    }
  } catch (error) {
    console.log(error);
  }
}
function CouponsProvider({ children }) {
  const initialCouponsState = {};
  const [couponsState, couponsDispatch] = React.useReducer(
    couponsReducer,
    initialCouponsState
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { couponsState, couponsDispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useCoupon() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useCoupon must be used within a Context");
  }
  return context;
}

export { CouponsProvider, useCoupon, getData };

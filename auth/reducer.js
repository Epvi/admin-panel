import * as React from 'react'
import { database } from '../firebaseConfig';
import { collection,getDocs } from 'firebase/firestore';

const colRef = collection(database,'customerComplaint');
const CountContext = React.createContext()
function userReducer(state, action) {
  switch (action.type) {
    case'GETTING':
            return {state };
    case 'SUCCESS':
            return { complaint:action.payload};
    }
  }
   function getData(dispatch,complaint){
    complaint=[];
    dispatch({ type: 'GETTING', payload:[] })
   getDocs(colRef)
  .then((snapshot)=>{
    snapshot.docs.forEach((doc)=>{
      complaint.push({...doc.data(),id: doc.id})
    })
  dispatch({ type: 'SUCCESS', payload: complaint })
  })
}
function StateProvider({children}) {
  const initialState =  [];
  const [state, dispatch] = React.useReducer(userReducer, initialState)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {state, dispatch}
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}

function useCount() {
  const context = React.useContext(CountContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a Context')
  }
  return context
}

export {StateProvider, useCount, getData}
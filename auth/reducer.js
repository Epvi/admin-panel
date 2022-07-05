import * as React from 'react'
import { database } from '../firebaseConfig';
import { collection,onSnapshot } from 'firebase/firestore';

const colRef = collection(database,'customerComplaint');
const CountContext = React.createContext()
function userReducer(state, action) {
  switch (action.type) {
    case'GETTING':
            return {...state };
    case 'SUCCESS':
            return { ...state,user: action.payload};
    }
  }
  function getData(dispatch,arr){
    dispatch({ type: 'GETTING', payload: {} })
  onSnapshot(colRef,(snapshot)=>{
      snapshot.docs.forEach((doc)=>{
          arr.push({...doc.data(),id: doc.id})
  }) 
  dispatch({ type: 'SUCCESS', payload: arr })
  console.log(arr);
  // createData(arr);
  })
}
function StateProvider({children}) {
  const initialState =  { arr: [] }
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
import * as React from 'react'

const CountContext = React.createContext()
function countReducer(state, action) {
  switch (action.type) {
    case 'loggedin': {
      return {state , user:action.payload}
    }
    case 'loggedout':{
        return state
    }
  }
}

function StateProvider({children}) {
  const initialState =  { user: {} }
  const [state, dispatch] = React.useReducer(countReducer, initialState)
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

export {StateProvider, useCount}
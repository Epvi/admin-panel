import React from 'react'
import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
// import { useCount } from '../src/reducer'
import { useAuth } from '../auth/AuthContext';
import Navbar from "../pages/navbar"
  const userRole = "admin";
  
  const home = () => {
  const { currentUser } = useAuth()

  // const {state,dispatch} = useCount()
  
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!currentUser) 
      Router.push('/')
      setLoading(false);
    },[]);
  if (loading) return <p>Loading...</p>


  return (
    <>
     
    { currentUser && <Navbar userRole={userRole}/>}
     
    </>
  )
}

export default home
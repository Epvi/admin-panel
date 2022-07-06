import React from 'react';
import Router from 'next/router';
import { useEffect, useState, useContext } from 'react';
// import { useCount } from '../src/reducer'
import { useAuth } from '../auth/AuthContext';
import CustomerComplaint from "./home/customercomplaint";
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

    console.log('working')
  return (
    <>
    {/* { currentUser && <Layout userRole={userRole}/>} */}
     
    </>
  )
}

export default home
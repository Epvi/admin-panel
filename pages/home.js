import React from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/userlogin'
const Navbar = dynamic(() => import('../pages/navbar'), {
    suspense: true,
  })
  const user = "admin";
  
  const home = () => {
  const authenticated = isAuthenticated()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // if user is not authenticated, redirect to login page
    if (!authenticated) Router.push('/')
    setLoading(false)
  })
  if (loading) return <p>Loading...</p>
  return (
    <>
    { authenticated && <Navbar user={user}/>}
    </>
  )
}

export default home
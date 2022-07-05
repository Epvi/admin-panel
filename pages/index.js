import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const user = "admin";
const Navbar = dynamic(() => import('../pages/navbar'), {
  suspense: true,
})

const index = () => {
  return (
    <>
    <Head>
      <title>EPVI - Managing Electricity wisely</title>
    </Head>
    <Navbar user={user}/>
    </>
  )
}

export default index

import React, { useState, createContext } from 'react'
import Head from 'next/head'
import styles from '../styles/App.module.css'
import Navbar from '../Components/Navbar'
import Body from '../Components/Body'


const AppContext = createContext()


const App = () => {

  const [selectedIconIndex, setSelectedIconIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)



  return (
    <AppContext.Provider value={[selectedIconIndex, setSelectedIconIndex, isMenuOpen, setIsMenuOpen]} >
      <div className={styles.appContainer} >
        <Head>
          <title>Epvi Admin Pannel</title>
          <meta name="description" content="Dashboard Application for IOT Automated Devices." />
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <Navbar />
        <Body />

      </div>
    </AppContext.Provider>
  )
}

export default App
export { AppContext }
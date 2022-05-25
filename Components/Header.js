import React, { useState, useContext } from 'react'
import styles from '../styles/Header.module.css'
import { BiSearch } from 'react-icons/bi'
import { BsFillGearFill } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { FiMenu } from 'react-icons/fi'
import { AppContext } from '../pages/index'

const Header = () => {

  const [,, isMenuOpen, setIsMenuOpen] = useContext(AppContext)


  return (
    <div className={styles.headerContainer} >

      <div className={styles.headerMenuIconContainer} onClick={() => setIsMenuOpen(!isMenuOpen)} >
        <FiMenu className={styles.headerMenuIcon} />
      </div>

      <SearchBox />
      <HeaderOptions />
    </div>
  )
}

const SearchBox = () => {
  return <div className={styles.searchContainer} >

    <BiSearch className={styles.searchIcon} />
    <input type="text" placeholder='Search' />

  </div>
}

const HeaderOptions = () => {
  return <div className={styles.headerOptionsContainer} >

    <BsFillGearFill className={styles.headerOptionsIcons} />
    <IoMdNotifications className={styles.headerOptionsIcons} />

    <div className={styles.headerUserInformationContainer} >


      <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" className={styles.avatarImage} />

      <span> Suryanshu </span>


      {/* admin-pannel-suryanshu */}


    </div>

  </div>
}













export default Header
import React, { useContext } from 'react'
import styles from '../styles/Navbar.module.css'
import { AiFillHome } from 'react-icons/ai'
import { CgInbox } from 'react-icons/cg'
import { AiFillClockCircle } from 'react-icons/ai'
import { MdDeviceHub } from 'react-icons/md'
import { MdLogout } from 'react-icons/md'
import { IoMdNotifications } from 'react-icons/io'
import { AppContext } from '../pages/index'

const Navbar = () => {

  const [selectedIconIndex, setSelectedIconIndex, isMenuOpen] = useContext(AppContext)


  const getIconClassName = (index) => {
    if (index === selectedIconIndex) return styles.navbarIconWrapper + ' ' + styles.iconSelected
    else return styles.navbarIconWrapper
  }

  const iconList = [
    <AiFillHome key={0} className={styles.navbarIcons} />,
    <AiFillClockCircle key={1} className={styles.navbarIcons} />,
    <MdDeviceHub key={2} className={styles.navbarIcons} />,
    <CgInbox key={3} className={styles.navbarIcons} />,
    <IoMdNotifications key={4} className={styles.navbarIcons} />,
    <MdLogout key={5} className={styles.navbarIcons} />
  ]

  return (
    <div className={styles.navbarContainer} style={{
      transform:isMenuOpen?'translateX(0%)':'translateX(-130%)'
    }} >

      {
        iconList.map((iconElement, index) => {
          return <div key={index} className={getIconClassName(index)} onClick={() => setSelectedIconIndex(index)} >

            {iconElement}

          </div>
        })
      }

    </div>
  )
}

export default Navbar